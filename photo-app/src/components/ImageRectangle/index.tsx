import React, { useCallback, useState, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { saveImageToDB } from "../../utils/indexedDB";
import { Toast } from "../Toast";
import {
  ImageContainer,
  UploadArea,
  UploadText,
  UploadIcon,
  ImagePreview,
  PreviewImage,
  ButtonContainer,
  FiltersButtonContainer,
  ActionButton,
} from "./styles";
import init, {
  grayscale,
  blur,
  pinkify,
  invert,
  brighten,
  blueify,
  contrast,
  sepia,
  vintage,
  vignette,
  technicolor,
} from "../../../wasm-lib/pkg/wasm_lib";

const ImageRectangle: React.FC = () => {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cumulativeFilters, setCumulativeFilters] = useState<boolean>(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setSelectedImage(imageUrl);
          setOriginalImage(imageUrl); // Guarda la imagen original
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setSelectedImage(imageUrl);
          setOriginalImage(imageUrl); // Guarda la imagen original
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, []);

  const handleSave = useCallback(async () => {
    if (selectedImage) {
      try {
        await saveImageToDB(selectedImage);
        setToastMessage("Image saved successfully!");
        setShowToast(true);
      } catch (error) {
        console.error("Error saving image:", error);
        setToastMessage("Failed to save image. Please try again.");
        setShowToast(true);
      }
    }
  }, [selectedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        setOriginalImage(imageUrl); // Guarda la imagen original
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processImage = async (file: File, filter: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    await init();

    let result;
    switch (filter) {
      case "grayscale":
        result = grayscale(uint8Array);
        break;
      case "blur":
        result = blur(uint8Array, 5);
        break;
      case "pink":
        result = pinkify(uint8Array);
        break;
      default:
        throw new Error(`Unsupported filter: ${filter}`);
    }
    const blob = new Blob([result], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const handleApplyGrayscale = async () => {
    if (!selectedImage || !originalImage) return;

    // First we need to get the file from the current image
    // We can create a fetch request to the current image URL and convert it to a File
    try {
      const sourceImage = cumulativeFilters ? selectedImage : originalImage;
      const response = await fetch(sourceImage);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const processedImageUrl = await processImage(file, "grayscale");
      setSelectedImage(processedImageUrl);

      setToastMessage("Grayscale filter applied successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error applying grayscale filter:", error);
      setToastMessage("Failed to apply filter. Please try again.");
      setShowToast(true);
    }
  };

  const handleApplyBlur = async () => {
    if (!selectedImage || !originalImage) return;

    try {
      const sourceImage = cumulativeFilters ? selectedImage : originalImage;
      const response = await fetch(sourceImage);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const processedImageUrl = await processImage(file, "blur");
      setSelectedImage(processedImageUrl);

      setToastMessage("Blur filter applied successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error applying blur filter:", error);
      setToastMessage("Failed to apply filter. Please try again.");
      setShowToast(true);
    }
  };

  const handleApplyPinkFilter = async () => {
    if (!selectedImage || !originalImage) return;

    try {
      const sourceImage = cumulativeFilters ? selectedImage : originalImage;
      const response = await fetch(sourceImage);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const processedImageUrl = await processImage(file, "pink");
      setSelectedImage(processedImageUrl);

      setToastMessage("Pink filter applied successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error applying pink filter:", error);
      setToastMessage("Failed to apply filter. Please try again.");
      setShowToast(true);
    }
  };

  const handleRestoreOriginal = () => {
    if (originalImage) {
      setSelectedImage(originalImage);
      setToastMessage("Original image restored!");
      setShowToast(true);
    }
  };
  const toggleCumulativeFilters = () => {
    setCumulativeFilters(!cumulativeFilters);
    setToastMessage(
      `Cumulative filters ${!cumulativeFilters ? "enabled" : "disabled"}`
    );
    setShowToast(true);
  };

  return (
    <div>
      <h3
        style={{
          color: colors.text,
          textAlign: "center",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20px",
        }}
      >
        Filters:
      </h3>
      <FiltersButtonContainer>
        <ActionButton onClick={handleApplyGrayscale} disabled={!selectedImage}>
          Gray Scale
        </ActionButton>
        <ActionButton onClick={handleApplyBlur} disabled={!selectedImage}>
          Blur
        </ActionButton>
        <ActionButton onClick={handleApplyPinkFilter} disabled={!selectedImage}>
          Pink
        </ActionButton>
      </FiltersButtonContainer>

      <ImageContainer>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        {selectedImage ? (
          <>
            <ImagePreview>
              <PreviewImage src={selectedImage} alt="Selected" />
              <ButtonContainer>
                <ActionButton onClick={handleChangeImage}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
                  </svg>
                  Change Image
                </ActionButton>
                <ActionButton onClick={handleSave}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                  </svg>
                  Save Image
                </ActionButton>
              </ButtonContainer>
            </ImagePreview>
          </>
        ) : (
          <UploadArea
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            isDragActive={isDragActive}
          >
            <UploadIcon>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </UploadIcon>
            <UploadText>Click to upload an image</UploadText>
          </UploadArea>
        )}
        {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}
      </ImageContainer>
      <FiltersButtonContainer>
        <ActionButton onClick={handleRestoreOriginal} disabled={!selectedImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-restore"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3.06 13a9 9 0 1 0 .49 -4.087" />
            <path d="M3 4.001v5h5" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
          Restore Original
        </ActionButton>
        <ActionButton
          onClick={toggleCumulativeFilters}
          disabled={!selectedImage}
          style={
            cumulativeFilters
              ? { backgroundColor: "var(--secondary-color)" }
              : {}
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 9h-8V1h-4v8H2v4h8v8h4v-8h8V9z" />
          </svg>
          {cumulativeFilters
            ? "Cumulative filters: ON"
            : "Cumulative filters: OFF"}
        </ActionButton>
      </FiltersButtonContainer>
    </div>
  );
};

export default ImageRectangle;
