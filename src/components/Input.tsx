import { ChangeEventHandler } from "react";

interface props {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  classic: string;
}

export default function Input({ value, onChange, classic }: props) {
  return (
    <input
      type="text"
      defaultValue={value}
      className={`form-input ${classic}`}
      onChange={onChange}
      name={classic}
    />
  );
}
