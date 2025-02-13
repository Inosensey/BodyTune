"use server"

// Components
import FollowerProfile from "@/components/dashboardComponents/connections/FollowerProfile"

const FollowerProfilePage = () => {
  return (
    <div className="w-full laptop:px-4 laptop:mt-4">
        <FollowerProfile />
    </div>
  )
}

export default FollowerProfilePage