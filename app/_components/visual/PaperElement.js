export default function PaperElement({ children }) {
  return (
    <div
      className="flex flex-col bg-white relative my-10 rounded-sm w-11/12 sm:w-5/6 mx-auto py-6
       before:skew-x-[-5deg] before:rotate-[-5deg] before:left-[15px]
      after:skew-x-[5deg] after:rotate-[5deg] after:right-[15px]
     hover:before:left-[5px] hover:after:right-[5px] 
     hover:before:shadow-[0_4px_14px_rgba(0,0,0,.4)] hover:after:shadow-[0_4px_14px_rgba(0,0,0,.4)]
     before:content-[''] before:absolute before:w-2/5 before:h-2.5 before:shadow-[0_8px_20px_rgba(0,0,0,.7)] before:bottom-2.5 
     before:z-[-1] before:transition-all before:duration-300 before:ease-in-out
    after:content-[''] after:absolute after:w-2/5 after:h-2.5 after:shadow-[0_8px_20px_rgba(0,0,0,.7)] after:bottom-2.5 
    after:z-[-1] after:transition-all after:duration-300 after:ease-in-out"
    >
      {children}
    </div>
  );
}
