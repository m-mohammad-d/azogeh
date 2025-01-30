function Footer() {
  return (
    <footer className="w-full max-w-screen-xl my-12 px-6 mx-auto">
      <div className="w-full min-h-[0.5px] mt-5 bg-gray-100"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full mt-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">راهنما و خدمات مشتریان</h2>
          <div className="w-full min-h-[0.5px] mb-4 bg-gray-100"></div>
          <ul className="space-y-4 text-sm sm:text-base">
            <li>نحوه ثبت سفارش</li>
            <li>رویه های ارسال سفارش</li>
            <li>شیوه های پرداخت</li>
            <li>مناطق حمل رایگان</li>
            <li>پاسخ به پرسش های متداول</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">ارتباط با آذوقه</h2>
          <div className="w-full min-h-[0.5px] mb-4 bg-gray-100"></div>
          <ul className="space-y-4 text-sm sm:text-base">
            <li>استخدام</li>
            <li>تماس با ما</li>
            <li>درخواست نمایندگی</li>
            <li>ارتباط با مدیریت</li>
            <li>پرداخت وجه آنلاین</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">درباره آذوقه</h2>
          <div className="w-full min-h-[0.5px] mb-4 bg-gray-100"></div>
          <ul className="space-y-4 text-sm sm:text-base">
            <li>آدرس دفتر فروش</li>
            <li>پیش ثبت نام خرید اقساطی</li>
            <li>مجله بلج</li>
            <li>گارانتی و خدمات پس از فروش</li>
            <li>چطور تخفیف بگیرم؟</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
