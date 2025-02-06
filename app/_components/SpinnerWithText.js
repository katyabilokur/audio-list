function SpinnerWithText({ text }) {
  return (
    <div className="flex flex-col gap-2 align-middle justify-center">
      <div className="spinner"></div>
      <p className="text-gray-950 text-sm">{text}</p>
    </div>
  );
}

export default SpinnerWithText;
