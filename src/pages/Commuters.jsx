import { useState, useEffect } from 'react';
import axios from 'axios'
import CommuterCard from '../components/CommuterCard';
import CommuterDetails from '../components/CommuterDetails';

const Commuters = () => {

  const [commuterData, setCommuterData] = useState([]);
  const [selectedCommuter, setSelectedCommuter] = useState(null);


  
  useEffect(() => {
    const fetchCommuterData = async () => {
      try {
        // Fetch publishes
        const publishResponse = await axios.get("http://localhost:5000/api/publish/getCommuter");
        const publishData = publishResponse.data;
  
  
        // Fetch user details for each publish
        const commuterDetailsPromises = publishData.map(async (commuter) => {
          try {
            // Fetch commuter (user) details
            const userResponse = await axios.post("http://localhost:5000/api/users/getUserData", {
              userId: commuter.publisherId,
            });
            const userData = userResponse.data;
  
  
            // Combine publish data with user data
            return {
              _id: commuter._id,
              fromLocation: commuter.fromLocation,
              toLocation: commuter.toLocation,
              departureDate: commuter.departureDate,
              departureTime: commuter.departureTime,
              status: commuter.commuterFields?.status || "N/A",
              numberOfRequiredSeats: commuter.commuterFields?.numberOfRequiredSeats || 0,
              gender: commuter.commuterFields?.gender || "N/A",
              name: userData.name,
              about: userData.about,
              profilePic: userData.profilePic,
              rating: userData.rating,
              reviews: userData.reviews,
            };
          } catch (error) {
            console.error(`Error processing commuter ${commuter._id}:`, error);
            return null; // Skip failed commuter
          }
        });
  
        const commutersWithUserData = (await Promise.all(commuterDetailsPromises)).filter(Boolean);
  
  
        setCommuterData(commutersWithUserData);
      } catch (error) {
        console.error("Error fetching commuter data:", error);
      }
    };
  
    fetchCommuterData();
  }, []);

  


  const handleCardClick = (user) => {
    setSelectedCommuter(user); // Set the selected commuter
  };

  const handleCloseDetails = () => {
    setSelectedCommuter(null); // Close the details view
  };



  return (
    <div className="p-1 sm:p-6 max-w-lg mx-auto">
      {selectedCommuter ? (
        <CommuterDetails commuter={selectedCommuter} onClose={handleCloseDetails} />
      ) : (
        commuterData.map((commuter) => (
          <div className='hover:cursor-pointer' onClick={() => handleCardClick(commuter)} key={commuter._id}>
            <CommuterCard
              name={commuter.name}
              profilePic={commuter.profilePic}
              rating={commuter.rating}
              reviews={commuter.reviews}
              fromLocation={commuter.fromLocation}
              toLocation={commuter.toLocation}
              departureTime={commuter.departureTime}
              departureDate={commuter.departureDate}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Commuters;
