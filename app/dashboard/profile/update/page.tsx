"use server";

import getUserInformation from "@/lib/getUserInformation";
// Components
import MutateForm from "@/components/dashboardComponents/profile/MutateComponents/MutateForm";

// Types
import { TableRow } from "@/types/database.types";

const UpdateProfilePage = async () => {
  const res = await getUserInformation();
  let userInformation:
    | { response: TableRow<"personal_information">[] }
    | { response: [] } = { response: [] };
  if (res) {
    userInformation = await res.json();
  } else {
    userInformation = { response: [] };
  }
  const personalInformation:
    | { response: TableRow<"personal_information">[] }
    | [] = userInformation;

  return (
    <div className="px-4 h-screen w-full">
      <MutateForm personalInfo={personalInformation.response[0]} />
    </div>
  );
};

export default UpdateProfilePage;
