"use server";

import ThirdPartyAuthErr from "@/components/authComponents/ThirdPartyAuthErr";

const page = () => {
  return (
    <div>Auth Code Error display
        <div>
            <ThirdPartyAuthErr />
        </div>
    </div>
  )
}

export default page