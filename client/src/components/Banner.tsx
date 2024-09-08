interface BannerProps {
  img: string;
}
function Banner({ img }: BannerProps) {
  return (
    <div className="w-full">
      <img src={`/public/${img}.png`} className="w-full" />
    </div>
  );
}

export default Banner;
