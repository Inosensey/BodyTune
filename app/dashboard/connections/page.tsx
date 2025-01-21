"use server"

import Connections from "@/components/dashboardComponents/connections/Connections"


const ConnectionsPage = () => {
  return (
    <div className='px-4 mt-4 w-full'>
      <Connections />
    </div>
  )
}

export default ConnectionsPage