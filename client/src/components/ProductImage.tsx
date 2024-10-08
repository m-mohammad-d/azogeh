
type ProductImageProps = {
  mainImageUrl: string;
  altText: string;
  imageCarousel: string[];
};

function ProductImage({ mainImageUrl , altText }: ProductImageProps) {

  return (
    <div className="mx-auto w-full">
      <img
        src={mainImageUrl}
        alt={altText}
        className="max-w-64 h-64 object-contain rounded-lg shadow-lg transition-transform duration-300 transform"
      />
    </div>
  );
}

export default ProductImage;
