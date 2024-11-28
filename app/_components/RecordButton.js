import AudioRecorder from "./AudioRecorder";

function RecordButton({ onClick, children, classToAdd }) {
  return (
    <button
      className={`${classToAdd} flex justify-center items-center inline-block rounded-full transition-all  text-white  w-20 h-20 text-center relative`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RecordButton;
