"use server"

import { createSSR } from "@/utils/supabaseSSR"

const getUser = async () => {
    const supabase = await createSSR();
    const user = supabase.auth.getUser();
    return user;
}

export default getUser;