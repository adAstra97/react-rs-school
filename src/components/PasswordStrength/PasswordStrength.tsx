import { evaluatePassStrength } from '../../utils/evaluate-pass-strength';

export const PasswordStrength = ({ password }: { password: string }) => {
  const strength = evaluatePassStrength(password);

  const renderIndicator = () => {
    switch (strength) {
      case '':
        return (
          <>
            <span className="border-r-grey border-r-1 h-2 flex-1"></span>
            <span className="border-r-grey border-r-1 h-2 flex-1"></span>
            <span className="h-2 flex-1"></span>
          </>
        );
      case 'Weak':
        return (
          <>
            <span className="border-r-grey border-r-1 h-2 flex-1 bg-error"></span>
            <span className="border-r-grey border-r-1 h-2 flex-1"></span>
            <span className="h-2 flex-1"></span>
          </>
        );
      case 'Medium':
        return (
          <>
            <span className="border-r-grey border-r-1 h-2 flex-1 bg-amber-200"></span>
            <span className="border-r-grey border-r-1 h-2 flex-1 bg-amber-200"></span>
            <span className="h-2 flex-1"></span>
          </>
        );
      case 'Strong':
        return (
          <>
            <span className="border-r-grey border-r-1 h-2 flex-1 bg-green-400"></span>
            <span className="border-r-grey border-r-1 h-2 flex-1 bg-green-400"></span>
            <span className="h-2 flex-1 bg-green-400 border-r-green-400 border-r-1"></span>
          </>
        );
    }
  };
  return (
    <div className="h-2 border-1 border-grey rounded-2xl flex max-w-[250px] overflow-hidden">
      {renderIndicator()}
    </div>
  );
};
