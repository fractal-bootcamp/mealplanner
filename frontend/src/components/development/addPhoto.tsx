import React, { useState, useRef } from "react";
import { S3 } from "aws-sdk"; // You'll need to install aws-sdk

const RecipeCreator: React.FC = () => {
  // ... (other state variables)
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Function to handle pasting image
  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = (e) => setPhoto(e.target?.result as string);
          reader.readAsDataURL(blob as Blob);
        }
      }
    }
  };

  // Function to handle drag and drop
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Function to handle URL input
  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event.target.value);
  };

  // Function to upload to AWS S3
  const uploadToS3 = async (file: File) => {
    const s3 = new S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET as string,
      Key: `recipe-photos/${Date.now()}-${file.name}`,
      Body: file,
    };

    try {
      const { Location } = await s3.upload(params).promise();
      setPhoto(Location);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      {/* ... (other JSX) */}
      <div className="bg-slate-600 w-full p-4">
        <div>
          <div className="border-4 border-blue-900 p-4">
            <div
              className="w-full h-48 border-4 border-yellow-500 flex flex-col items-center justify-center"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onPaste={handlePaste}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Recipe"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <>
                  <h3>ADD PHOTO</h3>
                  <p>Drag & drop, paste, or select a file</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Select File
              </button>
              <input
                type="text"
                placeholder="Or paste image URL"
                onChange={handleUrlInput}
                className="flex-grow border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ... (other JSX) */}
    </div>
  );
};

export default RecipeCreator;
