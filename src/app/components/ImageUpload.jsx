import React, { useState, useCallback } from 'react'
import { Button, Card, CardBody, Progress } from '@nextui-org/react'
import { Upload } from 'lucide-react';



export const ImageUpload = ({ onUpload, downloadBlob }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [compressedBlob, setCompressedBlob] = useState(null);

    const handleFileChange = async (e) => {
        try {
          const blob = await onUpload(e, "compress");
          setCompressedBlob(blob);
          setUploadProgress(100);
        } catch (error) {
          console.error(error);
          setUploadProgress(0);
        }
      };
      
    const onDrop = useCallback(
      (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          onUpload({ target: { files: e.dataTransfer.files } }, "compress")
            .then((blob) => setCompressedBlob(blob))
            .catch(console.error);
          e.dataTransfer.clearData();
        }
      },
      [onUpload]
    );
  
    const onDragOver = useCallback((e) => e.preventDefault(), []);
    const onDragEnter = useCallback(() => setDragActive(true), []);
    const onDragLeave = useCallback(() => setDragActive(false), []);
  
    return (
      <div>
        <Card
          className={`border-4 transition-all ${dragActive ? 'border-yellow-400 scale-105' : 'border-purple-400'}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        >
          <CardBody className="py-12">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="p-6 bg-purple-600 rounded-full">
                <Upload className="w-12 h-12 text-yellow-400" />
              </div>
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                <Button
  color="warning"
  size="lg"
  onClick={() => {
    if (compressedBlob) {
      downloadBlob(compressedBlob, "compressed.txt");
    }
  }}
  disabled={!compressedBlob}
>
  Descargar archivo comprimido
</Button>
                <p className="text-purple-200">o arrastra y suelta tus imágenes aquí</p>
              </div>
              {uploadProgress > 0 && (
                <Progress
                  size="md"
                  value={uploadProgress}
                  color="warning"
                  showValueLabel={true}
                  className="max-w-md"
                />
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };
  