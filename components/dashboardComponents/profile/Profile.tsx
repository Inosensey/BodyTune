"use client";

// Components
import DashboardHeader from "../DashboardHeader";
import ProfileContent from "./ProfileContent";

// Icons
import IcOutlinePerson from "@/icons/IcOutlinePerson";

// Types
import { TableRow } from "@/types/database.types";
interface props {
  personalInfo: TableRow<"personal_information">;
}

const Profile = ({personalInfo}:props) => {
  console.log(personalInfo);
  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <div className="phone:px-4 laptop:px-0">
      <DashboardHeader
        headerText="Profile"
        headerDescription="Manage your profile, and preferences"
        Icon={IcOutlinePerson}
      />
      </div>
      <ProfileContent />
    </div>
  );
};

export default Profile;
