import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="origin-center flex items-center justify-center grid-cols-1 w-1/3 bg-gray-100 text-black font-bold py-14 px-4 rounded my-1"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
