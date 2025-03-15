import { InputHTMLAttributes, useId } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  errorMessage?: string;
  classes?: string;
}

export const InputField = ({
  id,
  label,
  errorMessage,
  classes,
  ...rest
}: Props) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-0.5">
      <div className={`flex flex-col gap-1 ${classes}`}>
        <label htmlFor={inputId} className="text-blue-300">
          {label}
        </label>
        <input
          id={inputId}
          autoComplete="off"
          {...rest}
          className="text-grey border-b-1 outline-0"
        />
      </div>
      <div className="h-5 flex items-center justify-center">
        {errorMessage && (
          <span className="text-error inline-block text-sm">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};
