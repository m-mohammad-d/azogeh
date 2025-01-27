import HighlightBar from "./HighlightBar";

function ProductDescription({ description }: { description: string }) {
  return (
    <div className="mt-20 mx-3">
      <h2 className="text-2xl text-primary">مشخصات</h2>
      <HighlightBar />
      <div className="mx-8 leading-10 text-lg mt-6 text-neutral-gray-8">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProductDescription;
