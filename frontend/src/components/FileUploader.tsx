import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

const FileUploader = ({ onFileUpload, isProcessing }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <Card
      className={`p-6 ${
        dragActive ? "border-resume-primary border-2" : "border-dashed"
      }`}
    >
      <div
        className="flex flex-col items-center justify-center min-h-[250px] w-full"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!selectedFile ? (
          <>
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Upload Your Resume
            </h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Drag and drop your resume file here, or click to browse
              <br />
              <span className="text-xs">Supports PDF format up to 5MB</span>
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              className="border-resume-primary text-resume-primary hover:bg-resume-light hover:text-resume-primary"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Browse Files
            </Button>
          </>
        ) : (
          <>
            <FileText className="h-12 w-12 text-resume-primary mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-1">
              File Selected
            </h3>
            <p className="text-sm text-gray-500 mb-4 truncate max-w-full px-4">
              {selectedFile.name}
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-500 hover:bg-gray-50"
                onClick={() => setSelectedFile(null)}
                disabled={isProcessing}
              >
                Change File
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isProcessing}
                className="bg-resume-primary hover:bg-resume-secondary"
              >
                {isProcessing ? "Processing..." : "Extract Skills"}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default FileUploader;
