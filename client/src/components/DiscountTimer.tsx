import { useEffect, useState } from "react";

const DiscountTimer = () => {
  const initialEndDate = new Date().getTime() + 10 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [endDate, setEndDate] = useState(initialEndDate);

  const getTimeLeft = (endDate: number) => {
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time.toString());

  useEffect(() => {
    const updateTimer = () => {
      const updatedTimeLeft = getTimeLeft(endDate);
      setTimeLeft(updatedTimeLeft);

      if (updatedTimeLeft.hours === 0 && updatedTimeLeft.minutes === 0 && updatedTimeLeft.seconds === 0) {
        setEndDate((prevEndDate) => prevEndDate + 2 * 24 * 60 * 60 * 1000);
      }
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex items-center justify-start space-x-2">
      <div className="rounded-lg bg-secondary-400 p-1 text-xs text-white md:p-3 md:text-base ml-2">
        <span>{formatTime(timeLeft.seconds)}</span>
      </div>
      <div className="font-bold text-secondary-200">:</div>
      <div className="rounded-lg bg-secondary-400 p-1 text-xs text-white md:p-3 md:text-base ml-2">
        <span>{formatTime(timeLeft.minutes)}</span>
      </div>
      <div className="font-bold text-secondary-200">:</div>
      <div className="rounded-lg bg-secondary-400 p-1 text-xs text-white md:p-3 md:text-base">
        <span>{formatTime(timeLeft.hours)}</span>
      </div>
    </div>
  );
};

export default DiscountTimer;
