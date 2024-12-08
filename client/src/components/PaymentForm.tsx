import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { usePayOrderMutation } from "../services/OrderApi";
import { useParams } from "react-router-dom";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .transform(value => value.replace(/\s+/g, ""))
    .refine(value => /^[0-9]{16}$/.test(value), {
      message: "شماره کارت باید 16 رقم باشد.",
    }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV2 باید 3 یا 4 رقم باشد."),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "ماه انقضا معتبر نیست."),
  expiryYear: z.string().refine(
    value => {
      const year = parseInt(value);
      return year >= 1404 && year <= 1410;
    },
    {
      message: "سال انقضا باید بین 1404 تا 1410 باشد.",
    }
  ),
  captcha: z.string().min(1, "لطفاً کد امنیتی را وارد کنید."),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const { id } = useParams();
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [payOrder, { isLoading }] = usePayOrderMutation(); 

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(captcha);
    drawCaptcha(captcha);
  };

  const drawCaptcha = (captcha: string) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "#000000";
        ctx.font = "24px Arial";

        const textWidth = ctx.measureText(captcha).width;
        const x = canvasWidth - textWidth / 2;
        const y = canvasHeight / 2 + 10;
        ctx.fillText(captcha, x, y);
      }
    }
  };

  const onSubmit: SubmitHandler<PaymentFormData> = async data => {
    if (data.captcha !== captchaCode) {
      toast("کد امنیتی اشتباه است.");
      generateCaptcha();
      return;
    }

    try {
      await payOrder({ orderId: id }).unwrap();
      toast.success("پرداخت با موفقیت انجام شد.");
    } catch (error) {
      toast.error("مشکلی در پرداخت محصول به وجود آمد.");
    }
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">فرم پرداخت آنلاین</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">شماره کارت</label>
          <input
            type="text"
            {...register("cardNumber")}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
        </div>

        {/* CVV */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">CVV2</label>
          <input
            type="text"
            {...register("cvv")}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="123"
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
        </div>

        {/* Expiry Date */}
        <div className="mb-4 flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">ماه انقضا</label>
            <input
              type="text"
              {...register("expiryMonth")}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="MM"
            />
            {errors.expiryMonth && <p className="text-red-500 text-sm mt-1">{errors.expiryMonth.message}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">سال انقضا</label>
            <input
              type="text"
              {...register("expiryYear")}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="YY"
            />
            {errors.expiryYear && <p className="text-red-500 text-sm mt-1">{errors.expiryYear.message}</p>}
          </div>
        </div>

        {/* Captcha */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">کد امنیتی</label>
          <canvas ref={canvasRef} width={150} height={50} className=" border rounded-lg mb-2" />
          <input
            type="text"
            {...register("captcha")}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="کد امنیتی"
          />
          {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha.message}</p>}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "در حال پردازش..." : "پرداخت"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
