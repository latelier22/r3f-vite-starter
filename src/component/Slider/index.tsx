"use client";

import Image from "next/image";
import { useState } from "react";
import getBaseUrl from "@/component/getBaseUrl";

export const Slider = ({
  photos = [
    {
      url: "https://artisans.latelier22.fr/uploads/photo_fuite2_89ee15dd02.png",
      width: 290,
      height: 384,
    },
    {
      url: "https://artisans.latelier22.fr/uploads/photo_fuite1_7b90b988f8.png",
      width: 800,
      height: 455,
    },
  ],
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (xPosition: number, width: number) => {
    const x = Math.max(0, Math.min(xPosition, width));
    const percent = Math.max(0, Math.min((x / width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.clientX - rect.left, rect.width);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.touches[0].clientX - rect.left, rect.width);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const baseUrl = getBaseUrl(photos[0].url);

  return (
    <div
      className="w-full relative"
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full max-w-[700px] aspect-[1/1] m-auto overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        <Image alt="" fill draggable={false} priority src={`${baseUrl}${photos[1].url}`} />

        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[1/1] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            fill
            priority
            draggable={false}
            alt=""
            src={`${baseUrl}${photos[0].url}`}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};
