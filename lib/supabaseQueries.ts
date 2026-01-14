"use server";

import { allowedOrigins } from "@/utils/initials";
import { headers } from "next/headers";
import { encryptUserId } from "@/utils/encrypter";
import getUser from "./getUser";

// Types
import {
  bodyTunePlan,
  exercisePlanQuery,
  explorePageContentInterface,
  mealPlanQuery,
  userActivePlanInterface,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
import { overAllStatistics } from "@/types/generalTypes";

export const getUserFavorites = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserFavorites?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["personalInformation"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const userFavorites: Array<TableRow<"user_favorites">> | [] =
      parsedData.response;
    return userFavorites;
  } else {
    return [];
  }
};
export const getUserFavBodyTuneView = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserFavBodytuneView?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userFavBodyTuneView"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const bodyTunes: Array<bodyTunePlan> | [] = parsedData.response;
    return bodyTunes;
  } else {
    return [];
  }
};
export const getUserFavMealView = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserFavMealView?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userFavMealView"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const mealPlans: Array<mealPlanQuery> | [] = parsedData.mealPlanRes;
    return mealPlans;
  } else {
    return [];
  }
};
export const getUserFavExerciseView = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserFavExerciseView?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userFavExerciseView"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const exercisePlans: Array<exercisePlanQuery> | [] = parsedData.res;
    return exercisePlans;
  } else {
    return [];
  }
};

export const getExplorePageContent = async () => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(`${origin}/api/supabase/getExplorePageContent`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["explorePageContent"] },
      cache: "force-cache",
    });
    const parsedData = await res.json();
    const explorePageContent: explorePageContentInterface = parsedData.response;
    return explorePageContent;
  } else {
    return {
      bodyTunes: [],
      exercisePlans: [],
      mealPlans: [],
    };
  }
}

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
    const bodyTunes: Array<bodyTunePlan> | [] = parsedData.response;
    return bodyTunes;
  } else {
    return [];
  }
};

export const getUserBodyTunes = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserBodyTunes?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userBodyTunes"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const bodyTunes: Array<bodyTunePlan> | [] = parsedData.response;
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
    const mealPlans: Array<mealPlanQuery> | [] = parsedData.mealPlanRes;
    return mealPlans;
  } else {
    return [];
  }
};

export const getUserMealPlans = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserMealPlans?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`userMealPlans`] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const mealPlans: Array<mealPlanQuery> | [] = parsedData.mealPlanRes;
    return mealPlans;
  } else {
    return [];
  }
};

export const getMealPlan = async (planId: number) => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getMealPlan?planId=${planId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`mealPlan${planId}`] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const mealPlans: Array<mealPlanQuery> | [] = parsedData.mealPlanRes;
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
    const exercisePlans: Array<exercisePlanQuery> | [] = parsedData.res;
    return exercisePlans;
  } else {
    return [];
  }
};
export const getUserExercisePlans = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserExercisePlans?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`userExercisePlans`] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const exercisePlans: Array<exercisePlanQuery> | [] = parsedData.res;
    return exercisePlans;
  } else {
    return [];
  }
};
export const getExercisePlan = async (planId: number) => {
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getExercisePlan?planId=${planId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`exercisePlan${planId}`] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const bodyTune: Array<exercisePlanQuery> | [] = parsedData.res;
    return bodyTune;
  } else {
    return [];
  }
};

export const getUserActivePlans = async () => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserActivePlan?user=${encryptedUserId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userActivePlans"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const userActivePlan: Array<userActivePlanInterface> | [] =
      parsedData.response;
    return userActivePlan;
  } else {
    return [];
  }
};

export const getUserActivePlanData = async (planDataId: number) => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getUserActivePlanData?user=${encryptedUserId}&activePlanId=${planDataId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userActivePlanData"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const userActivePlanData: Array<TableRow<"user_active_plan_data">> | [] =
      parsedData.response;
    return userActivePlanData;
  } else {
    return [];
  }
};
export const getUserWeeklyStatistics = async (planDataId: number) => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getWeeklyStatistics?user=${encryptedUserId}&activePlanId=${planDataId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userWeeklyActivities"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const userActivePlanData: Array<TableRow<"user_active_plan_data">> | [] =
      parsedData.response;
    return userActivePlanData;
  } else {
    return [];
  }
};
export const getOverAllStatistics = async (planDataId: number) => {
  const user = await getUser();
  const userId = user.data.user!.id;
  const encryptedUserId = encryptUserId(userId);
  const headerInfo = headers();

  const host = headerInfo.get("X-Forwarded-Host");
  const proto = headerInfo.get("X-Forwarded-Proto");
  const origin = `${proto}://${host}`;

  if (origin && allowedOrigins.includes(origin)) {
    const res = await fetch(
      `${origin}/api/supabase/getOverAllStatistics?user=${encryptedUserId}&activePlanId=${planDataId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["userOverAllStatistics"] },
        cache: "force-cache",
      }
    );
    const parsedData = await res.json();
    const userActivePlanData: overAllStatistics = parsedData.response;
    return userActivePlanData;
  } else {
    return {
      mealPlansCount: 0,
      exercisePlansCount: 0,
      bodyTunePlansCount: 0,
      mealPlanCompleted: 0,
      exercisePlanCompleted: 0,
    };
  }
};
