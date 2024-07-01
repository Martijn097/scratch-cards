export default function Container({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full max-w-480 p-10 mx-auto flex flex-col items-center justify-center transition-padding duration-300 ease">
      {children}
    </div>
  );
}