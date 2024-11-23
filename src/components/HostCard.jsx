import { IoMdStar } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFaceSmile, faFaceFrown } from '@fortawesome/free-solid-svg-icons';

const HostCard = ({
  fromLocation,
  toLocation,
  departureTime,
  departureDate,
  totalAvailableSeats,
  remainingAvailableSeats,
  price,
  name,
  profilePic,
  rating,
  reviews,
  bookedSeats
}) => {


  // Count the number of male, female, and neutral icons needed
  const maleCount = bookedSeats.filter(seat => seat.gender === 'male').reduce((total, seat) => total + seat.numberOfBookedSeats, 0);
  const femaleCount = bookedSeats.filter(seat => seat.gender === 'female').reduce((total, seat) => total + seat.numberOfBookedSeats, 0);
  const neutralCount = totalAvailableSeats - (maleCount + femaleCount);



  return (
    <div className="w-full mb-3 shadow-md rounded-lg flex items-center overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30">
      <div className="flex flex-row shadow-sm w-full">
        <div className="flex flex-col justify-center basis-2/3 p-4 flex-grow">
          <div className="flex gap-2 mb-1 sm:gap-3">

            <img className="w-10 h-10 rounded-full sm:w-12 sm:h-12" src={`https://carpoolserver-backend.onrender.com${profilePic}`} alt={`${name} profile`} />
            <div className="flex flex-col justify-center">
              <p className="text-gray-100 leading-none text-base mb-[0.18rem]">{name}</p>
              <div className="flex gap-1 items-center">
                <IoMdStar className="text-xs" style={{ fill: "yellow" }} />
                <p className="text-sm text-gray-500 leading-none" style={{ fontSize: "0.65rem" }}>
                  {rating} - {reviews} ratings
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-sm mt-2">
              <span className="mr-1 text-sky-600">{fromLocation}</span>
                to
              <span className="ml-1 text-sky-600">{toLocation}</span>
            </h1>
            <p className="text-base">
              {departureTime} <span className="text-sm text-gray-500 pl-1">{departureDate}</span>
            </p>
          </div>
        </div>
        <div className="basis-1/3 p-4 flex flex-col justify-center">
          <h3 className="text-base font-semibold leading-none">
            <span className="mr-1 text-sky-600">Rs.{price}</span>
            <span className="text-xs text-gray-500">/pas</span>
          </h3>

          {/* Seats Information */}
          <p className="text-[0.65rem] mt-[0.1rem] text-gray-500 leading-none">
            {remainingAvailableSeats} {remainingAvailableSeats === 1 ? "seat left" : "seats left"}
          </p>
          <div className="border rounded-lg flex flex-col mt-2 items-center justify-center w-[4.5rem] h-[4.5rem]">
            <div className="flex flex-wrap gap-1 justify-center w-full">
              {/* Render male icons */}
              {Array.from({ length: maleCount }).map((_, index) => (
                <FontAwesomeIcon
                  key={`male-${index}`}
                  icon={faFaceFrown} // Male icon
                  className="text-blue-500 w-4 h-4 mt-1"
                />
              ))}

              {/* Render female icons */}
              {Array.from({ length: femaleCount }).map((_, index) => (
                <FontAwesomeIcon
                  key={`female-${index}`}
                  icon={faFaceSmile} // Female icon
                  className="text-pink-500 w-4 h-4 mt-1"
                />
              ))}

              {/* Render neutral icons for remaining seats */}
              {Array.from({ length: neutralCount }).map((_, index) => (
                <FontAwesomeIcon
                  key={`neutral-${index}`}
                  icon={faUser} // Neutral icon
                  className="text-gray-500 w-4 h-4 mt-1"
                />
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default HostCard;
