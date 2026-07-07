"use client";

import { useState, useRef } from "react";
import { Upload, X, Check } from "lucide-react";

type ImageUploaderProps = {
  onImageUpload: (url: string) => void;
  initialImage?: string;
  maxSize?: number; // in MB
};

export function ImageUploader({ onImageUpload, initialImage, maxSize = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (file: File) => {
    setError(null);
    setSuccess(false);

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`El archivo debe ser menor a ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona un archivo de imagen");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al subir la imagen");
      }

      const data = await response.json();
      const imageUrl = data.url;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      onImageUpload(imageUrl);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current?.classList.remove("border-primary", "bg-primary/5");
    dragRef.current?.classList.add("border-slate-200");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragRef.current?.classList.remove("border-slate-200");
    dragRef.current?.classList.add("border-primary", "bg-primary/5");
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove("border-primary", "bg-primary/5");
    dragRef.current?.classList.add("border-slate-200");
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        ref={dragRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-slate-200 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
          disabled={uploading}
          className="hidden"
        />

        <Upload size={32} className="mx-auto mb-2 text-slate-400" />
        <p className="font-semibold text-slate-700">Arrastra la imagen aquí o haz clic</p>
        <p className="text-sm text-slate-500 mt-1">PNG, JPG, WEBP (máx {maxSize}MB)</p>

        {uploading && (
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />
          {success && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="bg-green-500 text-white rounded-full p-3">
                <Check size={20} />
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setPreview(null);
              setError(null);
              setSuccess(false);
            }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
