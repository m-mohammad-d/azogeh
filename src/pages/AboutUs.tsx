import { motion } from "framer-motion";
import MetaTags from "../components/MetaTag";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutUs = () => {
  return (
    <div className="mx-4 mt-16 py-12">
      <MetaTags title="درباره ما | اذوقه" description="ما در اذوقه بهترین و تازه‌ترین مواد غذایی را برای شما فراهم می‌کنیم. با ما بیشتر آشنا شوید." keywords="درباره ما, فروشگاه آنلاین, مواد غذایی" />
      <motion.div className="container mx-auto mb-12 text-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">درباره اذوقه</h1>
        <p className="text-xl text-gray-600">اذوقه با هدف ارائه بهترین محصولات غذایی سالم و ارگانیک، تجربه خرید آنلاین را برای شما آسان کرده است.</p>
      </motion.div>

      <div className="container mx-auto mb-16 flex flex-col items-center md:flex-row">
        <motion.div className="mb-6 px-4 md:mb-0 md:w-1/2" variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src="/officeTeam.jpg" alt="تیم ما" className="h-[500px] w-[500px] rounded-lg object-cover shadow-lg" />
        </motion.div>
        <motion.div className="px-4 md:w-1/2" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">تیم ما</h2>
          <p className="mb-4 text-lg text-gray-600">ما در اذوقه با تیمی مجرب و حرفه‌ای تلاش می‌کنیم تا بهترین محصولات غذایی را با کیفیتی عالی و قیمت مناسب به شما ارائه کنیم.</p>
          <p className="text-lg text-gray-600">ماموریت ما ایجاد دسترسی آسان به مواد غذایی با کیفیت است، به گونه‌ای که به راحتی از خانه خود بتوانید بهترین انتخاب‌ها را داشته باشید.</p>
        </motion.div>
      </div>

      <div className="container mx-auto mb-16 flex flex-col-reverse items-center md:flex-row">
        <motion.div className="px-4 md:w-1/2" variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">ماموریت ما</h2>
          <p className="mb-4 text-lg text-gray-600">هدف ما ارائه محصولات تازه و سالم به شماست، تا بتوانید به راحتی و با اطمینان از کیفیت، مواد غذایی مورد نیازتان را تهیه کنید.</p>
          <p className="text-lg text-gray-600">ما به طور مداوم به دنبال راه‌های بهبود خدمات و افزایش رضایت مشتریان هستیم. اذوقه همیشه در کنار شماست تا بهترین تجربه خرید آنلاین را داشته باشید.</p>
        </motion.div>
        <motion.div className="mb-6 px-4 md:mb-0 md:w-1/2" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src="Healthy-Lifestyle.jpg" alt="ماموریت ما" className="h-[500px] w-[500px] rounded-lg object-cover shadow-lg" />
        </motion.div>
      </div>

      <div className="container mx-auto mb-16 flex flex-col items-center md:flex-row">
        <motion.div className="mb-6 px-4 md:mb-0 md:w-1/2" variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src="organic-fruit.jpg" alt="کیفیت محصولات" className="h-[500px] w-[500px] rounded-lg object-cover shadow-lg" />
        </motion.div>
        <motion.div className="px-4 md:w-1/2" variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">کیفیت محصولات</h2>
          <p className="mb-4 text-lg text-gray-600">
            ما در اذوقه به کیفیت محصولات اهمیت ویژه‌ای می‌دهیم. تمامی محصولات ما از بهترین تولیدکنندگان داخلی و خارجی تهیه شده و از سلامت و تازگی آن‌ها اطمینان حاصل شده است.
          </p>
          <p className="text-lg text-gray-600">با خرید از اذوقه، می‌توانید از کیفیت محصولات اطمینان داشته باشید و با خیالی راحت مواد غذایی خود را تهیه کنید.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
