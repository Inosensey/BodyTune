"use client";

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import IcBaselinePeopleOutline from "@/icons/IcBaselinePeopleOutline";
import FollowerProfileContent from "./FollowerProfileContent";

const FollowerProfile = () => {
  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <div className="phone:px-4 laptop:px-0">
        <DashboardHeader
          headerText="Connections"
          headerDescription="Your Fitness Network"
          Icon={IcBaselinePeopleOutline}
        />
      </div>
      <FollowerProfileContent />
    </div>
  );
};

export default FollowerProfile;
