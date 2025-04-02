"use server";

import { allowedOrigins } from "@/utils/initials";
import { headers } from "next/headers";

// Types
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
} from "@/types/planTypes";

export const getBodyTunes = async () => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(`${origin}/api/supabase/getBodyTunes`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["bodyTunes"] },
      cache: "force-cache",
    });
    const parsedData = await res.json();
    const bodyTunes: Array<bodyTunePlan> | undefined = parsedData.res;
    return bodyTunes;
  } else {
    return [];
  }
};

export const getBodyTune = async (planId: number) => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getBodyTune?planId=${planId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`bodyTunes${planId}`] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const bodyTune: Array<bodyTunePlan> | [] = parsedData.res;
    return bodyTune;
  } else {
    return [];
  }
};

export const getMealPlans = async () => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(`${origin}/api/supabase/getMealPlans`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: [`mealPlans`] },
      cache: "force-cache",
    });
    const parsedData = await res.json();
    const mealPlans: Array<mealPlanQuery> | [] = parsedData;
    return mealPlans;
  } else {
    return [];
  }
};
export const getExercisePlans = async () => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(`${origin}/api/supabase/getExercisePlans`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: [`exercisePlans`] },
      cache: "force-cache",
    });
    const parsedData = await res.json();
    const exercisePlans: Array<exercisePlanQuery> | [] = parsedData;
    return exercisePlans;
  } else {
    return [];
  }
};
