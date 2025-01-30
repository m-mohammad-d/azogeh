import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const headerTexts = [
  "تازه‌ترین محصولات، مستقیم از مزرعه به سفره شما!",
  "تخفیف‌های ویژه! خرید اقتصادی‌تر از همیشه!",
  "ارسال سریع و رایگان!",
  "با خرید آنلاین، وقت بیشتری برای خانواده داشته باشید!",
  "مواد غذایی سالم، زندگی سالم! همین حالا سفارش دهید.",
  "هر روز با پیشنهادهای شگفت‌انگیز در کنارتان هستیم!",
  "کیفیت بالا، قیمت مناسب، ارسال سریع – سه اصل فروشگاه ما!",
  "میوه و سبزیجات تازه، با عطر و طعم واقعی طبیعت!",
  "از بهترین برندها خرید کنید، با خیال راحت مصرف کنید!",
  "بهترین مواد غذایی، یک کلیک تا آشپزخانه شما!",
];

const AnimatedHeaderText = () => {
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prevIndex) => (prevIndex + 1) % headerTexts.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [headerTexts.length]);

  return (
    <div className="flex h-12 w-full items-center justify-center overflow-hidden bg-primary">
      <motion.div
        key={currentText}
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: -50, opacity: 0 }} 
        transition={{ duration: 1 }}
        className="text-xl text-white"
      >
        {headerTexts[currentText]}
      </motion.div>
    </div>
  );
};

export default AnimatedHeaderText;
