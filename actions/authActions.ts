"use server";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
// import { cookies } from "next/headers";

// Supabase
// import { useSupabase } from "@/utils/supabaseClient";
import { createSSR } from "@/utils/supabaseSSR";

// Types
import { TableInsert } from "@/types/database.types";
import { formReturnType } from "@/types/formTypes";
import { Provider, Session, User } from "@supabase/supabase-js";
import { registerInputType, termsAndConditionTypes } from "@/types/inputTypes";
import { allowedOrigins } from "@/utils/initials";
type credentials = {
  email: string;
  password: string;
};

export const signUpWithEmail = async (
  prevState: formReturnType<
    { user: User | null; session: Session | null } | []
  >,
  formData: FormData
): Promise<
  formReturnType<{ user: User | null; session: Session | null } | []>
  > => {
  const cookieStore = await cookies()
  const accountInfo: credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const personalInfo: registerInputType = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    birthDay: formData.get("birthDay") as string,
    birthMonth: formData.get("birthMonth") as string,
    birthYear: formData.get("birthYear") as string,
    gender: formData.get("gender") as string,
    height: formData.get("height") as string,
    weight: formData.get("weight") as string,
  };

  const termsAndConditions: termsAndConditionTypes = {
    marketingMessages: formData.get("marketingMessages") as string,
    remainders: formData.get("remainders") as string,
    termsAndCondition: formData.get("termsAndCondition") as string,
  };

  try {
    const supabase = await createSSR();
    const { data, error } = await supabase.auth.signUp({
      email: accountInfo.email,
      password: accountInfo.password,
    });
    if (error) {
      if (error.code === "user_already_exists") {
        return {
          success: false,
          error: true,
          data: [],
          message: `There is an error creating new account: Email is already taken.`,
        };
      }
      return {
        success: false,
        error: true,
        data: [],
        message: `There is an error creating new account: ${error.message}`,
      };
    }

    const mutatePersonalInformationRes = await mutatePersonalInformation(
      data.user!.id,
      personalInfo
    );
    if (mutatePersonalInformationRes.error) {
      return mutatePersonalInformationRes;
    }

    const mutateTermsAndConditionsRes = await mutateTermsAndConditions(
      data.user!.id,
      termsAndConditions
    );
    if (mutateTermsAndConditionsRes.error) {
      return mutateTermsAndConditionsRes;
    }  
    cookieStore.set('userHaverPersonalInformation', "true", { secure: true })
    
    return {
      success: true,
      error: false,
      data: data,
      message: ``,
    };
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error creating new account: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

export const profileSetUp = async (
  prevState: formReturnType<[]>,
  formData: FormData
): Promise<formReturnType<[]>> => {
  try {
    const cookieStore = await cookies()
    const supabase = await createSSR();
    const user = await supabase.auth.getUser();
    const userId = user.data.user!.id

    const personalInfo: registerInputType = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      birthDay: formData.get("birthDay") as string,
      birthMonth: formData.get("birthMonth") as string,
      birthYear: formData.get("birthYear") as string,
      gender: formData.get("gender") as string,
      height: formData.get("height") as string,
      weight: formData.get("weight") as string,
    };
  
    const termsAndConditions: termsAndConditionTypes = {
      marketingMessages: formData.get("marketingMessages") as string,
      remainders: formData.get("remainders") as string,
      termsAndCondition: formData.get("termsAndCondition") as string,
    };
    const mutatePersonalInformationRes = await mutatePersonalInformation(
      userId,
      personalInfo
    );
    if (mutatePersonalInformationRes.error) {
      return mutatePersonalInformationRes;
    }

    const mutateTermsAndConditionsRes = await mutateTermsAndConditions(
      userId,
      termsAndConditions
    );
    if (mutateTermsAndConditionsRes.error) {
      return mutateTermsAndConditionsRes;
    }
    cookieStore.set('userHaverPersonalInformation', "true", { secure: true })
    return {
      success: true,
      error: false,
      data: [],
      message: ``,
    };
    
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Inserting your personal Information: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

export const mutatePersonalInformation = async (
  userId: string,
  personalInfo: registerInputType
): Promise<formReturnType<[]>> => {
  const supabase = await createSSR();

  const date = `${personalInfo.birthMonth}/${personalInfo.birthDay}/${personalInfo.birthYear}`;

  try {
    const { error } = await supabase
      .from("personal_information")
      .insert<TableInsert<"personal_information">>({
        user_id: userId,
        name: personalInfo.name,
        birth_date: date,
        gender: personalInfo.gender,
        weight: parseFloat(personalInfo.weight),
        height: parseFloat(personalInfo.height),
      });

    if (error) {
      const errorMessage: string = `There is an error Inserting your personal Information: ${error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }
    return {
      success: true,
      error: false,
      data: [],
      message: ``,
    };
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Inserting your personal Information: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

export const mutateTermsAndConditions = async (
  userId: string,
  termsAndConditionData: termsAndConditionTypes
): Promise<formReturnType<[]>> => {
  const supabase = await createSSR();
  try {
    const { error } = await supabase
      .from("terms_and_condition")
      .insert<TableInsert<"terms_and_condition">>({
        user_id: userId,
        recieve_marketing_messages:
          termsAndConditionData.marketingMessages === "true" ? true : false,
        recieve_progess_updates_remainders:
          termsAndConditionData.remainders === "true" ? true : false,
        agree_terms_and_conditions:
          termsAndConditionData.termsAndCondition === "true" ? true : false,
      });

    if (error) {
      const errorMessage: string = `There is an error Inserting the terms and conditions: ${error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }
    return {
      success: true,
      error: false,
      data: [],
      message: ``,
    };
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Inserting the terms and conditions: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

export const loginWithEmail = async (
  prevState: formReturnType<[]>,
  formData: FormData
): Promise<formReturnType<[]>> => {
  const cookieStore = await cookies()
  const credentials: { email: string; password: string } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const supabase = await createSSR();

    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      return {
        success: false,
        error: true,
        data: [],
        message: `There is an error Logging in: ${error.message}`,
      };
    }
    
    cookieStore.set('userHaverPersonalInformation', "true", { secure: true })
    return {
      success: true,
      error: false,
      data: [],
      message: ``,
    };
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Logging in: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

export const loginWithThirdParty = async (
  prevState: formReturnType<{ redirectLink: string; loginType: string } | []>,
  formData: FormData
): Promise<
  formReturnType<{ redirectLink: string; loginType: string } | []>
> => {
  
  const headerInfo = headers();
  const host = headerInfo.get('X-Forwarded-Host');
  const proto = headerInfo.get('X-Forwarded-Proto');
  const origin = `${proto}://${host}`;
  const nextUrl = `${origin}/auth/callback?next=/dashboard`;

  try {
    const supabase = await createSSR();
    const provider = formData.get("provider") as Provider;
    
    if (origin && !allowedOrigins.includes(origin)) {
      return {
        success: false,
        error: true,
        data: [],
        message: `Not authorized`,
      };
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: nextUrl,
        queryParams: {
          next: "/dashboard",
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) {
      return {
        success: false,
        error: true,
        data: [],
        message: `There is an error Logging in: ${error.message}`,
      };
    }
    const response: { redirectLink: string; loginType: string } = {
      redirectLink: data.url,
      loginType: "thirdParty",
    };

    return {
      success: true,
      error: false,
      data: response,
      message: ``,
    };
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Logging in: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

export const signOut = async () => {
  const supabase = await createSSR();
  const cookieStore = await cookies()
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      return {
        success: false,
        error: true,
        data: [],
        message: `There is an error Signing Out: ${error.message}`,
      };
    }
    
    cookieStore.delete('userHaverPersonalInformation')
  } catch (error: unknown) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Signing Out: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
  redirect("/login");
};
