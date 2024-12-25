interface BannerProps {
  img: string;
}
function Banner({ img }: BannerProps) {
  return (
    <div className="mx-4 md:mx-0">
      <img
        src={`/${img}.webp`}
        className="h-auto w-full object-fill relative overflow-hidden aspect-[116/71] max-h-[400px]"
        alt="banner"
      />
    </div>
  );
}

export default Banner;
