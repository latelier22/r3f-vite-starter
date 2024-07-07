"use client"

import React from "react";

import PhotoAlbum from "react-photo-album";
import NextJsImage from "./NextJsImage";


export default function Gallery({photos}) {
  return (
    <PhotoAlbum
      layout="rows"
      photos={photos}
      renderPhoto={NextJsImage}
      defaultContainerWidth={1200}
      sizes={{ size: "calc(100vw - 240px)" }}
    />
  );
}