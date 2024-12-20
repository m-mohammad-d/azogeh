import { FaGithub, FaLinkedin, FaTelegram, FaGlobe } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="py-12 mt-12 mx-4">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">تماس با ما</h1>
        <p className="text-xl text-gray-600 mb-8">
          ما یک تیم دو نفره از برنامه‌نویسان هستیم که بر روی پروژه‌های مختلف کار می‌کنیم. اگر سوالی دارید یا می‌خواهید
          با ما در تماس باشید، از طریق لینک‌های زیر با ما ارتباط برقرار کنید.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* فرانت‌اند دولوپر */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="avatar-frontend.jpg"
              alt="Frontend Developer Avatar"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">برنامه‌نویس فرانت‌اند</h2>
            <p className="text-lg text-gray-600 mb-4">
              سلام! من محمد هستم، یک برنامه‌نویس فرانت‌اند که به ساخت تجربه‌های کاربری کاربرپسند و جذاب علاقه‌مندم. تخصص
              من در React و Tailwind CSS هست و همیشه تلاش می‌کنم تا پروژه‌هایی با کیفیت بالا و عملکرد روان بسازم. از
              چالش‌های جدید خوشم میاد و همیشه دنبال یادگیری تکنولوژی‌های نوین برای پیشرفت در کارم هستم.
            </p>

            <div className="flex justify-center space-x-4 space-x-reverse">
              <a href="https://github.com/m-mohammad-d" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} className="text-gray-800 hover:text-gray-600" />
              </a>
              <a href="https://linkedin.com/in/silver-shade-90b2a6302" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} className="text-blue-600 hover:text-blue-500" />
              </a>
              <a href="https://t.me/silver_shade1" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={30} className="text-blue-400 hover:text-blue-300" />
              </a>
              <a href="https://your-website-frontend.com" target="_blank" rel="noopener noreferrer">
                <FaGlobe size={30} className="text-green-600 hover:text-green-500" />
              </a>
            </div>
          </div>

          {/* بک‌اند دولوپر */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="/avatar-backend.png"
              alt="Backend Developer Avatar"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">برنامه‌نویس بک‌اند</h2>
            <p className="text-lg text-gray-600 mb-4">
              در این پروژه، من به عنوان توسعه‌دهنده بک‌اند مسئولیت طراحی و پیاده‌سازی بخش سرور را بر عهده داشتم. با
              استفاده از فناوری‌هایی مثل Node.js، Express، و TypeScript توانستم APIهایی سریع و امن ایجاد کنم که نیازهای
              فرانت‌اند را به بهترین شکل ممکن پاسخ دهد.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              یکی از بخش‌های کلیدی کارم، مدیریت پایگاه داده با MongoDB و اطمینان از امنیت و بهینه‌سازی درخواست‌ها بود.
              همچنین با ابزارهایی مثل Cloudinary برای مدیریت فایل‌ها، و تکنیک‌های مختلف امنیتی، تلاش کردم تا سروری
              مقیاس‌پذیر و قابل اعتماد بسازم.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              تجربه همکاری با تیم فرانت‌اند و یکپارچه‌سازی مؤثر، به من کمک کرد تا معماری پروژه را به گونه‌ای طراحی کنم
              که قابلیت توسعه و نگهداری بالایی داشته باشد. این پروژه فرصتی عالی برای رشد حرفه‌ای من و تقویت مهارت‌هایم
              در توسعه بک‌اند بود.
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <a href="https://github.com/h3nrzi" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} className="text-gray-800 hover:text-gray-600" />
              </a>
              <a href="https://linkedin.com/in/h3nrzi" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} className="text-blue-600 hover:text-blue-500" />
              </a>
              <a href="https://t.me/h3nrzi" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={30} className="text-blue-400 hover:text-blue-300" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaGlobe size={30} className="text-green-600 hover:text-green-500" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-600">
          خوشحال می‌شویم اگر با ما در ارتباط باشید و نظرات یا پیشنهادات خود را به اشتراک بگذارید!❤
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
