import {
  Check,
  FileAudio,
  File as FileIcon,
  FileImage,
  FileText,
  FileVideo,
  X,
} from "lucide-react";
import type { fileProps } from "../../types";
import Button from "../ui/button";
import ProgressBar from "../progress_bar/progressBar";
import React from "react";

const File = (props: fileProps) => {
  const { name, type, progress, id, size, isUploaded } = props?.file;
  const { handleRemoveFile, isUploading } = props;

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return FileImage;
    if (mimeType.startsWith("video/")) return FileVideo;
    if (mimeType.startsWith("audio/")) return FileAudio;
    if (mimeType === "application/pdf") return FileText;
    return FileIcon;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const Icon = getFileIcon(type);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-4 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {isUploaded && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
      )}

      {/* Header section */}
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate flex-1 text-base leading-tight">
          {name}
        </p>
        {!isUploading && (
          <Button
            variant="primary"
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 flex-shrink-0"
            onClick={() => handleRemoveFile(id)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Upload success message */}
      {isUploaded && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
          <Check className="h-4 w-4" />
          <span className="text-sm font-medium">Uploaded successfully</span>
        </div>
      )}

      {/* Progress bar */}
      {isUploading && <ProgressBar percentage={progress} />}

      {/* File metadata */}
      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
            {type || "Unknown type"}
          </span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {formatFileSize(size)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default File;
