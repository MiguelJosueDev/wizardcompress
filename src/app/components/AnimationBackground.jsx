import React from 'react';

export const AnimationBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute -inset-[10px] opacity-50">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full mix-blend-multiply filter blur-xl animate-blob"
                        style={{
                            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 400 + 100}px`,
                            height: `${Math.random() * 400 + 100}px`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${Math.random() * 20 + 10}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
