// Hosts.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import HostCard from '../components/HostCard';
import HostDetails from '../components/HostDetails';

const Hosts = () => {

  const [publishesData, setPublishesData] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);


  // Fetch Publish and Host data
  useEffect(() => {
    const fetchHostsData = async () => {
      try {
        const publishResponse = await axios.get('https://carpoolserver-backend.onrender.com/api/publish/getHost');
        const publishData = publishResponse.data;

        

        // Fetch user details and vehicles for each publish entry
        const hostDetailsPromises = publishData.map(async (publish) => {

          console.log(`Inside Hosts, publish is: ${publish}`)
          
          const userResponse = await axios.post('https://carpoolserver-backend.onrender.com/api/users/getUserData', {
            userId: publish.publisherId,
          });
          const userData = userResponse.data;

          console.log(`Inside Hosts, User Data is: ${userData}`)


          // Fetch vehicle details
          const vehicleResponse = await axios.post('https://carpoolserver-backend.onrender.com/api/users/getVehicle', {
            vehicleId: publish.hostFields.vehicleId,
          });
          const vehicleData = vehicleResponse.data;



          // Combine publish data with user data for each host
          return {
            _id: publish._id,
            fromLocation: publish.fromLocation,
            toLocation: publish.toLocation,
            departureDate: publish.departureDate,
            departureTime: publish.departureTime,
            price: publish.hostFields.price,
            totalAvailableSeats: publish.hostFields.totalAvailableSeats,
            remainingAvailableSeats: publish.hostFields.remainingAvailableSeats,
            amenities: publish.hostFields.amenities,
            bookedSeats: publish.hostFields.bookedSeats.map((seat) => ({
              gender: seat.gender,
              numberOfBookedSeats: seat.numberOfBookedSeats,
            })),
            name: userData.name,
            about: userData.about,
            profilePic: userData.profilePic,
            rating: userData.rating,
            reviews: userData.reviews,
            vehicle: vehicleData, // Add vehicle data if needed
          };
        });

        const publishesWithUserData = await Promise.all(hostDetailsPromises);
        setPublishesData(publishesWithUserData);
      } catch (error) {
        console.error('Error fetching hosts data:', error);
      }
    };

    fetchHostsData();
  }, []);




  const handleCardClick = (user) => {
    setSelectedHost(user); // Set the selected user
  };

  const handleCloseDetails = () => {
    setSelectedHost(null); // Close the details view
  };






  return (
    <div className="p-3 sm:p-6 max-w-lg mx-auto">
      
      {selectedHost ? (
        <HostDetails user={selectedHost} onClose={handleCloseDetails} />
      ) : (
        publishesData.map((user) => (
          <div className='hover:cursor-pointer' onClick={() => handleCardClick(user)} key={user._id}>
            <HostCard
              name={user.name}
              profilePic={user.profilePic}
              rating={user.rating}
              reviews={user.reviews}
              fromLocation={user.fromLocation}
              toLocation={user.toLocation}
              departureTime={user.departureTime}
              departureDate={user.departureDate}
              price={user.price}
              totalAvailableSeats={user.totalAvailableSeats}
              remainingAvailableSeats={user.remainingAvailableSeats}
              bookedSeats={user.bookedSeats}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Hosts;
