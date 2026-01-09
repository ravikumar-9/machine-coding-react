import { useState, useRef, type ChangeEvent } from "react";
import { Eye, Trash2, Upload, X, ZoomIn, ZoomOut } from "lucide-react";
import Button from "../components/ui/button";
import React from "react";

const ImageGalleryUploader = () => {
  const [images, setImages] = useState<
    { id: number; url: string; file: File }[]
  >([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleView = (url: string) => {
    setPreviewUrl(url);
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.2, 0.5));
  };
  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.2, 3));
  };
  const handleResetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="mt-10 p-6 border border-gray-800 rounded-2xl max-w-2xl w-full bg-gray-900/70 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-100">
            📸 Image Gallery
          </h2>
          <Button
            variant="primary"
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 text-sm"
            onClick={handleOpenFilePicker}
          >
            <Upload className="h-4 w-4" />
            Add Images
          </Button>
          <input
            ref={fileInputRef}
            id="multifile"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Images*/}
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-indigo-500 hover:text-indigo-400 transition">
            <Upload className="h-6 w-6 mb-2 text-indigo-400" />
            <p className="text-sm">No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all"
              >
                <img
                  src={image.url}
                  alt="uploaded"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
                  <Eye
                    className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => handleView(image.url)}
                  />
                  <Trash2
                    className="text-red-500 hover:text-red-400 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => handleDelete(image.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-6"
          onClick={() => {
            setPreviewUrl(null), console.log("parent clicked");
          }}
        >
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4">
            <button
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
            >
              <ZoomOut className="h-5 w-5 text-white" />
            </button>

            <button
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition"
              onClick={(e) => {
                e.stopPropagation();
                handleResetZoom();
              }}
            >
              <span className="text-sm text-gray-300 font-semibold">Reset</span>
            </button>

            <button
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
            >
              <ZoomIn className="h-5 w-5 text-white" />
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 p-2 rounded-full ml-3 transition"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewUrl(null);
              }}
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Image Preview */}
          <div
            className="flex items-center justify-center overflow-auto max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewUrl}
              alt="preview"
              style={{ transform: `scale(${zoom})` }}
              className="rounded-xl object-contain border border-gray-700 shadow-2xl transition-transform duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryUploader;
