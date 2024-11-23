import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { usePublish } from "../context/PublishContext";

function Publish() {
  const { vehicles, publishRide, loading, error, successMessage, setSuccessMessage } = usePublish();
  const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole"))

  console.log(`User Role is: ${userRole}`)



  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    departureDate: "",
    departureTime: "",
    price: "",
    totalAvailableSeats: "",
    remainingAvailableSeats: "",
    vehicleId: "",
    amenities: {
      acHeater: false,
      sunroof: false,
      luggage: false,
    },
    status: "pending",
    numberOfRequiredSeats: "",
    gender: ""
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Automatically set remainingAvailableSeats to equal totalAvailableSeats
      ...(name === "totalAvailableSeats" && {
        remainingAvailableSeats: value,
      }),
    }));
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [name]: checked },
    });
  };


  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value // Set gender to the selected value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert amenities object to an array of selected amenities
    const amenitiesArray = Object.keys(formData.amenities).filter(
      (key) => formData.amenities[key]
    );

    const dataToSend = {
      ...formData,
      amenities: amenitiesArray,
    };

    publishRide(dataToSend);
  };


  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null); // Clear the success message after displaying it
      }, 5000); // Display message for 5 seconds
    }
  }, [successMessage, setSuccessMessage]);






  return (

    <>

      <div className="p-3">
        <div className="w-full mb-3 shadow-md max-w-md mx-auto rounded-lg overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30 p-4">
          {userRole === 'host' ?
            <h1 className="text-center text-2xl mb-9 w-full">Publish a ride</h1> :
            <h1 className="text-center text-2xl mb-9 w-full">Request a ride</h1>
          }


          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="block w-full">
                From:
                <input
                  type="text"
                  name="fromLocation"
                  className="w-full p-2 border rounded-md"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  placeholder="From location"
                />
              </label>
              <label className="block w-full">
                To:
                <input
                  type="text"
                  name="toLocation"
                  className="w-full p-2 border rounded-md"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  placeholder="To location"
                />
              </label>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <label className="block w-full">
                Date:
                <input
                  type="date"
                  name="departureDate"
                  className="w-full p-2 border rounded-md"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block w-full">
                Time:
                <input
                  type="time"
                  name="departureTime"
                  className="w-full p-2 border rounded-md"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                />
              </label>
            </div>






            {/* -------------- Host ------------- */}
            {userRole === "host" ? (
              <>
                <label className="block">
                  Price:
                  <input
                    type="number"
                    name="price"
                    className="w-full p-2 border rounded-md"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price per seat"
                  />
                </label>

                <label className="block">
                  Available Seats:
                  <input
                    type="number"
                    name="totalAvailableSeats"
                    className="w-full p-2 border rounded-md"
                    value={formData.totalAvailableSeats}
                    onChange={handleInputChange}
                    placeholder="Number of seats available"
                  />
                </label>

                <label className="block">
                  Vehicle:
                  <select
                    className="w-full p-2 border rounded-md"
                    name="vehicleId"
                    value={formData.vehicleId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a vehicle</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.make}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="block">
                  <label className="block mb-2">Amenities:</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="acHeater"
                        checked={formData.amenities.acHeater}
                        onChange={handleAmenityChange}
                      />
                      <span className="ml-2">AC/Heater</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sunroof"
                        checked={formData.amenities.sunroof}
                        onChange={handleAmenityChange}
                      />
                      <span className="ml-2">Sunroof</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="luggage"
                        checked={formData.amenities.luggage}
                        onChange={handleAmenityChange}
                      />
                      <span className="ml-2">Luggage</span>
                    </label>
                  </div>
                </div>
              </>
            ) : (

              <>
                <label className="block">
                  No. of required seats:
                  <input
                    type="number"
                    name="numberOfRequiredSeats"
                    className="w-full p-2 border rounded-md"
                    value={formData.numberOfRequiredSeats}
                    onChange={handleInputChange}
                    placeholder="Number of seats needed"
                  />
                </label>

                <div className="block">
                  <label className="block mb-2">Gender Preference:</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleGenderChange}
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleGenderChange}
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>
              </>

            )}

            {error && <p className="text-red-500">{error}</p>}

            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Publish;
