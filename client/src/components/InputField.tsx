import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  id: Path<T>;
  type: string;
  placeholder: string;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

const InputField = <T extends FieldValues>({ id, type, placeholder, label, register, error }: InputFieldProps<T>) => {
  return (
    <div className="relative mb-4">
      <div className="bg-white p-4 rounded-lg">
        <div className="relative bg-inherit">
          <input
            id={String(id)}
            type={type}
            {...register(id)}
            className={`peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ${
              error ? "ring-red-500" : "ring-gray-500"
            } focus:ring-sky-600 focus:outline-none focus:border-rose-600`}
            placeholder={placeholder}
          />
          <label
            htmlFor={String(id)}
            className="absolute cursor-text right-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            {label}
          </label>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    </div>
  );
};

export default InputField;
