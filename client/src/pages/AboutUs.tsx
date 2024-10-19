const AboutUs = () => {
  return (
    <div className="py-12 mt-16 mx-4">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">درباره اذوقه</h1>
        <p className="text-xl text-gray-600">
          اذوقه با هدف ارائه بهترین محصولات غذایی سالم و ارگانیک، تجربه خرید آنلاین را برای شما آسان کرده است.
        </p>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center mb-16">
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <img src="/officeTeam.jpg" alt="تیم ما" className="object-cover rounded-lg shadow-lg w-[500px] h-[500px]" />
        </div>
        <div className="md:w-1/2 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">تیم ما</h2>
          <p className="text-lg text-gray-600 mb-4">
            ما در اذوقه با تیمی مجرب و حرفه‌ای تلاش می‌کنیم تا بهترین محصولات غذایی را با کیفیتی عالی و قیمت مناسب به
            شما ارائه کنیم.
          </p>
          <p className="text-lg text-gray-600">
            ماموریت ما ایجاد دسترسی آسان به مواد غذایی با کیفیت است، به گونه‌ای که به راحتی از خانه خود بتوانید بهترین
            انتخاب‌ها را داشته باشید.
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center mb-16">
        <div className="md:w-1/2 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">ماموریت ما</h2>
          <p className="text-lg text-gray-600 mb-4">
            هدف ما ارائه محصولات تازه و سالم به شماست، تا بتوانید به راحتی و با اطمینان از کیفیت، مواد غذایی مورد
            نیازتان را تهیه کنید.
          </p>
          <p className="text-lg text-gray-600">
            ما به طور مداوم به دنبال راه‌های بهبود خدمات و افزایش رضایت مشتریان هستیم. اذوقه همیشه در کنار شماست تا
            بهترین تجربه خرید آنلاین را داشته باشید.
          </p>
        </div>
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <img
            src="Healthy-Lifestyle.jpg"
            alt="ماموریت ما"
            className="object-cover rounded-lg shadow-lg w-[500px] h-[500px]"
          />
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center mb-16">
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <img
            src="organic-fruit.jpg"
            alt="کیفیت محصولات"
            className="object-cover rounded-lg shadow-lg w-[500px] h-[500px]"
          />
        </div>
        <div className="md:w-1/2 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">کیفیت محصولات</h2>
          <p className="text-lg text-gray-600 mb-4">
            ما در اذوقه به کیفیت محصولات اهمیت ویژه‌ای می‌دهیم. تمامی محصولات ما از بهترین تولیدکنندگان داخلی و خارجی
            تهیه شده و از سلامت و تازگی آن‌ها اطمینان حاصل شده است.
          </p>
          <p className="text-lg text-gray-600">
            با خرید از اذوقه، می‌توانید از کیفیت محصولات اطمینان داشته باشید و با خیالی راحت مواد غذایی خود را تهیه
            کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
