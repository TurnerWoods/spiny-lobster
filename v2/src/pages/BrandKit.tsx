import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check, FileImage, Type, Palette, BookOpen, Share2, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import logo assets
import logoElevare from "@/assets/logo-elevare.png";
import logoIcon from "@/assets/logo-icon.png";
import logoWhite from "@/assets/logo-white.png";
import logoIconNew from "@/assets/logo-icon-new.png";

const brandColors = [
  { name: "Deep Charcoal", hex: "#2F2B31", hsl: "270 5% 18%", usage: "Primary UI surfaces, headers, footer" },
  { name: "Warm Stone", hex: "#726658", hsl: "30 12% 40%", usage: "Accent color, CTAs, premium elements" },
  { name: "Soft Linen", hex: "#F6F5F3", hsl: "40 15% 96%", usage: "Page backgrounds, subtle sections" },
  { name: "Pure White", hex: "#FDFDFD", hsl: "0 0% 99%", usage: "Card backgrounds, content areas" },
  { name: "Rich Black", hex: "#08080A", hsl: "240 11% 4%", usage: "Headings, primary text" },
  { name: "Accent Gold", hex: "#C9A962", hsl: "40 47% 59%", usage: "Badges, trust signals, premium accents" },
  { name: "Warm Gray", hex: "#D7D5CF", hsl: "45 10% 83%", usage: "Borders, dividers, muted elements" },
  { name: "Light Cloud", hex: "#EEF0F7", hsl: "226 33% 95%", usage: "Secondary backgrounds, hover states" },
];

const typography = [
  { name: "Plus Jakarta Sans", weight: "700-800", usage: "Headlines, display text", sample: "Elevare Health" },
  { name: "DM Sans", weight: "400-600", usage: "Body text, UI elements", sample: "Premium telehealth solutions for modern men." },
  { name: "Crimson Pro", weight: "400-600", usage: "Accent text, quotes", sample: "Transform your health journey" },
];

const logos = [
  { name: "Primary Logo (SVG)", file: "/elevar-logo.svg", filename: "elevar-logo.svg", bg: "bg-soft-linen", format: "SVG" },
  { name: "Primary Logo", file: logoElevare, filename: "elevare-logo-primary.png", bg: "bg-soft-linen", format: "PNG" },
  { name: "Logo Icon", file: logoIcon, filename: "elevare-logo-icon.png", bg: "bg-soft-linen", format: "PNG" },
  { name: "Logo Icon (New)", file: logoIconNew, filename: "elevare-logo-icon-new.png", bg: "bg-soft-linen", format: "PNG" },
  { name: "White Logo", file: logoWhite, filename: "elevare-logo-white.png", bg: "bg-deep-charcoal", format: "PNG" },
];

// Social media asset specs
const socialAssets = [
  {
    platform: "Instagram",
    icon: Instagram,
    assets: [
      { name: "Profile Picture", size: "320 × 320", canvasW: 320, canvasH: 320 },
      { name: "Post (Square)", size: "1080 × 1080", canvasW: 1080, canvasH: 1080 },
      { name: "Story / Reel", size: "1080 × 1920", canvasW: 1080, canvasH: 1920 },
    ],
  },
  {
    platform: "Twitter / X",
    icon: Twitter,
    assets: [
      { name: "Profile Picture", size: "400 × 400", canvasW: 400, canvasH: 400 },
      { name: "Header Banner", size: "1500 × 500", canvasW: 1500, canvasH: 500 },
      { name: "Post Image", size: "1200 × 675", canvasW: 1200, canvasH: 675 },
    ],
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    assets: [
      { name: "Profile Picture", size: "400 × 400", canvasW: 400, canvasH: 400 },
      { name: "Cover Photo", size: "1584 × 396", canvasW: 1584, canvasH: 396 },
      { name: "Post Image", size: "1200 × 627", canvasW: 1200, canvasH: 627 },
    ],
  },
  {
    platform: "YouTube",
    icon: Youtube,
    assets: [
      { name: "Profile Picture", size: "800 × 800", canvasW: 800, canvasH: 800 },
      { name: "Channel Banner", size: "2560 × 1440", canvasW: 2560, canvasH: 1440 },
      { name: "Thumbnail", size: "1280 × 720", canvasW: 1280, canvasH: 720 },
    ],
  },
];

