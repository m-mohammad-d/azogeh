interface BannerProps {
  img: string;
}
function Banner({ img }: BannerProps) {
  return (
    <div className="mx-4 h-full">
      <img src={`/${img}.png`} />
    </div>
  );
}

export default Banner;
