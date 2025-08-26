import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import QRCode from "qrcode";
import { Download, Copy, RefreshCw } from "lucide-react";

export const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async (inputText: string) => {
    console.log("generateQR called with:", inputText);
    if (!inputText.trim()) {
      toast.error("Please enter some text or URL to generate QR code");
      return;
    }

    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      console.log("Canvas ref:", canvas);
      if (canvas) {
        console.log("Generating QR code...");
        await QRCode.toCanvas(canvas, inputText, {
          width: 300,
          margin: 2,
          color: {
            dark: "#1a1a1a",
            light: "#ffffff",
          },
          errorCorrectionLevel: "M",
        });

        // Create data URL for download
        const dataUrl = canvas.toDataURL("image/png");
        setQrDataUrl(dataUrl);
        console.log("QR code generated successfully");
        
        toast.success("QR code generated successfully!");
      } else {
        console.error("Canvas ref is null");
        toast.error("Canvas not available");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (text.trim()) {
      const timeoutId = setTimeout(() => {
        generateQR(text);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setQrDataUrl("");
    }
  }, [text]);

  const handleDownload = () => {
    if (!qrDataUrl) {
      toast.error("No QR code to download");
      return;
    }

    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrDataUrl;
    link.click();
    toast.success("QR code downloaded successfully!");
  };

  const handleCopyToClipboard = async () => {
    if (!text.trim()) {
      toast.error("No text to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy text to clipboard");
    }
  };

  const handleClear = () => {
    setText("");
    setQrDataUrl("");
    toast.success("Generator cleared!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Input Text or URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-input">Enter text, URL, or any data</Label>
              <Textarea
                id="qr-input"
                placeholder="Enter text, URL, email, phone number, or any data you want to encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => generateQR(text)}
                disabled={!text.trim() || isGenerating}
                variant="gradient"
                className="flex-1 min-w-[120px]"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate QR Code"
                )}
              </Button>
              
              <Button
                onClick={handleCopyToClipboard}
                disabled={!text.trim()}
                variant="outline"
              >
                <Copy className="w-4 h-4" />
                Copy Text
              </Button>
              
              <Button
                onClick={handleClear}
                variant="ghost"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center relative">
              <canvas
                ref={canvasRef}
                className={`border rounded-xl shadow-lg transition-all duration-300 ${
                  qrDataUrl ? 'animate-pulse-glow opacity-100' : 'opacity-0 absolute'
                }`}
                width={300}
                height={300}
              />
              {!qrDataUrl && (
                <div className="w-[300px] h-[300px] border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center text-muted-foreground bg-muted/20">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 border-2 border-muted-foreground/20 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8" />
                    </div>
                    <p className="text-sm">QR code will appear here</p>
                  </div>
                </div>
              )}
              {qrDataUrl && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />
              )}
            </div>
            
            {qrDataUrl && (
              <Button
                onClick={handleDownload}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Examples */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText("https://example.com")}
            >
              Website URL
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText("mailto:hello@example.com")}
            >
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText("tel:+1234567890")}
            >
              Phone
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText("WIFI:T:WPA;S:MyNetwork;P:MyPassword;;")}
            >
              WiFi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};