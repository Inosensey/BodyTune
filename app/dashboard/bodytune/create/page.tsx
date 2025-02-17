"use server";

import getUserInformation from "@/lib/getUserInformation";

// Components
import MutateForm from "@/components/dashboardComponents/bodytuneStudio/MutateComponents/MutateForm";

// Types
import { TableRow } from "@/types/database.types";

const CreateBodyTunePage = async () => {
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
    <div className="px-4 mt-4 w-full">
      <MutateForm personalInfo={personalInformation.response} />
    </div>
  );
};

export default CreateBodyTunePage;
