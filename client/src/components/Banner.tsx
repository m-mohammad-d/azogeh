interface BannerProps {
  img: string;
}
function Banner({ img }: BannerProps) {
  return (
    <div className="mx-4">
      <img src={`/public/${img}.png`} />
    </div>
  );
}

export default Banner;
