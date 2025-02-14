"use server";

import Profile from "@/components/dashboardComponents/profile/Profile";

// Libs
import getUserInformation from "@/lib/getUserInformation";

// Types
import { TableRow } from "@/types/database.types";

const ProfilePage = async () => {
  const res = await getUserInformation();
  let userInformation:
    | { response: TableRow<"personal_information">[] }
    | { response: [] } = { response: [] };
  if (res) {
    userInformation = await res.json();
  } else {
    userInformation  = { response: [] };
  }
  const personalInformation:
    | { response: TableRow<"personal_information">[] }
    | [] = userInformation;
  return (
    <div className="w-full laptop:px-4 laptop:mt-4">
      <Profile personalInfo={personalInformation.response[0]} />
    </div>
  );
};

export default ProfilePage;
