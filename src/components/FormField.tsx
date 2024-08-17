import { FC } from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: FC<FormFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="my-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        className="border rounded w-full py-2 px-3 text-gray-700"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
