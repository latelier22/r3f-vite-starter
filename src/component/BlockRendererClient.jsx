"use client";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({ content }) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return (
            <div className="mx-auto">
              <Image
                src={image.url}
                width={300}
                height={300}
                alt={image.alternativeText || ""}
                className="max-h-96 object-contain"
              />
            </div>
          );
        },
      }}
    />
  );
}
