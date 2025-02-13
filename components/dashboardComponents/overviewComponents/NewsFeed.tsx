// Icons
import {
  faPersonCirclePlus,
  faStar,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewsFeed = () => {
  return (
    <div className="w-full px-4 mt-4 flex gap-3 phone:flex-col tablet:flex-row">
      <div
        data-testid="news-feed-container"
        className="bg-black flex flex-col rounded-md px-4 p-3 phone:w-12/12 tablet:w-[800px]"
      >
        <div className="flex flex-col">
          <p className="font-dmSans font-semibold text-lightSecondary">
            News Feed (from Followed Accounts)
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
            Stay up-to-date with the latest plans and routines from your network
          </p>
        </div>

        <div
          data-testid="news-list"
          className="flex flex-col gap-1 mt-2 max-h-[200px] overflow-auto"
        >
          <table>
            <thead>
              <tr className="text-left">
                <th className="text-lightSecondary text-[0.9rem] font-semibold font-dmSans p-1">
                  Name
                </th>
                <th className="text-lightSecondary text-[0.9rem] font-semibold font-dmSans p-1">
                  News
                </th>
                <th className="text-lightSecondary text-[0.9rem] font-semibold font-dmSans p-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[0.8rem]">
              <tr>
                <td className="p-1 hover:text-lightSecondary hover:underline cursor-pointer">
                  Philip
                </td>
                <td className="p-1">Created a new BodyTune</td>
                <td className="p-1">
                  <button className="border-[2px] border-secondary bg-secondary bg-opacity-50 text-white font-quickSand font-bold rounded-md py-1 px-3 hover:bg-opacity-100 transition ease-in-out duration-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-1 hover:text-lightSecondary hover:underline cursor-pointer">
                  Philip
                </td>
                <td className="p-1">Created a new Meal Plan</td>
                <td className="p-1">
                  <button className="border-[2px] border-secondary bg-secondary bg-opacity-50 text-white font-quickSand font-bold rounded-md py-1 px-3 hover:bg-opacity-100 transition ease-in-out duration-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-1 hover:text-lightSecondary hover:underline cursor-pointer">
                  Philip
                </td>
                <td className="p-1">Created a new Exercise Plan</td>
                <td className="p-1">
                  <button className="border-[2px] border-secondary bg-secondary bg-opacity-50 text-white font-quickSand font-bold rounded-md py-1 px-3 hover:bg-opacity-100 transition ease-in-out duration-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-1 hover:text-lightSecondary hover:underline cursor-pointer">
                  Philip
                </td>
                <td className="p-1">Created a new Exercise Plan</td>
                <td className="p-1">
                  <button className="border-[2px] border-secondary bg-secondary bg-opacity-50 text-white font-quickSand font-bold rounded-md py-1 px-3 hover:bg-opacity-100 transition ease-in-out duration-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-1 hover:text-lightSecondary hover:underline cursor-pointer">
                  Philip
                </td>
                <td className="p-1">Created a new Exercise Plan</td>
                <td className="p-1">
                  <button className="border-[2px] border-secondary bg-secondary bg-opacity-50 text-white font-quickSand font-bold rounded-md py-1 px-3 hover:bg-opacity-100 transition ease-in-out duration-300">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-1 hover:text-lightSecondary hover:underline cursor-pointer">
                  Philip
                </td>
                <td className="p-1">Created a new Exercise Plan</td>
                <td className="p-1">
                  <button className="border-[2px] border-secondary bg-secondary bg-opacity-50 text-white font-quickSand font-bold rounded-md py-1 px-3 hover:bg-opacity-100 transition ease-in-out duration-300">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        data-testid="notifications-container"
        className="bg-black flex-1 rounded-md px-4 p-3"
      >
        <div className="flex flex-col">
          <p className="font-dmSans font-semibold text-lightSecondary">
            Notifications
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
            Important updates on new activities and interactions
          </p>
        </div>
        <div className="flex flex-col gap-1 max-h-[200px] overflow-auto mt-2">
          <div className="flex items-center gap-1 cursor-pointer rounded-lg py-1 px-2 w-max font-quickSand text-[0.8rem] font-semibold text-notificationTextColor bg-comment bg-opacity-70 hover:bg-opacity-100 transition ease-in-out duration-300">
            <p>Clarence Commented in your meal plan</p>
            <FontAwesomeIcon icon={faComment} className="text-sm" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer rounded-lg py-1 px-2 w-max font-quickSand text-[0.8rem] font-semibold text-notificationTextColor bg-achievement bg-opacity-70 hover:bg-opacity-100 transition ease-in-out duration-300">
            <p>Clarence got a new Achievement!</p>
            <FontAwesomeIcon icon={faStar} className="text-sm" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer rounded-lg py-1 px-2 w-max font-quickSand text-[0.8rem] font-semibold text-notificationTextColor bg-newFollower bg-opacity-70 hover:bg-opacity-100 transition ease-in-out duration-300">
            <p>Clarence Followed you!</p>
            <FontAwesomeIcon icon={faPersonCirclePlus} className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
