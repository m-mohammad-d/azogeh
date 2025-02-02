// MetaTags.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  robots?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, keywords, image, url, robots = "index, follow" }) => {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta description */}
      <meta name="description" content={description} />

      {/* Meta keywords (optional) */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />

      {/* Twitter meta tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Robots meta tag */}
      <meta name="robots" content={robots} />
    </Helmet>
  );
};

export default MetaTags;
