import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveShippingAddress } from "../store/CartSlice";
import { shippingAddress } from "../types/CartType";
import LocationSelector from "./LocationSelector";
import { cn } from "../utils/util";
import Button from "./Button";

interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  province_id: number;
}

const addressSchema = z.object({
  province: z.string().nonempty("لطفاً استان را انتخاب کنید."),
  city: z.string().nonempty("لطفاً شهر را انتخاب کنید."),
  street: z.string().nonempty("لطفاً آدرس خیابان را وارد کنید."),
});

interface AddressSelectionProps {
  onNext: () => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<shippingAddress>({
    resolver: zodResolver(addressSchema),
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetch("/data/provinces.json")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error loading provinces:", error));

    fetch("/data/cities.json")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error loading cities:", error));
  }, []);

  const onSubmit = (data: shippingAddress) => {
    const selectedProvince = provinces.find((prov) => prov.id === parseInt(data.province));
    const selectedCity = cities.find((city) => city.id === parseInt(data.city));

    if (selectedProvince && selectedCity) {
      const shippingData = {
        ...data,
        province: selectedProvince.name,
        city: selectedCity.name,
      };

      dispatch(saveShippingAddress(shippingData));
      onNext();
    }
  };

  const selectedProvince = watch("province");
  const filteredCities = selectedProvince ? cities.filter((city) => city.province_id === parseInt(selectedProvince)) : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="mb-2 text-lg font-bold">مرحله ۱: انتخاب آدرس</h2>

      <LocationSelector
        options={provinces.map((province) => ({ id: province.id, name: province.name }))}
        value={watch("province")}
        onChange={(selectedValue) => setValue("province", selectedValue)}
        label="استان"
        placeholder="استان را انتخاب کنید"
      />
      {errors.province && <p className="text-status-error">{errors.province.message}</p>}
      <LocationSelector
        options={filteredCities.map((city) => ({ id: city.id, name: city.name }))}
        value={watch("city")}
        onChange={(selectedValue) => setValue("city", selectedValue)}
        label=" شهر"
        placeholder="شهر را انتخاب کنید"
        disabled={!selectedProvince}
      />
      {errors.city && <p className="text-status-error">{errors.city.message}</p>}

      <input type="text" {...register("street")} placeholder="آدرس خیابان" className={cn("mt-2 w-full rounded-md border border-gray-200 px-4 py-2", errors.street && "border-status-error")} />
      {errors.street && <p className="text-status-error">{errors.street.message}</p>}

      <Button>ادامه</Button>
    </form>
  );
};

export default AddressSelection;
