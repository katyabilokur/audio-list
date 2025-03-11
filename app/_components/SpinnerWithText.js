function SpinnerWithText({ text }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="spinner"></div>
      <p className="text-zinc-950 text-xl">{text}</p>
    </div>
  );
}

export default SpinnerWithText;
