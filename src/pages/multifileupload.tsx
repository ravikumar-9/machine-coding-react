import { Plus, Upload, X } from "lucide-react";
import { useCallback, useState, type ChangeEvent } from "react";
import type { fileUploadProps } from "../types";
import Button from "../components/ui/button";
import File from "../components/multifileupload/File";
import axios from "axios";
import React from "react";

const Multifileupload = () => {
  const [files, setFiles] = useState<fileUploadProps[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelection = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const selectedFiles = Array.from(e.target.files).map((item) => ({
        isUploaded: false,
        progress: 0,
        file: item,
        id: item.name,
        name: item.name,
        size: item.size,
        type: item.type,
      }));

      setFiles((prev) => [...prev, ...selectedFiles]);
    },
    []
  );

  const handleRemoveFile = (id: string) => {
    const filteredFiles = files.filter((file) => file?.id !== id);
    setFiles(filteredFiles);
  };

  const handleFileUpload = async () => {
    setIsUploading(true);
    const fileUploads = files?.map(async (fileWithProgress) => {
      const formData = new FormData();
      formData.append("file", fileWithProgress?.file);
      try {
        await axios.post("https://httpbin.org/post", formData, {
          onUploadProgress: (ProgressEvent) => {
            const total = ProgressEvent.total ?? 1;
            const progress = Math.round((ProgressEvent?.loaded * 100) / total);
            setFiles((prevFiles) =>
              prevFiles.map((file) =>
                file?.id === fileWithProgress?.id ? { ...file, progress } : file
              )
            );
          },
        });
        setFiles((prevFiles) =>
          prevFiles?.map((file) =>
            file?.id === fileWithProgress?.id
              ? {
                  ...file,
                  isUploaded: true,
                }
              : file
          )
        );
      } catch (error) {
        console.log(error);
      }
    });
    await Promise.all(fileUploads);
    setIsUploading(false);
  };

  const handleClear = useCallback(() => {
    setFiles([]);
  }, []);

  return (
    <div className="bg-gray-900 h-screen p-4 text-white space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="primary" className="text-xs">
          <input
            id="multifile"
            type="file"
            multiple
            className="hidden w-0 h-0"
            onChange={handleFileSelection}
            disabled={isUploading}
          />
          <label
            htmlFor="multifile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add files
          </label>
        </Button>
        <Button
          disabled={files?.length === 0}
          variant="primary"
          className="py-1 px-2 text-xs gap-2"
          onClick={handleFileUpload}
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
        <Button
          disabled={files?.length === 0}
          variant="primary"
          className="py-1 px-2 text-xs gap-2"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-1/2">
        {files?.map((file) => (
          <File
            handleRemoveFile={handleRemoveFile}
            file={file}
            isUploading={isUploading}
          />
        ))}
      </div>
    </div>
  );
};

export default Multifileupload;
