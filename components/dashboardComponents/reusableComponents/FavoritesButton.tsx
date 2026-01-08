import { useFormStatus } from "react-dom";

import SolarHeartAngleOutline from "@/icons/SolarHeartAngleOutline";
import SolarHeartBold from "@/icons/SolarHeartBold";
import { Oval } from "react-loader-spinner";

interface props {
  userFavorite: boolean;
}

const FavoritesButton = ({ userFavorite }: props) => {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center justify-center gap-1 cursor-pointer">
      <button>
        {pending ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            secondaryColor="#4B6F64"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : userFavorite ? (
          <SolarHeartBold color="#D3F0D1" width="1.3em" height="1.3em" />
        ) : (
          <SolarHeartAngleOutline
            color="#D3F0D1"
            width="1.3em"
            height="1.3em"
          />
        )}
      </button>
    </div>
  );
};

export default FavoritesButton;
