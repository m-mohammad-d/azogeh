import HighlightBar from "./HighlightBar";

function ProductDescription({ description }: { description: string }) {
  return (
    <div className="mt-20 mx-3">
      <h2 className="text-2xl">مشخصات</h2>
      <HighlightBar />
      <div className="mx-8 leading-10 text-lg mt-6 text-gray-400">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProductDescription;
