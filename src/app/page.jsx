'use client'

import React from 'react'
import { Button } from '@nextui-org/react'
import { lz77Compress, getFrequencies, buildHuffmanTree, buildCodes, encodeText } from './utils/utils';
import { AnimationBackground, CustomNavbar, ImageCompressor, ImageUpload } from './components';

const convertToBinaryString = (text) => {
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  return bytes;
}

function handleFileUpload(event, action) {
  const file = event.target.files[0];
  console.log('File:', file);
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = convertToBinaryString(e.target.result);

    let compressedData;
    if (action === "compress") {
      compressedData = lz77Compress(text);
      const frequencies = getFrequencies(compressedData);
      const huffmanTree = buildHuffmanTree(frequencies);
      const codes = buildCodes(huffmanTree);
      const encodedText = encodeText(compressedData, codes);
      console.log('Compressed Data:', encodedText);
      // Aquí deberías convertir encodedText en un Blob si quieres permitir su descarga

      new Blob([encodedText], { type: "text/plain" });

    } else if (action === "decompress") {
      // Lógica de descompresión si es necesaria
    }
  };
  reader.readAsText(file); // Leer como texto por simplicidad, ajustar según el contenido del archivo
}

export default function Home() {
 
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
              <ImageUpload onUpload={handleFileUpload} />
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
                onClick={() => downloadBlob(decompressedBlob, "decompressed.txt")}
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
