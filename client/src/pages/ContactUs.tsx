import { FaGithub, FaLinkedin, FaTelegram, FaGlobe } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">تماس با ما</h1>
        <p className="text-xl text-gray-600 mb-8">
          ما یک تیم دو نفره از برنامه‌نویسان هستیم که بر روی پروژه‌های مختلف کار می‌کنیم. اگر سوالی دارید یا می‌خواهید
          با ما در تماس باشید، از طریق لینک‌های زیر با ما ارتباط برقرار کنید.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* فرانت‌اند دولوپر */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Frontend Developer Avatar"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">برنامه‌نویس فرانت‌اند</h2>
            <p className="text-lg text-gray-600 mb-4">
              سلام! من محمد، یک برنامه‌نویس فرانت‌اند با علاقه‌ای عمیق به ساخت رابط‌های کاربری زیبا و کاربرپسند هستم. با
              تخصص در React و Tailwind CSS، تلاش می‌کنم تا تجربه‌های دیجیتالی روان و منحصربه‌فردی ایجاد کنم. پروژه‌هایی
              که انجام داده‌ام، توانایی من در حل مسائل پیچیده و ارائه راه‌حل‌های خلاقانه را به نمایش می‌گذارند. همیشه در
              جستجوی یادگیری تکنولوژی‌های جدید هستم و به دنبال چالش‌های جدید برای پیشرفت در حرفه‌ام هستم.
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
              src="https://via.placeholder.com/150"
              alt="Backend Developer Avatar"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">برنامه‌نویس بک‌اند</h2>
            <p className="text-lg text-gray-600 mb-4">
              من مسئول توسعه و پیاده‌سازی سرور و APIها هستم. با استفاده از تکنولوژی‌هایی مثل Node.js و MongoDB،
              سیستم‌های پایدار و مقیاس‌پذیر ایجاد می‌کنم.
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <a href="https://github.com/your-github-backend" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} className="text-gray-800 hover:text-gray-600" />
              </a>
              <a href="https://linkedin.com/in/your-linkedin-backend" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} className="text-blue-600 hover:text-blue-500" />
              </a>
              <a href="https://t.me/your-telegram-backend" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={30} className="text-blue-400 hover:text-blue-300" />
              </a>
              <a href="https://your-website-backend.com" target="_blank" rel="noopener noreferrer">
                <FaGlobe size={30} className="text-green-600 hover:text-green-500" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-600">
          خوشحال می‌شویم اگر با ما در ارتباط باشید و نظرات یا پیشنهادات خود را به اشتراک بگذارید!
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
