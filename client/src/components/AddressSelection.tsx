import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveShippingAddress } from "../store/CartSlice";
import { shippingAddress } from "../types/CartType";
import LocationSelector from "./LocationSelector";

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
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error("Error loading provinces:", error));

    fetch("/data/cities.json")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error loading cities:", error));
  }, []);

  const onSubmit = (data: shippingAddress) => {
    const selectedProvince = provinces.find(prov => prov.id === parseInt(data.province));
    const selectedCity = cities.find(city => city.id === parseInt(data.city));

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
  const filteredCities = selectedProvince ? cities.filter(city => city.province_id === parseInt(selectedProvince)) : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold mb-2">مرحله ۱: انتخاب آدرس</h2>

      <LocationSelector
        options={provinces.map(province => ({ id: province.id, name: province.name }))}
        value={watch("province")}
        onChange={selectedValue => setValue("province", selectedValue)}
        label="استان"
        placeholder="استان را انتخاب کنید"
      />
      {errors.province && <p className="text-error-400">{errors.province.message}</p>}
      <LocationSelector
        options={filteredCities.map(city => ({ id: city.id, name: city.name }))}
        value={watch("city")}
        onChange={selectedValue => setValue("city", selectedValue)}
        label=" شهر"
        placeholder="شهر را انتخاب کنید"
        disabled={!selectedProvince}
      />
      {errors.city && <p className="text-error-400">{errors.city.message}</p>}

      <input
        type="text"
        {...register("street")}
        placeholder="آدرس خیابان"
        className="border border-gray-200 rounded-lg px-4 py-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      {errors.street && <p className="text-error-400">{errors.street.message}</p>}

      <button
        type="submit"
        className="mt-4 bg-primary-500 hover:bg-primary-600 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg shadow-md"
      >
        ادامه
      </button>
    </form>
  );
};

export default AddressSelection;
