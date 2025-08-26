import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import QrScanner from "qr-scanner";
import { Camera, Upload, Copy, ExternalLink, X, Scan, RefreshCw } from "lucide-react";

export const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState("");
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    // Check camera availability on component mount
    checkCameraAvailability();
    
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
      }
    };
  }, []);

  const checkCameraAvailability = async () => {
    try {
      const hasCamera = await QrScanner.hasCamera();
      setHasCamera(hasCamera);
      if (!hasCamera) {
        setCameraError("No camera detected. Please use the file upload option.");
      }
    } catch (error) {
      console.error("Error checking camera:", error);
      setHasCamera(false);
      setCameraError("Camera access not available. Please use the file upload option.");
    }
  };

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setIsScanning(true);
      setCameraError("");
      
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedResult(result.data);
          toast.success("QR code scanned successfully!");
          stopScanning();
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "environment", // Use rear camera on mobile
        }
      );

      scannerRef.current = scanner;
      await scanner.start();
    } catch (error) {
      console.error("Error starting scanner:", error);
      setIsScanning(false);
      setCameraError("Failed to access camera. Please check permissions or use file upload.");
      toast.error("Failed to start camera scanner");
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      toast.info("Analyzing image...");
      const result = await QrScanner.scanImage(file);
      setScannedResult(result);
      toast.success("QR code found in image!");
    } catch (error) {
      console.error("Error scanning file:", error);
      toast.error("No QR code found in the image. Please try another image.");
    }
  };

  const handleCopyResult = async () => {
    if (!scannedResult) return;
    
    try {
      await navigator.clipboard.writeText(scannedResult);
      toast.success("Result copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy result");
    }
  };

  const handleOpenLink = () => {
    if (!scannedResult) return;
    
    try {
      const url = scannedResult.startsWith('http') ? scannedResult : `https://${scannedResult}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      toast.error("Invalid URL format");
    }
  };

  const isUrl = (text: string) => {
    try {
      new URL(text.startsWith('http') ? text : `https://${text}`);
      return true;
    } catch {
      return false;
    }
  };

  const clearResult = () => {
    setScannedResult("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Scanner Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              {hasCamera && !cameraError ? (
                <>
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`}
                    playsInline
                  />
                  {isScanning && (
                    <div className="absolute inset-4">
                      <div className="qr-viewfinder w-full h-full rounded-xl relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
                        <div className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
                      </div>
                    </div>
                  )}
                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center shadow-glow">
                          <Scan className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <p className="text-muted-foreground">Ready to scan QR codes</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Camera not available</p>
                      <p className="text-xs text-muted-foreground">{cameraError}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {hasCamera && !cameraError && (
                <Button
                  onClick={isScanning ? stopScanning : startScanning}
                  variant={isScanning ? "destructive" : "gradient"}
                  size="lg"
                  className="flex-1"
                >
                  {isScanning ? (
                    <>
                      <X className="w-4 h-4" />
                      Stop Scanning
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4" />
                      Start Camera
                    </>
                  )}
                </Button>
              )}
              
              <Button
                onClick={checkCameraAvailability}
                variant="outline"
                size="lg"
                disabled={isScanning}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">
                Choose an image containing a QR code
              </Label>
              <Input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Supported formats: JPG, PNG, GIF, WebP</p>
              <p>• Works offline - images are processed locally</p>
              <p>• No data is uploaded to any server</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan Results Section */}
      {scannedResult && (
        <Card className="shadow-card border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Scan className="w-5 h-5" />
              Scan Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <p className="text-sm font-mono break-all">{scannedResult}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCopyResult} variant="success">
                <Copy className="w-4 h-4" />
                Copy Result
              </Button>
              
              {isUrl(scannedResult) && (
                <Button onClick={handleOpenLink} variant="outline">
                  <ExternalLink className="w-4 h-4" />
                  Open Link
                </Button>
              )}
              
              <Button onClick={clearResult} variant="ghost">
                <X className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};