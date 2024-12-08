import React, { useState, useCallback } from 'react'
import { Button, Card, CardBody, Progress } from '@nextui-org/react'
import { Upload } from 'lucide-react';

const downloadBlob = (blob, filename) => {
  if (!blob) {
    console.error('No blob to download');
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const ImageUpload = ({onUpload}) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [compressedBlob, setCompressedBlob] = useState(null);
    console.log('compressedBlob', compressedBlob);
    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload({ target: { files: e.dataTransfer.files } }, "compress")
              .then(blob => setCompressedBlob(blob));
          e.dataTransfer.clearData();
        }
      }, []);
    
      const onDragOver = useCallback((e) => {
        e.preventDefault();
      }, []);
    
      const onDragEnter = useCallback(() => {
        setDragActive(true);
      }, []);
    
      const onDragLeave = useCallback(() => {
        setDragActive(false);
      }, []);
    
    return (
        <div>
                <Card
                  className={`border-4 transition-all ${dragActive ? 'border-yellow-400 scale-105' : 'border-purple-400'
                    }`}
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
                          onChange={(e) => onUpload(e, "compress").then(blob => setCompressedBlob(blob))}
                          className="mb-4"
                        />
                        <Button
                          color="warning"
                          size="lg"
                          onClick={() => downloadBlob(compressedBlob, "compressed.txt")}
                        >
                          Descargar archivo comprimido
                        </Button>
                        <p className="text-purple-200">
                          o arrastra y suelta tus imágenes aquí
                        </p>
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
    )};