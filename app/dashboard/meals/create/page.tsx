"use server";

import { headers } from "next/headers";
import getUser from "@/lib/getUser";
import { encryptUserId } from "@/utils/encrypter";

// Types
import { TableRow } from "@/types/database.types";
import MutateForm from "@/components/dashboardComponents/bodytuneMeals/MutateComponents/MutateForm";

const CreateMealPage = async () => {
    const user = await getUser();
    const userId = user.data.user!.id;
    const encryptedUserId = encryptUserId(userId);
    const headerInfo = headers();
    const res = await fetch(
      `http://localhost:3000/api/supabase/getUserInformation?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["personalInformation"] },
        cache: "force-cache",
      }
    );
    const personalInformation: { response: TableRow<"personal_information">[] } = await res.json();
  return (
    
    <div className="px-4 mt-4 w-full"><MutateForm personalInfo={personalInformation.response} /></div>
  )
}

export default CreateMealPage