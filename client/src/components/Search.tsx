function Search() {
  return (
    <div className="relative  w-full max-w-md">
      <input
        type="text"
        placeholder="جستجو"
        className="w-full bg-[#F6F5F5] px-7 py-2 pr-12 text-right border  rounded-xl focus:outline-none focus:border-gray-200 focus:ring-gray-300 transition duration-200 ease-in-out"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <img src="/public/icon/search.svg" alt="جستجو" />
      </span>
    </div>
  );
}

export default Search;
