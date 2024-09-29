type ProductImageProps = {
  mainImageUrl: string;
  altText: string;
  imageCarousel: string[];
};

function ProductImage({ mainImageUrl, altText, imageCarousel }: ProductImageProps) {
  return (
    <div className="flex  items-center gap-4">
      <div className="flex space-x-2">
        {imageCarousel?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`carousel-image-${index}`}
            className="w-16 h-16 object-cover rounded border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
          />
        ))}
      </div>
      <img
        src={mainImageUrl}
        alt={altText}
        className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 transform "
      />
    </div>
  );
}

export default ProductImage;
