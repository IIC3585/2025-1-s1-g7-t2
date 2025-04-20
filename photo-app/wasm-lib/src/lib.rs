use wasm_bindgen::prelude::*;
use std::io::Cursor;
use image::{GenericImageView, ImageBuffer, Rgba, Pixel};

#[wasm_bindgen]
pub struct ImageData {
    width: u32,
    height: u32,
    data: Vec<u8>,
}

#[wasm_bindgen]
impl ImageData {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> ImageData {
        ImageData {
            width,
            height,
            data: vec![0; (width * height * 4) as usize],
        }
    }

    pub fn get_width(&self) -> u32 {
        self.width
    }

    pub fn get_height(&self) -> u32 {
        self.height
    }

    pub fn get_data(&self) -> Vec<u8> {
        self.data.clone()
    }
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

// image processing functions
#[wasm_bindgen]
pub fn grayscale(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let gray_img = img.grayscale();
    let mut buf = Cursor::new(Vec::new());
    gray_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn blur(image_data: &[u8], radius: f32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let blurred_img = img.blur(radius);
    let mut buf = Cursor::new(Vec::new());
    blurred_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn pink_filter(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    
    // Crear una nueva imagen con los mismos dimensiones
    let (width, height) = img.dimensions();
    let mut pink_img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);
    
    // Aplicar un tono rosado a cada píxel
    for (x, y, pixel) in img.pixels() {
        let mut pink_pixel = pixel.to_rgba();
        
        // Aumentar el canal rojo y el canal azul para crear un tono rosado
        pink_pixel[0] = (pink_pixel[0] as f32 * 1.2).min(255.0) as u8; // R - Aumentar rojo
        pink_pixel[1] = (pink_pixel[1] as f32 * 0.8).min(255.0) as u8; // G - Disminuir verde
        pink_pixel[2] = (pink_pixel[2] as f32 * 1.1).min(255.0) as u8; // B - Aumentar ligeramente azul
        
        pink_img.put_pixel(x, y, pink_pixel);
    }
    
    // Convertir la imagen modificada a un vector de bytes
    let mut buf = Cursor::new(Vec::new());
    pink_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");
    
    buf.into_inner()
}