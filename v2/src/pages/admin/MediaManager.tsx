import { useState, useEffect, useCallback, useRef, DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Upload,
  FolderPlus,
  Trash2,
  Image,
  Video,
  File,
  Home,
  LogOut,
  Grid,
  List,
  Search,
  X,
  ChevronRight,
  Loader2,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  AlertCircle,
  ImageOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FileObject {
  name: string;
  id: string | null;
  created_at: string;
  metadata: Record<string, any> | null;
}

interface FolderItem {
  name: string;
  isFolder: true;
}

type ListItem = FileObject | FolderItem;

const BUCKET_NAME = "media-library";

const MediaManager = () => {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [files, setFiles] = useState<ListItem[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Pagination states
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 50;
  
  // Dialog states
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ListItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  
  // Image preview states
  const [previewImage, setPreviewImage] = useState<{ url: string; name: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Error states
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const fetchFiles = useCallback(async (reset = true) => {
    if (reset) {
      setIsLoading(true);
      setFiles([]);
      setHasMore(true);
      setFetchError(null);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const offset = reset ? 0 : files.filter(f => !("isFolder" in f)).length;

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(currentPath, {
          limit: PAGE_SIZE,
          offset: offset,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) throw error;

      // Separate folders and files
      const folders: FolderItem[] = [];
      const fileItems: FileObject[] = [];

      data?.forEach((item) => {
        if (item.id === null) {
          // It's a folder
          folders.push({ name: item.name, isFolder: true });
        } else {
          fileItems.push(item as FileObject);
        }
      });

      // Check if there are more files to load
      setHasMore(data?.length === PAGE_SIZE);

      if (reset) {
        setFiles([...folders, ...fileItems]);
        // Clear failed images when resetting
        setFailedImages(new Set());
      } else {
        // Append only new files (folders are always fetched on reset)
        setFiles(prev => {
          const existingNames = new Set(prev.map(f => f.name));
          const newItems = fileItems.filter(f => !existingNames.has(f.name));
          return [...prev, ...newItems];
        });
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load files. Please try again.";
      setFetchError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [currentPath, files, toast]);

  // Initial fetch when path changes
  useEffect(() => {
    if (user && !authLoading) {
      fetchFiles(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, currentPath]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading && !searchQuery) {
          fetchFiles(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoadingMore, isLoading, searchQuery]);

  const uploadFiles = useCallback(async (filesToUpload: FileList | File[]) => {
    const filesArray = Array.from(filesToUpload);
    if (filesArray.length === 0) return;

    // Filter for valid file types
    const validFiles = filesArray.filter(file => 
      file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (validFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload only images or videos.",
        variant: "destructive",
      });
      return;
    }

    if (validFiles.length !== filesArray.length) {
      toast({
        title: "Some files skipped",
        description: "Only images and videos are allowed.",
      });
    }

    setIsUploading(true);
    setUploadProgress(0);

    const totalFiles = validFiles.length;
    let uploadedCount = 0;

    try {
      for (const file of validFiles) {
        const filePath = currentPath ? `${currentPath}/${file.name}` : file.name;

        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          if (error.message.includes("already exists")) {
            toast({
              title: "File exists",
              description: `${file.name} already exists. Skipping.`,
              variant: "destructive",
            });
          } else {
            throw error;
          }
        }

        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
      }

      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${uploadedCount} file(s).`,
      });

      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "An error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [currentPath, fetchFiles, toast]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    await uploadFiles(selectedFiles);
    e.target.value = "";
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageError = (fileName: string) => {
    setFailedImages(prev => new Set(prev).add(fileName));
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      uploadFiles(droppedFiles);
    }
  }, [uploadFiles]);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const folderPath = currentPath 
        ? `${currentPath}/${newFolderName.trim()}/.folder`
        : `${newFolderName.trim()}/.folder`;

      // Create a tiny 1x1 transparent PNG as placeholder (bucket only accepts images/videos)
      const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
      const binaryString = atob(base64Png);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const pngBlob = new Blob([bytes], { type: "image/png" });

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(folderPath, pngBlob, {
          cacheControl: "3600",
          contentType: "image/png",
        });

      if (error) throw error;

      toast({
        title: "Folder created",
        description: `"${newFolderName}" has been created.`,
      });

      setNewFolderDialogOpen(false);
      setNewFolderName("");
      fetchFiles();
    } catch (error) {
      console.error("Error creating folder:", error);
      toast({
        title: "Error",
        description: "Failed to create folder.",
        variant: "destructive",
      });
    }
  };

  // Recursively collect all files in a folder
  const collectFolderFiles = async (folderPath: string): Promise<string[]> => {
    const allFiles: string[] = [];

    const { data: contents, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath);

    if (error) throw error;

    if (contents && contents.length > 0) {
      for (const item of contents) {
        const itemPath = `${folderPath}/${item.name}`;
        if (item.id === null) {
          // It's a subfolder, recurse
          const subFiles = await collectFolderFiles(itemPath);
          allFiles.push(...subFiles);
        } else {
          // It's a file
          allFiles.push(itemPath);
        }
      }
    }

    return allFiles;
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      if ("isFolder" in itemToDelete) {
        // Delete folder and its contents recursively
        const folderPath = currentPath
          ? `${currentPath}/${itemToDelete.name}`
          : itemToDelete.name;

        const filesToDelete = await collectFolderFiles(folderPath);

        if (filesToDelete.length > 0) {
          // Delete in batches of 100 (Supabase limit)
          const batchSize = 100;
          for (let i = 0; i < filesToDelete.length; i += batchSize) {
            const batch = filesToDelete.slice(i, i + batchSize);
            const { error } = await supabase.storage.from(BUCKET_NAME).remove(batch);
            if (error) throw error;
          }
        }
      } else {
        // Delete single file
        const filePath = currentPath
          ? `${currentPath}/${itemToDelete.name}`
          : itemToDelete.name;

        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([filePath]);

        if (error) throw error;
      }

      toast({
        title: "Deleted",
        description: `"${itemToDelete.name}" has been deleted.`,
      });

      setDeleteDialogOpen(false);
      setItemToDelete(null);
      fetchFiles();
    } catch (error) {
      console.error("Error deleting:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to delete item.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName);
  };

  const navigateUp = () => {
    const pathParts = currentPath.split("/");
    pathParts.pop();
    setCurrentPath(pathParts.join("/"));
  };

  const getFileUrl = (fileName: string) => {
    const filePath = currentPath ? `${currentPath}/${fileName}` : fileName;
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const copyToClipboard = async (fileName: string) => {
    const url = getFileUrl(fileName);
    await navigator.clipboard.writeText(url);
    setCopiedUrl(fileName);
    setTimeout(() => setCopiedUrl(null), 2000);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard.",
    });
  };

  const getFileIcon = (item: ListItem) => {
    if ("isFolder" in item) {
      return <FolderPlus className="h-8 w-8 text-warm-stone" />;
    }

    const mimetype = item.metadata?.mimetype || "";
    if (mimetype.startsWith("image/")) {
      return <Image className="h-8 w-8 text-accent-gold" />;
    }
    if (mimetype.startsWith("video/")) {
      return <Video className="h-8 w-8 text-warm-stone" />;
    }
    return <File className="h-8 w-8 text-warm-gray" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Image preview functions
  const openImagePreview = (fileName: string) => {
    const url = getFileUrl(fileName);
    setPreviewImage({ url, name: fileName });
    setZoomLevel(1);
    setRotation(0);
    setPreviewLoading(true);
    setPreviewError(false);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
    setZoomLevel(1);
    setRotation(0);
    setPreviewLoading(false);
    setPreviewError(false);
  };

  const handlePreviewLoad = () => {
    setPreviewLoading(false);
  };

  const handlePreviewError = () => {
    setPreviewLoading(false);
    setPreviewError(true);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    if (!previewImage) return;
    try {
      const response = await fetch(previewImage.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = previewImage.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to download the image.",
        variant: "destructive",
      });
    }
  };

  const filteredFiles = files.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = currentPath ? currentPath.split("/") : [];

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
        <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img
              src="/elevar-logo.svg"
              alt="Elevar Health logo"
              loading="eager"
              className="h-8 w-auto max-w-full"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-warm-gray hover:text-warm-stone hover:bg-warm-stone/10">
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-warm-gray hover:text-warm-stone hover:bg-warm-stone/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 md:py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Image className="h-4 w-4 text-warm-stone" />
            <span className="text-sm font-medium text-warm-stone">Media Manager</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-rich-black md:text-4xl">
            Media Library
          </h1>
          <p className="mt-2 text-warm-gray">
            Upload and organize images and videos for your treatments
          </p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-pure-white/80 border-warm-stone/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-warm-gray hover:text-rich-black" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="border-warm-stone/20 bg-pure-white/80"
            >
              {viewMode === "grid" ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewFolderDialogOpen(true)}
              className="border-warm-stone/20 bg-pure-white/80"
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </Button>

            <Button
              size="sm"
              className="bg-warm-stone hover:bg-warm-stone/90"
              disabled={isUploading}
              onClick={triggerFileUpload}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              id="file-upload-input"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>
        </motion.div>

        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-4 flex items-center gap-1 text-sm"
        >
          <button
            onClick={() => setCurrentPath("")}
            className="text-warm-stone hover:underline"
          >
            Root
          </button>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-warm-gray" />
              <button
                onClick={() =>
                  setCurrentPath(breadcrumbs.slice(0, index + 1).join("/"))
                }
                className="text-warm-stone hover:underline"
              >
                {crumb}
              </button>
            </span>
          ))}
        </motion.div>

        {/* Drag Overlay */}
        {isDragging && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-rich-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl border-4 border-dashed border-warm-stone bg-pure-white/95 p-12 text-center shadow-2xl"
            >
              <Upload className="mx-auto h-16 w-16 text-warm-stone mb-4" />
              <p className="text-xl font-semibold text-rich-black">Drop files here</p>
              <p className="text-warm-gray mt-2">Images and videos only</p>
            </motion.div>
          </div>
        )}

        {/* Files Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
          </div>
        ) : fetchError ? (
          <Card
            variant="glass"
            className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-destructive/30"
          >
            <AlertCircle className="h-16 w-16 text-destructive/50 mb-4" />
            <p className="text-destructive text-center font-medium">
              Failed to load files
            </p>
            <p className="text-sm text-warm-gray/70 mt-1 text-center max-w-md">
              {fetchError}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => fetchFiles(true)}
            >
              Try Again
            </Button>
          </Card>
        ) : filteredFiles.length === 0 ? (
          <Card
            variant="glass"
            interactive
            className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-warm-stone/30 hover:border-warm-stone/50 transition-colors"
            onClick={triggerFileUpload}
          >
            <Upload className="h-16 w-16 text-warm-gray/50 mb-4" />
            <p className="text-warm-gray text-center font-medium">
              {searchQuery ? "No files match your search" : "Drop files here or click to upload"}
            </p>
            <p className="text-sm text-warm-gray/70 mt-1">
              Supports images and videos up to 50MB
            </p>
          </Card>
        ) : viewMode === "grid" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filteredFiles.map((item) => (
              <Card
                key={item.name}
                variant="glass"
                className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-warm-stone/30"
              >
                {"isFolder" in item ? (
                  <button
                    onClick={() => navigateToFolder(item.name)}
                    className="flex flex-col items-center justify-center p-4 w-full aspect-square"
                  >
                    <FolderPlus className="h-12 w-12 text-warm-stone mb-2" />
                    <span className="text-sm font-medium text-rich-black text-center line-clamp-2">
                      {item.name}
                    </span>
                  </button>
                ) : (
                  <div className="relative aspect-square">
                    {item.metadata?.mimetype?.startsWith("image/") ? (
                      failedImages.has(item.name) ? (
                        <div className="flex h-full w-full items-center justify-center bg-warm-gray/10 flex-col gap-2">
                          <ImageOff className="h-8 w-8 text-warm-gray/50" />
                          <span className="text-xs text-warm-gray/60">Failed to load</span>
                        </div>
                      ) : (
                        <img
                          src={getFileUrl(item.name)}
                          alt={`Media file: ${item.name}`}
                          className="h-full w-full max-w-full object-cover cursor-pointer"
                          loading="lazy"
                          onClick={() => openImagePreview(item.name)}
                          onError={() => handleImageError(item.name)}
                        />
                      )
                    ) : item.metadata?.mimetype?.startsWith("video/") ? (
                      <video
                        src={getFileUrl(item.name)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-warm-gray/10">
                        {getFileIcon(item)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-rich-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <span className="text-xs text-pure-white text-center line-clamp-2">
                        {item.name}
                      </span>
                      <div className="flex gap-1">
                        {item.metadata?.mimetype?.startsWith("image/") && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 px-2"
                            onClick={() => openImagePreview(item.name)}
                          >
                            <ZoomIn className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 px-2"
                          onClick={() => copyToClipboard(item.name)}
                        >
                          {copiedUrl === item.name ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-2"
                          onClick={() => {
                            setItemToDelete(item);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            {currentPath && (
              <Card
                variant="glass"
                interactive
                className="flex items-center gap-4 p-4 hover:bg-warm-stone/5"
                onClick={navigateUp}
              >
                <span className="text-warm-gray">..</span>
                <span className="text-sm text-warm-gray">Go back</span>
              </Card>
            )}
            {filteredFiles.map((item) => (
              <Card
                key={item.name}
                variant="glass"
                className="flex items-center justify-between gap-4 p-4 hover:border-warm-stone/30"
              >
                <div
                  className={`flex items-center gap-4 flex-1 min-w-0 ${
                    "isFolder" in item 
                      ? "cursor-pointer" 
                      : item.metadata?.mimetype?.startsWith("image/") 
                        ? "cursor-pointer" 
                        : ""
                  }`}
                  onClick={() => {
                    if ("isFolder" in item) {
                      navigateToFolder(item.name);
                    } else if (item.metadata?.mimetype?.startsWith("image/")) {
                      openImagePreview(item.name);
                    }
                  }}
                >
                  {getFileIcon(item)}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-rich-black truncate">
                      {item.name}
                    </p>
                    {"metadata" in item && item.metadata && (
                      <p className="text-xs text-warm-gray">
                        {formatFileSize(item.metadata.size)} •{" "}
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {!("isFolder" in item) && (
                  <div className="flex items-center gap-2">
                    {item.metadata?.mimetype?.startsWith("image/") && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openImagePreview(item.name)}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.name)}
                    >
                      {copiedUrl === item.name ? (
                        <Check className="h-4 w-4 text-accent-gold" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setItemToDelete(item);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </motion.div>
        )}

        {/* Infinite scroll trigger */}
        {!searchQuery && filteredFiles.length > 0 && (
          <div
            ref={loadMoreRef}
            className="flex items-center justify-center py-8"
          >
            {isLoadingMore ? (
              <div className="flex items-center gap-2 text-warm-gray">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading more files...</span>
              </div>
            ) : hasMore ? (
              <span className="text-sm text-warm-gray">Scroll for more</span>
            ) : (
              <span className="text-sm text-warm-gray">
                All {files.length} items loaded
              </span>
            )}
          </div>
        )}
      </main>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent className="bg-pure-white">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for the new folder. Folders help organize your media files.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            aria-label="Folder name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              className="bg-warm-stone hover:bg-warm-stone/90"
              disabled={!newFolderName.trim()}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-pure-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {itemToDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {itemToDelete && "isFolder" in itemToDelete ? "folder and its contents" : "file"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-rich-black/90 backdrop-blur-sm"
            onClick={closeImagePreview}
          >
            {/* Controls Bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-pure-white/10 backdrop-blur-md px-4 py-2 border border-pure-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                variant="ghost"
                className="text-pure-white hover:bg-pure-white/20"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              <span className="text-pure-white text-sm min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="text-pure-white hover:bg-pure-white/20"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <div className="w-px h-6 bg-pure-white/30 mx-2" />
              <Button
                size="sm"
                variant="ghost"
                className="text-pure-white hover:bg-pure-white/20"
                onClick={handleRotate}
              >
                <RotateCw className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-pure-white hover:bg-pure-white/20"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
              <div className="w-px h-6 bg-pure-white/30 mx-2" />
              <Button
                size="sm"
                variant="ghost"
                className="text-pure-white hover:bg-pure-white/20"
                onClick={closeImagePreview}
              >
                <X className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[85vh] overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {previewLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-pure-white" />
                </div>
              )}
              {previewError ? (
                <div className="flex flex-col items-center justify-center gap-4 text-pure-white">
                  <ImageOff className="h-16 w-16 text-pure-white/50" />
                  <p className="text-lg">Failed to load image</p>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      setPreviewError(false);
                      setPreviewLoading(true);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <img
                  src={previewImage.url}
                  alt={previewImage.name}
                  className={`max-w-full max-h-[85vh] object-contain transition-transform duration-200 ${
                    previewLoading ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  }}
                  draggable={false}
                  onLoad={handlePreviewLoad}
                  onError={handlePreviewError}
                />
              )}
            </motion.div>

            {/* File Name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-pure-white/10 backdrop-blur-md px-4 py-2 border border-pure-white/20"
            >
              <span className="text-pure-white text-sm truncate max-w-[300px] block">
                {previewImage.name}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaManager;
