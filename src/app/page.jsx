'use client'

import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import { lz77Compress, getFrequencies, buildHuffmanTree, buildCodes, encodeText } from './utils/utils';
import { AnimationBackground, CustomNavbar, ImageCompressor, ImageUpload } from './components';

function convertToBinaryString(buffer) {
  return Array.from(buffer)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');
}

// function handleFileUpload(event, action) {
//   const file = event.target.files[0];
//   if (!file) return;
  
//   console.log('File:', file);

//   const reader = new FileReader();
//   reader.onload = async (e) => {
//     const binaryString = convertToBinaryString(new Uint8Array(e.target.result));
    
//     if (action === "compress") {
//       const compressedData = lz77Compress(binaryString);
      
//       const frequencies = getFrequencies(compressedData);
      
//       const huffmanTree = buildHuffmanTree(frequencies);
//       const codes = buildCodes(huffmanTree);
//       const encodedText = encodeText(compressedData, codes);
      
//       console.log('Compressed Data (Binary):', encodedText);

//       const blob = new Blob([encodedText], { type: "text/plain" });
//       const url = URL.createObjectURL(blob);
//       console.log("Download Link:", url);
//     } else if (action === "decompress") {
//       // Lógica de descompresión aquí
//     }
//   };

//   reader.readAsArrayBuffer(file); // Leer como ArrayBuffer para manipular los bytes
// }
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [compressedBlob, setCompressedBlob] = useState(null);
  console.log('compressedBlob', compressedBlob);
  const handleFileUpload = (event, action) => {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (!file) return reject('No file selected');
  
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const binaryString = convertToBinaryString(new Uint8Array(e.target.result));
  
          if (action === "compress") {
            const compressedData = lz77Compress(binaryString);
            const frequencies = getFrequencies(compressedData);
            const huffmanTree = buildHuffmanTree(frequencies);
            const codes = buildCodes(huffmanTree);
            const encodedText = encodeText(compressedData, codes);
  
            const blob = new Blob([encodedText], { type: "text/plain" });
            setCompressedBlob(blob);
            resolve(blob);
          }
        } catch (error) {
          reject(error);
        }
      };
  
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white relative overflow-hidden">
        <AnimationBackground />

        <div className="relative z-10">
          {/* Navbar */}
          <CustomNavbar />

          {/* Contenido principal */}
          <main className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Columna izquierda */}
              <ImageCompressor />
              {/* Columna derecha */}
              <ImageUpload onUpload={handleFileUpload} downloadBlob={downloadBlob} />
            </div>
            <hr className="my-8" />
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Sube y descomprime un archivo</h2>
              <input
                type="file"
                accept=".json"
                onChange={(e) => handleFileUpload(e, "decompress")}
                className="mb-4"
              />
              <Button
                color="warning"
                size="lg"
                onClick={() => {}}
              >
                Descargar archivo descomprimido
              </Button>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
