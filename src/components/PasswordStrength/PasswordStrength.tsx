import { evaluatePassStrength } from '../../utils/evaluate-pass-strength';

export const PasswordStrength = ({ password }: { password: string }) => {
  const strength = evaluatePassStrength(password);

  const renderIndicator = () => {
    switch (strength) {
      case '':
        return (
          <>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-gray-800"></span>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-gray-800"></span>
            <span className="h-3 flex-1 bg-gray-800"></span>
          </>
        );
      case 'Weak':
        return (
          <>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-error"></span>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-gray-800"></span>
            <span className="h-3 flex-1 bg-gray-800"></span>
          </>
        );
      case 'Medium':
        return (
          <>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-amber-200"></span>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-amber-200"></span>
            <span className="h-3 flex-1 bg-gray-800"></span>
          </>
        );
      case 'Strong':
        return (
          <>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-green-400"></span>
            <span className="border-r-grey border-r-2 h-3 flex-1 bg-green-400"></span>
            <span className="h-3 flex-1 bg-green-400 border-r-green-400 border-r-2"></span>
          </>
        );
    }
  };
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="h-3 border-1 border-grey rounded-2xl flex w-full max-w-[400px] overflow-hidden">
        {renderIndicator()}
      </div>
      <span
        className={`${strength?.length ? 'opacity-100' : 'opacity-0'} text-light`}
      >
        Password is {strength}
      </span>
    </div>
  );
};
