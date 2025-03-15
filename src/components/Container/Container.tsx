interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
  return <div className="max-w-[1280px] px-4 mx-auto">{children}</div>;
};
