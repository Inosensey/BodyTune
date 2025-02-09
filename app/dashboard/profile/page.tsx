"use server";

import { headers } from "next/headers";

import Profile from "@/components/dashboardComponents/profile/Profile";

// Libs
import getUser from "@/lib/getUser";

// Utils
import { encryptUserId } from "@/utils/encrypter";

// Types
import { TableRow } from "@/types/database.types";

const ProfilePage = async () => {
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
    <div className="w-full laptop:px-4 laptop:mt-4">
        <Profile personalInfo={personalInformation.response[0]} />
    </div>
  );
};

export default ProfilePage;
