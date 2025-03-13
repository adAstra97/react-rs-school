import { InputHTMLAttributes, useId } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  errorMessage?: string;
}

export const InputField = ({ id, label, errorMessage, ...rest }: Props) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <div>
        <label htmlFor={inputId} className="text-blue-300">
          {label}
        </label>
        <input
          id={inputId}
          autoComplete="off"
          {...rest}
          className="text-grey border-1"
        />
      </div>
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
