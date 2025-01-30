import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ServicesPage = () => {
  return (
    <div className="mx-4 mt-16 py-12">
      <motion.div className="container mx-auto mb-12 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">سرویس‌های ما</h1>
        <p className="text-xl text-gray-600">در اذوقه، با ارائه خدمات متنوع و با کیفیت، تجربه خرید آنلاین مواد غذایی را برای شما آسان‌تر و سریع‌تر کرده‌ایم.</p>
      </motion.div>

      <motion.div className="container mx-auto mb-16 flex flex-col items-center md:flex-row" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <div className="mb-6 px-4 md:mb-0 md:w-1/2">
          <motion.img src="deliveryService.jpg" alt="خدمات تحویل" className="h-[500px] w-[500px] rounded-lg object-cover shadow-lg" whileHover={{ scale: 1.05 }} />
        </div>
        <div className="px-4 md:w-1/2">
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">خدمات تحویل سریع</h2>
          <p className="mb-4 text-lg text-gray-600">ما در اذوقه با ارائه خدمات تحویل سریع، اطمینان حاصل می‌کنیم که محصولات غذایی شما در کوتاه‌ترین زمان ممکن به دست شما برسد.</p>
          <p className="text-lg text-gray-600">تمامی سفارشات با بسته‌بندی ایمن و بهداشتی، به دست شما خواهد رسید تا تجربه خریدی بی‌نقص داشته باشید.</p>
        </div>
      </motion.div>

      <motion.div className="container mx-auto mb-16 flex flex-col-reverse items-center md:flex-row" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <div className="px-4 md:w-1/2">
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">پشتیبانی ۲۴ ساعته</h2>
          <p className="mb-4 text-lg text-gray-600">تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات و رفع مشکلات شماست. در هر ساعت از شبانه‌روز می‌توانید با ما در تماس باشید.</p>
          <p className="text-lg text-gray-600">ما تلاش می‌کنیم تا تجربه‌ای بی‌نقص از خرید آنلاین را برای شما به ارمغان بیاوریم.</p>
        </div>
        <div className="mb-6 px-4 md:mb-0 md:w-1/2">
          <motion.img src="customerSupport.jpg" alt="پشتیبانی" className="h-[500px] w-[500px] rounded-lg object-cover shadow-lg" whileHover={{ scale: 1.05 }} />
        </div>
      </motion.div>

      <motion.div className="container mx-auto mb-16 flex flex-col items-center md:flex-row" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <div className="mb-6 px-4 md:mb-0 md:w-1/2">
          <motion.img src="FreeShipping.jpg" alt="ارسال رایگان" className="h-[500px] w-[500px] rounded-lg object-cover shadow-lg" whileHover={{ scale: 1.05 }} />
        </div>
        <div className="px-4 md:w-1/2">
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">ارسال رایگان</h2>
          <p className="mb-4 text-lg text-gray-600">اذوقه برای رفاه حال مشتریان، ارسال رایگان برای تمامی سفارشات بالای مبلغ مشخصی ارائه می‌دهد.</p>
          <p className="text-lg text-gray-600">بدون هیچ هزینه اضافی، محصولات غذایی خود را درب منزل تحویل بگیرید و از خرید آنلاین خود لذت ببرید.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
