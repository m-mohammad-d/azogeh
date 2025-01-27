import { useEffect, useState } from "react";
import { cn } from "../utils/util";

interface DiscountTimerProps {
  initialendDate: number;
  state?: "active" | "disable";
}

const DiscountTimer = ({ initialendDate, state = "active" }: DiscountTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [endDate, setEndDate] = useState(Number(initialendDate));

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
    if (state === "disable") {
      return;
    }

    const updateTimer = () => {
      const updatedTimeLeft = getTimeLeft(endDate);
      setTimeLeft(updatedTimeLeft);

      if (updatedTimeLeft.hours === 0 && updatedTimeLeft.minutes === 0 && updatedTimeLeft.seconds === 0) {
        setEndDate((prevEndDate) => prevEndDate + 2 * 24 * 60 * 60 * 1000);
      }
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endDate, state]);

  return (
    <div className="flex items-center justify-start space-x-2">
      <div className={cn("ml-2 rounded-md font-bold bg-primary-tint1 p-1 text-xs text-primary md:p-3 md:text-lg", state === "disable" && "bg-neutral-gray-3 text-neutral-gray-5")}>
        <span>{formatTime(timeLeft.seconds)}</span>
      </div>
      <div className={cn("font-bold", state === "disable" ? "text-neutral-gray-3" : "text-primary-tint1")}>:</div>
      <div className={cn("ml-2 rounded-md font-bold bg-primary-tint1 p-1 text-xs text-primary md:p-3 md:text-lg", state === "disable" && "bg-neutral-gray-3 text-neutral-gray-5")}>
        <span>{formatTime(timeLeft.minutes)}</span>
      </div>
      <div className={cn("font-bold", state === "disable" ? "text-neutral-gray-3" : "text-primary-tint1")}>:</div>
      <div className={cn("rounded-md font-bold bg-primary-tint1 p-1 text-xs text-primary md:p-3 md:text-lg", state === "disable" && "bg-neutral-gray-3 text-neutral-gray-5")}>
        <span>{formatTime(timeLeft.hours)}</span>
      </div>
    </div>
  );
};

export default DiscountTimer;
