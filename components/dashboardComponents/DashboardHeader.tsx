"use client";

import { useRouter } from "nextjs-toploader/app";

// Types
interface props {
  headerText: string;
  headerDescription: string;
  Icon: React.ComponentType<{ color: string; width?: string; height?: string }>;
}

const DashboardHeader = ({ headerText, headerDescription, Icon }: props) => {
  const router = useRouter();

  return (
    <div className="bg-black w-full p-4 rounded-lg">
      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="font-dmSans text-sm text-lightSecondary underline w-max cursor-pointer font-semibold"
        >
          Back
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-lg font-dmSans font-bold text-lightSecondary">
              {headerText}
            </p>
            <Icon color="#D3F0D1" width="1.3em" height="1.3em" />
          </div>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
            {headerDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
