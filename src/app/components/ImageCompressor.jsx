import React from 'react';
import {  Zap, Shield, Sparkles  } from 'lucide-react';

const FeatureItem = ({ icon, title, children }) =>{
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-yellow-400 p-2 rounded-full text-purple-900">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-purple-200">{children}</p>
        </div>
      </div>
    )
  }

export const ImageCompressor = () => (
    <div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
            Comprime tus imágenes con magia
        </h1>
        <p className="text-xl mb-8 text-purple-200">
            Optimiza tus imágenes sin perder calidad. Rápido, fácil y mágico.
        </p>
        <div className="space-y-4">
            <FeatureItem icon={<Zap className="w-6 h-6" />} title="Compresión ultrarrápida">
                Procesa tus imágenes en segundos
            </FeatureItem>
            <FeatureItem icon={<Shield className="w-6 h-6" />} title="100% seguro">
                Tus archivos se eliminan automáticamente
            </FeatureItem>
            <FeatureItem icon={<Sparkles className="w-6 h-6" />} title="Calidad mágica">
                Reduce el tamaño sin perder nitidez
            </FeatureItem>
        </div>
    </div>
);
