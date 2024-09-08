function Footer() {
  return (
    <footer className="w-full max-w-screen-2xl my-12 px-6 mx-auto">
      <div className="w-full min-h-0.5 mt-5 bg-gray-100"></div>
      <div className="grid grid-cols-3 justify-items-center	gap-12 w-full mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">راهنما و خدمات مشتریان</h2>
          <div className="w-full min-h-0.5 mb-4 bg-gray-100"></div>
          <ul className="space-y-4">
            <li>نحوه ثبت سفارش</li>
            <li>رویه های ارسال سفارش</li>
            <li>شیوه های پرداخت</li>
            <li>مناطق حمل رایگان</li>
            <li>پاسخ به پرسش های متداول</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">ارتباط با آذوقه</h2>
          <div className="w-full min-h-0.5 mb-4 bg-gray-100"></div>
          <ul className="space-y-4">
            <li>استخدام</li>
            <li>تماس با ما</li>
            <li>درخواست نمایندگی</li>
            <li>ارتباط با مدیریت</li>
            <li>پرداخت وجه آنلاین</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">درباره آذوقه</h2>
          <div className="w-full min-h-0.5 mb-4 bg-gray-100"></div>
          <ul className="space-y-4">
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
