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

const FILTERS = {
  grayscale,
  invert,
  pink: pinkify,
  blue: blueify,
  sepia,
  vintage,
  technicolor,
};

const PARAMETRIC_FILTERS = {
  blur,
  brighten,
  contrast,
  vignette,
};

const PARAMETRIC_FILTERS_VALUES = {
  blur: { min: 0, max: 20, defaultValue: 5 },
  brighten: { min: -20, max: 20, defaultValue: 0 },
  contrast: { min: 0, max: 15, defaultValue: 1 },
  vignette: { min: 0.5, max: 1.5, defaultValue: 0.5 },
};

type FilterName = keyof typeof FILTERS;
type ParametricFilterName = keyof typeof PARAMETRIC_FILTERS;

const ImageRectangle: React.FC = () => {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cumulativeFilters, setCumulativeFilters] = useState<boolean>(false);

  const [selectedParamFilter, setSelectedParamFilter] = useState<
    keyof typeof PARAMETRIC_FILTERS | null
  >(null);
  const [filterValue, setFilterValue] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const loadImageFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImage(imageUrl);
      setOriginalImage(imageUrl); // Guarda la imagen original
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImageFromFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      loadImageFromFile(file);
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
      if (file) loadImageFromFile(file);
    };
    input.click();
  }, []);

  const handleSave = async () => {
    if (!selectedImage) return;
    try {
      await saveImageToDB(selectedImage);
      showMessage("Image saved successfully!");
    } catch (error) {
      console.error(error);
      showMessage("Failed to save image. Please try again.");
    }
  };

  const processImage = async (
    file: File,
    filter: FilterName | keyof typeof PARAMETRIC_FILTERS,
    param?: number
  ) => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    await init();

    let processed;
    if (filter in PARAMETRIC_FILTERS) {
      processed = PARAMETRIC_FILTERS[filter as ParametricFilterName](uint8Array, param || 0);
    } else {
      processed = FILTERS[filter as FilterName](uint8Array);
    }

    const blob = new Blob([processed], { type: "image/png" });
    return URL.createObjectURL(blob);
  };


  const handleApplyFilter = async (
    filter: FilterName | ParametricFilterName,
    param?: number
  ) => {
    if (!selectedImage || !originalImage) return;
    if (filter in PARAMETRIC_FILTERS) {
      const defaultVal =
        PARAMETRIC_FILTERS_VALUES[filter as ParametricFilterName].defaultValue;
      setSelectedParamFilter(filter as keyof typeof PARAMETRIC_FILTERS);
      setFilterValue(defaultVal);
    } else {
      setSelectedParamFilter(null);
    }
    try {
      const sourceImage = cumulativeFilters ? selectedImage : originalImage;
      const response = await fetch(sourceImage);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const processedImageUrl = await processImage(file, filter, param);
      setSelectedImage(processedImageUrl);
      showMessage(
        `${filter[0].toUpperCase() + filter.slice(1)} filter applied!`
      );
    } catch (error) {
      console.error(error);
      showMessage("Failed to apply filter. Please try again.");
    }
  };

  const handleRestoreOriginal = () => {
    if (originalImage) {
      setSelectedImage(originalImage);
      showMessage("Original image restored!");
    }
  };
  const toggleCumulativeFilters = () => {
    setCumulativeFilters((prev) => {
      const next = !prev;
      showMessage(`Cumulative filters ${next ? "enabled" : "disabled"}`);
      return next;
    });
  };

  const FilterButton = ({
    label,
    filter,
  }: {
    label: string;
    filter: FilterName | ParametricFilterName;
  }) => (
    <ActionButton
      onClick={() => handleApplyFilter(filter)}
      disabled={!selectedImage}
    >
      {label}
    </ActionButton>
  );

  return (
    <div style={{ gap: ".5rem", display: "flex", flexDirection: "column" }}>
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
                <ActionButton onClick={() => fileInputRef.current?.click()}>
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
        <FilterButton label="Blur" filter="blur" />
        <FilterButton label="Brighten" filter="brighten" />
        <FilterButton label="Contrast" filter="contrast" />
        <FilterButton label="Invert" filter="invert" />
        <FilterButton label="Gray" filter="grayscale" />
        <FilterButton label="Pink" filter="pink" />
        <FilterButton label="Blue" filter="blue" />
        <FilterButton label="Sepia" filter="sepia" />
        <FilterButton label="Vintage" filter="vintage" />
        <FilterButton label="Vignette" filter="vignette" />
        <FilterButton label="Technicolor" filter="technicolor" />
      </FiltersButtonContainer>

      {selectedParamFilter && (
        <input
          id="param-slider"
          type="range"
          min={PARAMETRIC_FILTERS_VALUES[selectedParamFilter].min * 100}
          max={PARAMETRIC_FILTERS_VALUES[selectedParamFilter].max * 100}
          value={filterValue * 100}
          onChange={async (e) => {
            const newValue = Number(e.target.value) / 100;
            setFilterValue(newValue);
            if (selectedImage && originalImage) {
              const sourceImage = cumulativeFilters
                ? selectedImage
                : originalImage;
              const response = await fetch(sourceImage);
              const blob = await response.blob();
              const file = new File([blob], "image.png", {
                type: "image/png",
              });
              const processedImageUrl = await processImage(
                file,
                selectedParamFilter,
                newValue
              );
              setSelectedImage(processedImageUrl);
            }
          }}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default ImageRectangle;
