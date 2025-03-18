export default function Select({ options, name, defaultValue }) {
  return (
    <div className="w-full max-w-sm min-w-[100px] row-span-2 sm:row-span-1">
      <div className="relative">
        <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          required
          className={`w-full bg-transparent placeholder:text-zinc-400
             text-zinc-700 text-sm border border-transparent rounded 
             pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none
              focus:border-zinc-400 hover:border-zinc-400
              appearance-none cursor-pointer`}
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.2"
          stroke="currentColor"
          className="h-4 w-4 ml-1 absolute top-2.5 right-2.5 text-zinc-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
}
