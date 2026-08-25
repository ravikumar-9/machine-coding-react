import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { v4 as uuid } from "uuid";
import Button from "../components/ui/button";

interface filesType {
  id: string;
  file: File;
}
const DragAndDrop = () => {
  const [files, setFiles] = useState<filesType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (selectedFiles: filesType[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    const selectedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      id: uuid(),
      file,
    }));
    handleFiles(selectedFiles);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).map((file) => ({
      id: uuid(),
      file,
    }));
    handleFiles(selectedFiles);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <section className="w-full px-4 py-2 border border-amber-50 rounded-md">
        {files?.length > 0 ? (
          <div className="grid grid-cols-1 mg:grid-cols-3 lg:grid-cols-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 m-2 border border-gray-300 rounded-md relative"
              >
                <button
                  className="absolute top-0 p-2 right-0 bg-red-500 text-white rounded-full"
                  onClick={() =>
                    setFiles((prevFiles) =>
                      prevFiles.filter((f) => f.id !== file.id)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-gray-900 font-semibold text-sm">
                  {file.file.name}
                </p>
                <p className="text-gray-900 font-normal text-sm">
                  {file.file.type}
                </p>
                {file.file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file?.file)}
                    className="h-full w-full object-fit"
                  />
                )}
                {file.file.type.startsWith("video/") && (
                  <video
                    src={URL.createObjectURL(file?.file)}
                    className="h-full w-full object-fit"
                    controls
                  />
                )}
                {file.file.type === "application/pdf" && (
                  <embed
                    src={URL.createObjectURL(file?.file)}
                    type="application/pdf"
                    className="h-full w-full object-fit"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-amber-50">No files selected</p>
        )}
      </section>
      <section
        className="flex flex-col items-center justify-center rounded-md border border-dashed border-blue-400 h-100 w-md"
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/* video/* application/pdf text/*"
          hidden
          id="fileInput"
          onChange={(e) => handleUpload(e)}
        />
        <Upload className="h-6 w-6 text-gray-700" />
        <p>Drag and drop files here or click to select files</p>
        <Button variant="primary">Browse Files</Button>
      </section>
    </div>
  );
};

export default DragAndDrop;
