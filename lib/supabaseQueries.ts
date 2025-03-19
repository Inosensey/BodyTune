"use server"

import { allowedOrigins } from "@/utils/initials";
import { headers } from "next/headers";

// Types
import { bodyTunePlan } from "@/types/planTypes";

export const getBodyTunes = async () => {
    const headerInfo = headers();
    
    const host = headerInfo.get('X-Forwarded-Host');
    const proto = headerInfo.get('X-Forwarded-Proto');
    const origin = `${proto}://${host}`;

    if (origin && allowedOrigins.includes(origin)) {
        const res = await fetch(
            `${origin}/api/supabase/getBodyTunes`,
            {
                headers: { cookie: headerInfo.get("cookie")! },
                next: { tags: ["bodyTunes"] },
                cache: "force-cache",
            }
        );
        const parsedData = await res.json();
        const bodyTunes: Array<bodyTunePlan> | undefined = parsedData.res;
        return bodyTunes
    } else {
        return [];
    }
}