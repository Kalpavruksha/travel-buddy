"use client";

import React from 'react';

interface LightweightBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function LightweightBackground({ children, className = '' }: LightweightBackgroundProps) {
  return (
    <div className={`lightweight-bg ${className}`}>
      {children}
    </div>
  );
}