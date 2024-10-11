"use client";

interface props {
  currentProgress: number;
  totalProgress: number;
}

const ProgressBar = ({ currentProgress, totalProgress }: props) => {
  const calculateProgress = (
    currentProgress: number = 0,
    totalProgress: number = 0
  ): number => {
    let progress: number = 0;

    progress = (currentProgress / totalProgress) * 100;

    return progress;
  };

  return (
    <div
      className="h-[3px] w-full bg-[#b3b3b3] rounded-sm relative"
    >
      <div
        style={{
          width: `${calculateProgress(currentProgress, totalProgress)}%`,
        }}
        className={`h-[3px] absolute top-0 left-0 bg-secondary`}
      ></div>
    </div>
  );
};

export default ProgressBar;
