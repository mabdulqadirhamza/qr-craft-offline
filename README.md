# QR Code Studio

A modern, offline-first QR code generator and scanner built with React, TypeScript, and Tailwind CSS. Generate QR codes from text, URLs, or any data, and scan existing QR codes using your device's camera or by uploading images.

## ✨ Features

- **QR Code Generation**: Create QR codes from text, URLs, contact information, and more
- **QR Code Scanning**: Scan QR codes using your device's camera or upload images
- **Offline-First**: All processing happens locally on your device for complete privacy
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui components
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Cross-Platform**: Works on desktop and mobile devices
- **Privacy-Focused**: No data leaves your device - everything is processed locally

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mabdulqadirhamza/qr-craft-offline.git
cd qr-craft-offline
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **QR Code Libraries**: 
  - `qrcode` for generation
  - `qr-scanner` for scanning
- **UI Components**: Radix UI primitives with custom styling
- **Theme**: Next-themes for dark/light mode support

## 📱 Usage

### Generating QR Codes

1. Select the "Generate" tab
2. Enter your text, URL, or data
3. Choose QR code options (size, error correction, etc.)
4. Download or copy the generated QR code

### Scanning QR Codes

1. Select the "Scan" tab
2. Allow camera access or upload an image
3. Point your camera at a QR code or select an image file
4. View the decoded information

## 🔒 Privacy & Security

- **100% Offline**: No internet connection required after initial setup
- **Local Processing**: All QR code generation and scanning happens on your device
- **No Data Collection**: We don't collect, store, or transmit any of your data
- **Open Source**: Transparent codebase for security verification

## 🎨 Customization

The project uses CSS custom properties for theming. You can customize colors, spacing, and other design tokens by modifying the `src/index.css` file.

### Color Scheme

- **Primary**: Purple gradient (#8B5CF6 to #A855F7)
- **Accent**: Complementary purple tones
- **Background**: Dark/light mode variants
- **Semantic Colors**: Success, warning, destructive states

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── QRGenerator.tsx # QR code generation component
│   ├── QRScanner.tsx   # QR code scanning component
│   └── ThemeToggle.tsx # Theme switching component
├── pages/              # Page components
│   ├── Index.tsx       # Main application page
│   └── NotFound.tsx    # 404 error page
├── lib/                # Utility functions and helpers
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast development and building

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**QR Code Studio** - Professional QR code solutions for businesses and developers. Fast, secure, and completely offline.
