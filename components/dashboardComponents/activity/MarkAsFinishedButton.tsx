import { useFormStatus } from "react-dom";

const MarkAsFinishedButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-max text-xs flex gap-1 items-center bg-[#5d897b] text-white font-semibold rounded-md py-1 px-3 transition duration-200 hover:bg-secondary
        ${pending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        `}
    >
      {pending ? "Processing..." : "Mark as Finished"}
    </button>
  );
};

export default MarkAsFinishedButton;
