# CropCut - Photo Editing PWA with WebAssembly
CropCut is a modern Progressive Web Application (PWA) for image editing that leverages the power of WebAssembly (WASM) using Rust for high-performance image processing. This application provides a responsive user interface built with React and offers offline capabilities through PWA features.

## Features

- **PWA Capabilities**: Works offline, installable on devices, and responsive across all screen sizes
- **WebAssembly Integration**: Utilizes Rust compiled to WASM for efficient image processing
- **Modern React UI**: Built with React and styled with Emotion for a smooth user experience
- **Real-time Image Filters**: Apply filters like grayscale, blur, and pink tint to your images
- **Persistent Storage**: Save edited images to browser's IndexedDB for later access
- **Cumulative Filters**: Option to apply multiple filters sequentially or individually
- **Theme Customization**: Light, dark, and custom theme options
- **Responsive Design**: Optimized for both desktop and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Emotion (CSS-in-JS)
- **Build Tools**: Vite, ESLint, TypeScript
- **PWA**: Vite PWA Plugin for service worker and manifest generation
- **WebAssembly**: Rust with wasm-bindgen
- **Image Processing**: Rust's image crate
- **Storage**: IndexedDB for client-side persistence

## Installation

## Prerequisites

- Node.js (v16 or higher)
- Rust and Cargo
- wasm-pack

## Installation

1. **Install Rust and Cargo**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Install wasm-pack**:
   ```bash
   cargo install wasm-pack
   ```

3. **Clone the repository**:
   ```bash
   git clone https://github.com/IIC3585/2025-1-s1-g7-t2.git
   cd photo-app
   ```

4. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

## Development

1. **Build the WASM package**:
   ```bash
   cd wasm-lib
   wasm-pack build --target web
   cd ..
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173`

## Building for Production

1. **Build the WASM package**:
   ```bash
   cd wasm-lib
   wasm-pack build --target web --release
   cd ..
   ```

2. **Build the React application**:
   ```bash
   npm run build
   ```

3. **Preview the production build**:
   ```bash
   npm run preview
   ```

## How to Use

1. **Upload an Image**: Click on the upload area or drag and drop an image
2. **Apply Filters**: Select from available filters (Grayscale, Blur, Pink)
3. **Toggle Cumulative Filters**: Enable this option to apply filters on top of each other
4. **Save Image**: Save your edited image to access it later
5. **View Saved Images**: Access your previously saved images through the gallery button
6. **Customize Theme**: Toggle between light/dark mode or create a custom theme

## WebAssembly Image Processing

The application uses Rust compiled to WebAssembly for efficient image processing:

- **Grayscale Filter**: Converts the image to grayscale
- **Blur Filter**: Applies a Gaussian blur to the image
- **Pink Filter**: Applies a pink tint to the image

The Rust code leverages the `image` crate for high-performance processing that runs directly

## Project Structure

```
photo-app/ 
├── src/             # React source code 
│   ├── components/  # React components 
│   ├── contexts/    # React context providers 
│   ├── services/    # Services for data handling 
│   ├── utils/       # Utility functions 
│   ├── styles/      # Global CSS styles 
│   ├── App.tsx      # Main application component 
│   └── main.tsx     # Application entry point 
├── wasm-lib/        # Rust WASM library 
│   ├── src/         # Rust source code 
│   └── Cargo.toml   # Rust package configuration 
├── public/          # Static assets and PWA icons 
├── index.html       # HTML template 
└── package.json     # Node.js dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
