interface ErrorBlockProps {
  errorText: string;
}

export const ErrorBlock = ({ errorText }: ErrorBlockProps) => {
  return (
    <div className="h-[calc(100vh-200px)] flex justify-center text-center items-center">
      <span className="text-gray-400 text-3xl">{`${errorText} :(`}</span>
    </div>
  );
};
