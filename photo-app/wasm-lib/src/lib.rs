use wasm_bindgen::prelude::*;
use std::io::Cursor;
use image::{GenericImageView, ImageBuffer, Rgba, Pixel};

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
pub fn pinkify(image_data: &[u8]) -> Vec<u8> {
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

#[wasm_bindgen]
pub fn invert(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");

    let (width, height) = img.dimensions();
    let mut inverted_img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let rgba = pixel.to_rgba();
        let inverted_pixel = Rgba([
            255 - rgba[0],
            255 - rgba[1],
            255 - rgba[2],
            rgba[3], // alpha sin modificar
        ]);
        inverted_img.put_pixel(x, y, inverted_pixel);
    }

    let mut buf = Cursor::new(Vec::new());
    inverted_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn brighten(image_data: &[u8], value: i32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let bright_img = img.brighten(value);

    let mut buf = Cursor::new(Vec::new());
    bright_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn blueify(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");

    let (width, height) = img.dimensions();
    let mut blue_img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let mut px = pixel.to_rgba();
        px[0] = (px[0] as f32 * 0.8).min(255.0) as u8; // R
        px[1] = (px[1] as f32 * 0.9).min(255.0) as u8; // G
        px[2] = (px[2] as f32 * 1.2).min(255.0) as u8; // B
        blue_img.put_pixel(x, y, px);
    }

    let mut buf = Cursor::new(Vec::new());
    blue_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn contrast(image_data: &[u8], value: f32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let contrasted_img = img.adjust_contrast(value);

    let mut buf = Cursor::new(Vec::new());
    contrasted_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn sepia(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let (width, height) = img.dimensions();
    let mut sepia_img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let px = pixel.to_rgba();
        let r = px[0] as f32;
        let g = px[1] as f32;
        let b = px[2] as f32;

        let tr = (0.393 * r + 0.769 * g + 0.189 * b).min(255.0) as u8;
        let tg = (0.349 * r + 0.686 * g + 0.168 * b).min(255.0) as u8;
        let tb = (0.272 * r + 0.534 * g + 0.131 * b).min(255.0) as u8;

        sepia_img.put_pixel(x, y, Rgba([tr, tg, tb, px[3]]));
    }

    let mut buf = Cursor::new(Vec::new());
    sepia_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn vintage(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let img = img.adjust_contrast(-10.0).brighten(-10);
    let (width, height) = img.dimensions();
    let mut vintage_img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let mut px = pixel.to_rgba();
        px[0] = (px[0] as f32 * 1.1).min(255.0) as u8; // Más rojo
        px[2] = (px[2] as f32 * 0.9).min(255.0) as u8; // Menos azul
        vintage_img.put_pixel(x, y, px);
    }

    let mut buf = Cursor::new(Vec::new());
    vintage_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn vignette(image_data: &[u8], strength: f32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let (width, height) = img.dimensions();
    let center_x = width as f32 / 2.0;
    let center_y = height as f32 / 2.0;
    let max_dist = ((center_x.powi(2) + center_y.powi(2)).sqrt()) as f32;

    let mut vignette_img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let mut px = pixel.to_rgba();

        let dx = x as f32 - center_x;
        let dy = y as f32 - center_y;
        let dist = ((dx * dx + dy * dy).sqrt()) as f32;
        let darken = 1.0 - strength * (dist / max_dist).powf(1.5); // caída suave

        px[0] = (px[0] as f32 * darken).min(255.0) as u8;
        px[1] = (px[1] as f32 * darken).min(255.0) as u8;
        px[2] = (px[2] as f32 * darken).min(255.0) as u8;

        vignette_img.put_pixel(x, y, px);
    }

    let mut buf = Cursor::new(Vec::new());
    vignette_img
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}

#[wasm_bindgen]
pub fn technicolor(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let (width, height) = img.dimensions();
    let mut output: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let px = pixel.to_rgba();
        // rotar canales de color
        let r = px[1];
        let g = px[2];
        let b = px[0];

        output.put_pixel(x, y, Rgba([r, g, b, px[3]]));
    }

    let mut buf = Cursor::new(Vec::new());
    output
        .write_to(&mut buf, image::ImageFormat::Png)
        .expect("Failed to write image");

    buf.into_inner()
}
