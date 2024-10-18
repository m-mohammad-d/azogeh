const ServicesPage = () => {
  return (
    <div className="py-12 mt-16">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">سرویس‌های ما</h1>
        <p className="text-xl text-gray-600">
          در اذوقه، با ارائه خدمات متنوع و با کیفیت، تجربه خرید آنلاین مواد غذایی را برای شما آسان‌تر و سریع‌تر
          کرده‌ایم.
        </p>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center mb-16">
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <img
            src="deliveryService.jpg"
            alt="خدمات تحویل"
            className="object-cover rounded-lg shadow-lg w-[500px] h-[500px]"
          />
        </div>
        <div className="md:w-1/2 px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">خدمات تحویل سریع</h2>
          <p className="text-lg text-gray-600 mb-4">
            ما در اذوقه با ارائه خدمات تحویل سریع، اطمینان حاصل می‌کنیم که محصولات غذایی شما در کوتاه‌ترین زمان ممکن به
            دست شما برسد.
          </p>
          <p className="text-lg text-gray-600">
            تمامی سفارشات با بسته‌بندی ایمن و بهداشتی، به دست شما خواهد رسید تا تجربه خریدی بی‌نقص داشته باشید.
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center mb-16">
        <div className="md:w-1/2 px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">پشتیبانی ۲۴ ساعته</h2>
          <p className="text-lg text-gray-600 mb-4">
            تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات و رفع مشکلات شماست. در هر ساعت از شبانه‌روز می‌توانید با ما
            در تماس باشید.
          </p>
          <p className="text-lg text-gray-600">
            ما تلاش می‌کنیم تا تجربه‌ای بی‌نقص از خرید آنلاین را برای شما به ارمغان بیاوریم.
          </p>
        </div>
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <img
            src="customerSupport.jpg"
            alt="پشتیبانی"
            className="object-cover rounded-lg shadow-lg w-[500px] h-[500px]"
          />
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center mb-16">
        <div className="md:w-1/2 mb-6 md:mb-0 px-4">
          <img
            src="FreeShipping.jpg"
            alt="ارسال رایگان"
            className="object-cover rounded-lg shadow-lg w-[500px] h-[500px]"
          />
        </div>
        <div className="md:w-1/2 px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">ارسال رایگان</h2>
          <p className="text-lg text-gray-600 mb-4">
            اذوقه برای رفاه حال مشتریان، ارسال رایگان برای تمامی سفارشات بالای مبلغ مشخصی ارائه می‌دهد.
          </p>
          <p className="text-lg text-gray-600">
            بدون هیچ هزینه اضافی، محصولات غذایی خود را درب منزل تحویل بگیرید و از خرید آنلاین خود لذت ببرید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
