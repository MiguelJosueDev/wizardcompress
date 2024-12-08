'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import './globals.css';

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}

