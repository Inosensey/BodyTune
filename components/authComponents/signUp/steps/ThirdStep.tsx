"use client";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";

// icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Types
import { registerInputType } from "@/types/inputTypes";
interface props {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  setRegisterInput: React.Dispatch<React.SetStateAction<registerInputType>>;
  progressTitle: string;
  currentProgress: number;
  totalProgress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const months:Array<string> = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];


const ThirdStep = ({
  name,
  birthDay,
  birthMonth,
  birthYear,
  gender,
  setRegisterInput,
  progressTitle,
  currentProgress,
  totalProgress,
  setProgress,
}: props) => {
  // States

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };
  const radioOnChange = (value: string, name: string) => {
    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex flex-col justify-center mx-auto gap-8 max-w-[450px] phone:w-8/12 mt-4">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setProgress((prev) => prev - 1)}
      >
        <IcOutlineArrowBackIosNew
          color="#4B6F64"
          width="1.7em"
          height="1.7em"
        />
        <div>
          <p className="text-[#ccc] font-dmSans font-semibold text-sm">
            Step {currentProgress} of {totalProgress}
          </p>
          <p className="font-quickSand font-bold">{progressTitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <div className="w-full relative">
            <Input
              dataTestId="password-input"
              name="name"
              placeholder="Enter your Name"
              state={name}
              type="text"
              label="Name"
              shortDescription="This name will appear on your profile"
              onChange={onChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <label className="phone:text-sm font-quickSand font-semibold">
              Date of birth
            </label>
            <p className="text-[#999999] text-xs font-semibold font-dmSans">
              Why do we need your date of birth? Learn more.
            </p>
          </div>
          <div className="flex items-center gap-1 w-full">
            <div className="w-4/12 relative">
              <Input
                name={birthDay}
                placeholder="dd"
                state={name}
                type="text"
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="w-full relative mt-[0.45rem]">
              <div
                className={`flex flex-col phone:w-[96%] mdphone:w-11/12 laptop:w-full gap-2 bg-primary`}
              >
                <select
                  className={`bg-transparent w-[92%]text-white h-[2.7rem] phone:text-sm font-quickSand`}
                  onChange={selectOnChange}
                  name="birthMonth"
                  defaultValue={birthMonth}
                >
                  <option className="bg-primary font-quickSand" value="" disabled>
                    Month
                  </option>
                  {months.map((month:string) => (
                    
                    <option className="bg-primary font-quickSand" key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-5/12/12 relative">
              <Input
                name={birthYear}
                placeholder="yyyy"
                state={name}
                type="text"
                onChange={onChange}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <label className="phone:text-sm font-quickSand font-semibold">
              Gender
            </label>
            <p className="text-[#999999] text-xs font-semibold font-dmSans">
              Why do we need your date of birth?We use your gender to help
              personalize our content recommendations for you.
            </p>
          </div>
          <div className="w-full flex items-center flex-wrap gap-2 mt-2">
            <div
              className="flex items-center gap-1 cursor group font-dmSans"
              onClick={() => radioOnChange("Male", "gender")}
            >
              <div
                style={{
                  boxShadow:
                    gender === "Male" ? "0px 0px 0px 3.5px #4B6F64 inset" : "",
                }}
                className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
              ></div>
              <label>Male</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                className="hidden"
                onChange={() => console.log("wew")}
                checked={gender === "Male" ? true : false}
              />
            </div>
            <div
              className="flex items-center gap-1 cursor group font-dmSans"
              onClick={() => radioOnChange("Female", "gender")}
            >
              <div
                style={{
                  boxShadow:
                    gender === "Female"
                      ? "0px 0px 0px 3.5px #4B6F64 inset"
                      : "",
                }}
                className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
              ></div>
              <label>Female</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                className="hidden"
                onChange={() => console.log("wew")}
                checked={gender === "Female" ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
