export default function Layout({ className = '', children }) {
  return (
    <div
      className={`bg-black w-full text-white flex flex-col justify-center items-center gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
