use wasm_bindgen::prelude::*;

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