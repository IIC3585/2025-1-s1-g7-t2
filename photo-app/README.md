# PWA with WASM Demo

A Progressive Web Application (PWA) demo that showcases WebAssembly (WASM) integration using Rust and React. This project demonstrates how to create a modern web application with offline capabilities and native-like performance.

## Features

- PWA capabilities (offline support, installable)
- WebAssembly integration with Rust
- Modern React UI with Vite
- Image upload and preview functionality
- Responsive design with animations

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

## Project Structure

```
photo-app/
├── src/                    # React source code
│   ├── components/         # React components
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── wasm-lib/              # Rust WASM library
│   ├── src/               # Rust source code
│   └── Cargo.toml         # Rust package configuration
├── public/                # Static assets
├── index.html            # HTML template
└── package.json          # Node.js dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
