import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { QRGenerator } from "@/components/QRGenerator";
import { QRScanner } from "@/components/QRScanner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { QrCode, Scan, Mail, Globe, Lock } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary shadow-glow mb-4">
            <QrCode className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            QR Code Studio
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Generate and scan QR codes securely - all processing happens locally on your device for complete privacy
          </p>
        </div>

        {/* Main Content */}
        <Card className="border-card-border shadow-card backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="generate" className="flex items-center gap-2 font-heading">
                <QrCode className="w-4 h-4" />
                Generate QR Code
              </TabsTrigger>
              <TabsTrigger value="scan" className="flex items-center gap-2 font-heading">
                <Scan className="w-4 h-4" />
                Scan QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="mt-0">
              <QRGenerator />
            </TabsContent>

            <TabsContent value="scan" className="mt-0">
              <QRScanner />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <Card className="border-card-border shadow-card backdrop-blur-sm max-w-2xl mx-auto">
          <div className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-lg font-heading">
              <QrCode className="w-5 h-5 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                QR Code Studio
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto font-body">
              Professional QR code solutions for businesses and developers. Fast, secure, and completely offline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a 
                href="https://github.com/code-with-Hamza667" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                @code-with-Hamza667
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a 
                href="https://qrcodestudio.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                qrcodestudio.netlify.app
              </a>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                Completely offline and secure - your data never leaves your device
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;