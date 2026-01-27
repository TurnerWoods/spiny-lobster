import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
  Check
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
import logoIcon from "@/assets/logo-icon-new.png";

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [files, setFiles] = useState<ListItem[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Dialog states
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ListItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(currentPath, {
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

      setFiles([...folders, ...fileItems]);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error",
        description: "Failed to load files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPath, toast]);

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user, fetchFiles]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const totalFiles = selectedFiles.length;
    let uploadedCount = 0;

    try {
      for (const file of Array.from(selectedFiles)) {
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
      // Reset input
      e.target.value = "";
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const folderPath = currentPath 
        ? `${currentPath}/${newFolderName.trim()}/.gitkeep`
        : `${newFolderName.trim()}/.gitkeep`;

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(folderPath, new Blob([""]), {
          cacheControl: "3600",
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

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      if ("isFolder" in itemToDelete) {
        // Delete folder and its contents
        const folderPath = currentPath 
          ? `${currentPath}/${itemToDelete.name}`
          : itemToDelete.name;

        const { data: folderContents } = await supabase.storage
          .from(BUCKET_NAME)
          .list(folderPath);

        if (folderContents && folderContents.length > 0) {
          const filesToDelete = folderContents.map(f => `${folderPath}/${f.name}`);
          await supabase.storage.from(BUCKET_NAME).remove(filesToDelete);
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
      toast({
        title: "Error",
        description: "Failed to delete item.",
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
      return <Image className="h-8 w-8 text-blue-500" />;
    }
    if (mimetype.startsWith("video/")) {
      return <Video className="h-8 w-8 text-purple-500" />;
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

  const filteredFiles = files.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = currentPath ? currentPath.split("/") : [];

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
        <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold text-rich-black">
              Elevare<span className="text-warm-stone">Health</span>
            </span>
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

            <label>
              <Button
                size="sm"
                className="bg-warm-stone hover:bg-warm-stone/90 cursor-pointer"
                disabled={isUploading}
                asChild
              >
                <span>
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
                </span>
              </Button>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
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

        {/* Files Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <Card variant="glass" className="flex flex-col items-center justify-center py-20">
            <Image className="h-16 w-16 text-warm-gray/50 mb-4" />
            <p className="text-warm-gray text-center">
              {searchQuery ? "No files match your search" : "This folder is empty"}
            </p>
            <p className="text-sm text-warm-gray/70 mt-1">
              Upload files or create a folder to get started
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
                      <img
                        src={getFileUrl(item.name)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
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
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-warm-stone/5"
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
                    "isFolder" in item ? "cursor-pointer" : ""
                  }`}
                  onClick={() =>
                    "isFolder" in item && navigateToFolder(item.name)
                  }
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
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.name)}
                    >
                      {copiedUrl === item.name ? (
                        <Check className="h-4 w-4 text-green-500" />
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
      </main>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent className="bg-pure-white">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} className="bg-warm-stone hover:bg-warm-stone/90">
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
    </div>
  );
};

export default MediaManager;
