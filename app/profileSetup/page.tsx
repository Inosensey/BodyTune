"use server";

import ProfileSetup from "@/components/authComponents/profileSetup/ProfileSetup";

const ProfileSetupPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ProfileSetup />
    </div>
  );
};

export default ProfileSetupPage;
