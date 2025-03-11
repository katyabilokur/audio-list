export default function Card({ children, extraStyling }) {
  return (
    <div className={`text-center flex flex-col gap-8 w-80 sm:w-96 rounded-2xl bg-white border border-primary_purple-800 ${extraStyling}`}>
      {children}
    </div>
  );
}
