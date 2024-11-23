import { IoMdStar } from "react-icons/io";

const CommuterCard = ({
  name,
  profilePic,
  rating,
  reviews,
  fromLocation,
  toLocation,
  departureTime,
  departureDate
}) => {

  console.log(`Profile Pic: ${profilePic}`)

  return (
    <div className="w-full mb-3 shadow-md rounded-lg flex items-center overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30 hover:cursor-pointer">
      <div className="flex flex-col shadow-sm w-full">

        {/* Left Side - Profile and Info */}
        <div className="flex sm:flex-row sm:justify-around flex-col justify-center px-4 py-4 flex-grow">
          {/* User Container */}
          <div className="flex gap-3">
            <img className="w-12 h-12 rounded-full" src={`https://carpoolserver-backend.onrender.com${profilePic}`} alt={`${name} profile`} />
            {/* UserName & Ratings */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-400 leading-none text-base mb-[0.18rem]">{name}</p>
              <div className="flex gap-1 items-center">
                <IoMdStar className="text-xs" style={{ fill: "yellow" }} />
                <p className="text-sm text-gray-500 leading-none">
                  {rating} - {reviews} ratings
                </p>
              </div>
            </div>
          </div>
          {/* Location Container */}
          <div className="flex flex-col justify-center mt-3 sm:mt-0">
            <h1 className="text-base">
              <span className="mr-1 text-sky-600">{fromLocation}</span>
                to
              <span className="ml-1 text-sky-600">{toLocation}</span>
            </h1>
            <p className="text-base">
              {departureTime} <span className="text-sm text-gray-400 pl-1">{departureDate}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CommuterCard;
