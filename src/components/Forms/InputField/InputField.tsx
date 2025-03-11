import { InputHTMLAttributes, useId } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isError?: boolean;
  errorMessage?: string;
}

export const InputField = ({
  id,
  label,
  isError,
  errorMessage,
  ...rest
}: Props) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <div>
        <label htmlFor={inputId}>{label}</label>
        <input id={inputId} autoComplete="off" {...rest} />
      </div>
      {isError && <span>{errorMessage}</span>}
    </div>
  );
};
