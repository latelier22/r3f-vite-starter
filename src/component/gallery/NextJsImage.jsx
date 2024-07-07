import React from "react";
import Image from "next/image";

export default function NextJsImage({
  photo,
  wrapperStyle,
  alt,
  title,
  sizes,
  className,
  onClick,
}) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        className={className}
        onClick={onClick}
        placeholder={photo.blurDataURL ? "blur" : undefined}
        blurDataURL={photo.blurDataURL}
      />
    </div>
  );
}
