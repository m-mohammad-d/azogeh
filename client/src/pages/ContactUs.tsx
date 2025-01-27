import { FaGithub, FaLinkedin, FaTelegram, FaGlobe, FaDribbble } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="mx-4 mt-12 py-12">
      <div className="container mx-auto mb-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">تماس با ما</h1>
        <p className="mb-8 text-xl text-gray-600">
          ما در تیم خود با دو برنامه نویس و یک طراح خلاق تلاش می کنیم تا بهترین تجربه ها را برای شما رقم بزنیم.اگر سوالی دارید، به کمک نیاز دارید، یا فقط میخواهید نظرتان را با ما به اشتراک بگذارید
          میتونید از طریق لینگ های زیر با ما در ارتباط باشید.{" "}
        </p>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {/* فرانت‌اند دولوپر */}
          <div className="rounded-md bg-white p-6 shadow-lg">
            <img src="avatar-frontend.jpg" alt="Frontend Developer Avatar" className="mx-auto mb-4 h-32 w-32 rounded-full" />
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">برنامه‌نویس فرانت‌اند</h2>
            <p className="mb-4 text-lg text-gray-600">
              سلام! من محمد هستم، یه برنامه‌نویس فرانت‌اند که علاقه‌مند به ساختن تجربه‌های کاربری جذاب و کاربردی هستم. بیشتر با React و Tailwind CSS کار می‌کنم و همیشه دنبال اینم که پروژه‌هام هم
              عملکرد خوبی داشته باشن، هم کیفیت بالا. برای این پروژه، از تکنولوژی‌هایی مثل React و Tailwind CSS استفاده کردم و حسابی روی جزئیات کار وقت گذاشتم. چالش‌های جدید برام هیجان‌انگیزن و همیشه
              دنبال یادگیری ابزارها و تکنولوژی‌های به‌روز هستم تا بتونم توی کارم بهتر بشم. 😊
            </p>
            <p className="mb-4 text-lg text-gray-600">اگر خواستی با من در ارتباط باشی، می‌تونی از طریق تلگرام به من پیام بدی. همچنین، پروژه‌هایی که تا حالا انجام دادم رو می‌تونی تو گیت‌هاب ببینی.</p>

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
              <a href="https://m-mohammad-d.vercel.app/" target="_blank" rel="noopener noreferrer">
                <FaGlobe size={30} className="text-green-600 hover:text-green-500" />
              </a>
            </div>
          </div>

          {/* بک‌اند دولوپر */}
          <div className="rounded-md bg-white p-6 shadow-lg">
            <img src="/avatar-backend.png" alt="Backend Developer Avatar" className="mx-auto mb-4 h-32 w-32 rounded-full" />
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">برنامه‌نویس بک‌اند</h2>
            <p className="mb-4 text-lg text-gray-600">
              در این پروژه، من به عنوان توسعه‌دهنده بک‌اند مسئولیت طراحی و پیاده‌سازی بخش سرور را بر عهده داشتم. با استفاده از فناوری‌هایی مثل Node.js، Express، و TypeScript توانستم APIهایی سریع و امن
              ایجاد کنم که نیازهای فرانت‌اند را به بهترین شکل ممکن پاسخ دهد.
            </p>
            <p className="mb-4 text-lg text-gray-600">
              یکی از بخش‌های کلیدی کارم، مدیریت پایگاه داده با MongoDB و اطمینان از امنیت و بهینه‌سازی درخواست‌ها بود. همچنین با ابزارهایی مثل Cloudinary برای مدیریت فایل‌ها، و تکنیک‌های مختلف امنیتی،
              تلاش کردم تا سروری مقیاس‌پذیر و قابل اعتماد بسازم.
            </p>
            <p className="mb-4 text-lg text-gray-600">
              تجربه همکاری با تیم فرانت‌اند و یکپارچه‌سازی مؤثر، به من کمک کرد تا معماری پروژه را به گونه‌ای طراحی کنم که قابلیت توسعه و نگهداری بالایی داشته باشد. این پروژه فرصتی عالی برای رشد
              حرفه‌ای من و تقویت مهارت‌هایم در توسعه بک‌اند بود.
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
          <div className="rounded-md bg-white p-6 shadow-lg">
            <img src="/avatar-designer.png" alt="designer Avatar" className="mx-auto mb-4 h-32 w-32 rounded-full" />
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">طراح UIUX</h2>
            <p className="mb-8 text-lg text-gray-600">سلام من یک طراح رابط کاربری و تجربه کاربری هستم که با هدف بهبود تجربه کاربری و ایجاد طراحی های جذاب و کاربر پسند فعالیت می کنم.</p>
            <p className="mb-8 text-lg text-gray-600">تمرکز من بر روی تحقیق و شناخت نیازهای کاربران است تا بتوانم طراحی هایی ارائه بدهم که هم زیبا و کارا باشند.</p>
            <p className="mb-8 text-lg text-gray-600">
              در مسیر طراحی، از تحلیل رفتار کاربران تا اجرای دقیق طرح های بصری و تعاملات کاربردی، تلاش می کنم پروژه ها به گونه ای توسعه یابند که هم از نظر زیباشناسی و هم از نظر کارایی در بالاترین سطح
              قرار بگیرند.
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaDribbble size={30} className="text-pink-500" />
              </a>
              <a href="https://ir.linkedin.com/in/marzieh-zekavati-2a25b8347" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} className="text-blue-600 hover:text-blue-500" />
              </a>
              <a href="https://t.me/Monnight_UI" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={30} className="text-blue-400 hover:text-blue-300" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-600">خوشحال می‌شویم اگر با ما در ارتباط باشید و نظرات یا پیشنهادات خود را به اشتراک بگذارید!❤</p>
      </div>
    </div>
  );
};

export default ContactUs;
