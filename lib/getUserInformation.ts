"use server"

import { encryptUserId } from "@/utils/encrypter";
import { headers } from "next/headers";
import getUser from "./getUser";
import { allowedOrigins } from "@/utils/initials";

const getUserInformation = async () => {
    const user = await getUser();
    const userId = user.data.user!.id;
    const encryptedUserId = encryptUserId(userId);
    const headerInfo = headers();
    
    const host = headerInfo.get('X-Forwarded-Host');
    const proto = headerInfo.get('X-Forwarded-Proto');
    const origin = `${proto}://${host}`;

    if (origin && allowedOrigins.includes(origin)) {
        const res = await fetch(
            `http://localhost:3000/api/supabase/getUserInformation?user=${encryptedUserId}`,
            {
            headers: { cookie: headerInfo.get("cookie")! },
            next: { tags: ["personalInformation"] },
            cache: "force-cache",
            }
        );
        return res
    } else {
        return undefined;
    }
}

export default getUserInformation;