const BrandKit = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    toast.success(`Copied ${text} to clipboard`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const downloadLogo = async (logoUrl: string, filename: string) => {
    try {
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      toast.error("Failed to download logo");
    }
  };

  const generateSocialAsset = useCallback(async (canvasW: number, canvasH: number, label: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient (Soft Linen → white)
    const grad = ctx.createLinearGradient(0, 0, canvasW, canvasH);
    grad.addColorStop(0, "#F6F5F3");
    grad.addColorStop(1, "#FDFDFD");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Subtle warm stone accent bar at bottom
    ctx.fillStyle = "#726658";
    ctx.fillRect(0, canvasH - Math.max(4, canvasH * 0.005), canvasW, Math.max(4, canvasH * 0.005));

    // Load and draw logo centered
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = logoElevare;
      });
      const maxLogoW = canvasW * 0.5;
      const maxLogoH = canvasH * 0.3;
      const scale = Math.min(maxLogoW / img.width, maxLogoH / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (canvasW - w) / 2, (canvasH - h) / 2, w, h);
    } catch {
      // Fallback text if image fails
      ctx.fillStyle = "#08080A";
      ctx.font = `bold ${Math.round(canvasW * 0.06)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("ELEVARE HEALTH", canvasW / 2, canvasH / 2);
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `elevare-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${canvasW}x${canvasH}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${canvasW}×${canvasH} asset`);
    }, "image/png");
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(28);
    doc.setTextColor(47, 43, 49); // Deep Charcoal
    doc.text("Elevare Health", pageWidth / 2, 30, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(114, 102, 88); // Warm Stone
    doc.text("Brand Guidelines", pageWidth / 2, 40, { align: "center" });

    // Color Palette Section
    doc.setFontSize(14);
    doc.setTextColor(8, 8, 10); // Rich Black
    doc.text("Color Palette", 20, 60);
    
    let yPos = 70;
    brandColors.forEach((color, index) => {
      // Color swatch
      const hex = color.hex.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      doc.setFillColor(r, g, b);
      doc.rect(20, yPos - 4, 10, 10, "F");
      
      // Color info
      doc.setFontSize(10);
      doc.setTextColor(8, 8, 10);
      doc.text(`${color.name}`, 35, yPos);
      doc.setTextColor(114, 102, 88);
      doc.text(`${color.hex} | HSL(${color.hsl})`, 35, yPos + 5);
      
      yPos += 18;
      
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }
    });

    // Typography Section
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(8, 8, 10);
    doc.text("Typography", 20, 30);
    
    yPos = 45;
    typography.forEach((font) => {
      doc.setFontSize(12);
      doc.setTextColor(8, 8, 10);
      doc.text(font.name, 20, yPos);
      
      doc.setFontSize(10);
      doc.setTextColor(114, 102, 88);
      doc.text(`Weight: ${font.weight}`, 20, yPos + 7);
      doc.text(`Usage: ${font.usage}`, 20, yPos + 14);
      
      yPos += 30;
    });

    // Brand Values
    doc.setFontSize(14);
    doc.setTextColor(8, 8, 10);
    doc.text("Brand Values", 20, yPos + 10);
    
    const values = [
      "• Premium & Trustworthy - Medical excellence with approachable design",
      "• Modern & Clean - Glassmorphic effects, generous whitespace",
      "• Warm & Inviting - Earthy tones, subtle textures",
      "• Professional - Board-certified physicians, HIPAA compliant"
    ];
    
    yPos += 25;
    values.forEach((value) => {
      doc.setFontSize(10);
      doc.setTextColor(47, 43, 49);
      doc.text(value, 20, yPos);
      yPos += 10;
    });

    // Contact
    doc.setFontSize(12);
    doc.setTextColor(114, 102, 88);
    doc.text("Elevare Health | 1401 Lavaca St, Austin, TX 78701", pageWidth / 2, 280, { align: "center" });
    doc.text("info@elevarehealth.com | 512-270-8701", pageWidth / 2, 287, { align: "center" });

    doc.save("elevare-health-brand-kit.pdf");
    toast.success("Brand Kit PDF downloaded!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />
      
      <main className="pt-24 pb-16" id="main-content" aria-label="Brand Kit resources">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-rich-black mb-4">
              Brand Kit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Download our official brand assets, color palette, and typography guidelines for consistent brand representation.
            </p>
            <Button
              onClick={generatePDF}
              size="lg"
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
              aria-label="Download the complete Elevare Health brand kit as a PDF document"
            >
              <Download className="w-5 h-5 mr-2" aria-hidden="true" />
              Download Full Brand Kit (PDF)
            </Button>
          </motion.div>

          {/* Logos Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
            aria-labelledby="logos-section-heading"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
                <FileImage className="w-5 h-5 text-primary" />
              </div>
              <h2 id="logos-section-heading" className="font-display text-2xl font-bold text-rich-black">Logos</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {logos.map((logo) => (
                <Card key={logo.name} className="glass-card overflow-hidden">
                  <div
                    className={`${logo.bg} p-8 flex items-center justify-center min-h-[140px]`}
                    role="img"
                    aria-label={`Preview of ${logo.name}`}
                  >
                    <img
                      src={logo.file}
                      alt={`Elevare Health ${logo.name}`}
                      loading="lazy"
                      className="max-h-16 w-auto max-w-full object-contain"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground mb-2">{logo.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadLogo(logo.file, logo.filename)}
                      className="w-full"
                      aria-label={`Download ${logo.name} as ${logo.format} file`}
                    >
                      <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                      Download {logo.format}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Colors Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
            aria-labelledby="colors-section-heading"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <h2 id="colors-section-heading" className="font-display text-2xl font-bold text-rich-black">Color Palette</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <Card key={color.name} className="glass-card overflow-hidden">
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                    role="img"
                    aria-label={`Color swatch for ${color.name} (${color.hex})`}
                  />
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground mb-1" id={`color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}>
                      {color.name}
                    </p>
                    <div className="space-y-1" role="group" aria-labelledby={`color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}>
                      <button
                        onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                        className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                        aria-label={`Copy HEX value ${color.hex} for ${color.name}`}
                      >
                        <span>{color.hex}</span>
                        {copiedColor === `${color.name}-hex` ? (
                          <Check className="w-4 h-4 text-accent-gold" aria-hidden="true" />
                        ) : (
                          <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {copiedColor === `${color.name}-hex` ? "Copied" : "Click to copy"}
                        </span>
                      </button>
                      <button
                        onClick={() => copyToClipboard(color.hsl, `${color.name}-hsl`)}
                        className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                        aria-label={`Copy HSL value ${color.hsl} for ${color.name}`}
                      >
                        <span>HSL({color.hsl})</span>
                        {copiedColor === `${color.name}-hsl` ? (
                          <Check className="w-4 h-4 text-accent-gold" aria-hidden="true" />
                        ) : (
                          <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {copiedColor === `${color.name}-hsl` ? "Copied" : "Click to copy"}
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{color.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Typography Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
            aria-labelledby="typography-section-heading"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
                <Type className="w-5 h-5 text-primary" />
              </div>
              <h2 id="typography-section-heading" className="font-display text-2xl font-bold text-rich-black">Typography</h2>
            </div>
            
            <div className="space-y-4">
              {typography.map((font) => (
                <Card key={font.name} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{font.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Weight: {font.weight} | {font.usage}
                        </p>
                      </div>
                      <p 
                        className="text-xl text-foreground"
                        style={{ 
                          fontFamily: font.name === "Plus Jakarta Sans" 
                            ? "'Plus Jakarta Sans', sans-serif"
                            : font.name === "DM Sans"
                            ? "'DM Sans', sans-serif"
                            : "'Crimson Pro', serif"
                        }}
                      >
                        {font.sample}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Social Media Assets */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-12"
            aria-labelledby="social-section-heading"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <h2 id="social-section-heading" className="font-display text-2xl font-bold text-rich-black">Social Media Assets</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Download platform-ready branded assets with the Elevare logo centered on the brand palette. Each file is sized to spec — no design tool needed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialAssets.map((platform) => {
                const Icon = platform.icon;
                return (
                  <Card key={platform.platform} className="glass-card overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-5 w-5 text-warm-stone" aria-hidden="true" />
                        {platform.platform}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {platform.assets.map((asset) => (
                        <div
                          key={asset.name}
                          className="flex items-center justify-between rounded-lg border border-neutral-gray/20 bg-soft-linen/50 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{asset.name}</p>
                            <p className="text-xs text-muted-foreground">{asset.size} px</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateSocialAsset(asset.canvasW, asset.canvasH, `${platform.platform}-${asset.name}`)}
                            aria-label={`Download ${platform.platform} ${asset.name} as PNG (${asset.size})`}
                          >
                            <Download className="h-4 w-4 mr-1.5" aria-hidden="true" />
                            PNG
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.section>

          {/* Usage Guidelines */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            aria-labelledby="guidelines-section-heading"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 id="guidelines-section-heading" className="font-display text-2xl font-bold text-rich-black">Usage Guidelines</h2>
            </div>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3" id="dos-heading">Do's</h3>
                    <ul className="space-y-2 text-muted-foreground" aria-labelledby="dos-heading">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent-gold mt-1 shrink-0" aria-hidden="true" />
                        <span>Use adequate spacing around the logo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent-gold mt-1 shrink-0" aria-hidden="true" />
                        <span>Maintain color consistency across all materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent-gold mt-1 shrink-0" aria-hidden="true" />
                        <span>Use the white logo on dark backgrounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent-gold mt-1 shrink-0" aria-hidden="true" />
                        <span>Keep the glassmorphic aesthetic in UI designs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3" id="donts-heading">Don'ts</h3>
                    <ul className="space-y-2 text-muted-foreground" aria-labelledby="donts-heading">
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 text-red-500 mt-1 shrink-0 flex items-center justify-center" aria-hidden="true">✕</span>
                        <span>Stretch or distort the logo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 text-red-500 mt-1 shrink-0 flex items-center justify-center" aria-hidden="true">✕</span>
                        <span>Change brand colors without approval</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 text-red-500 mt-1 shrink-0 flex items-center justify-center" aria-hidden="true">✕</span>
                        <span>Place logo on busy or low-contrast backgrounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 text-red-500 mt-1 shrink-0 flex items-center justify-center" aria-hidden="true">✕</span>
                        <span>Use non-approved fonts for marketing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrandKit;
