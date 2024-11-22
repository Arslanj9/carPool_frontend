import { useProfile } from '../context/ProfileContext';

const Profile = () => {
    const { userData, selectedRole } = useProfile();

    // console.log(`Inside Profile, userData is: ${JSON.stringify(userData.profilePic)}`)

    if (!userData) return <p className='text-center mt-20'>Loading...</p>;

    return (
        <div className="flex flex-col items-center p-6 mb-5 max-w-md mx-auto rounded-lg shadow-md space-y-6 overflow-hidden border border-gray-100 border-opacity-30">
            <div className="flex space-x-4">
            <img className="w-16 h-16 rounded-full sm:w-24 sm:h-24" src={`https://carpoolserver-backend.onrender.com${userData.profilePic}`} alt="profile pic" />
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <p className="text-yellow-500">⭐ {userData.rating} Rating</p>
                    <p className="text-gray-400">{userData.reviews} Reviews</p>
                </div>
            </div>

            <div className="text-center px-1">
                <h3 className="text-lg font-semibold">About</h3>
                <p className="text-gray-300">{userData.about}</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
                <p className="text-gray-400"><strong>Current Role:</strong> {userData.userRole.toUpperCase()}</p>
                <p className="text-gray-400"><strong>Contact Info:</strong> {userData.contactInfo}</p>
                <p className="text-gray-400"><strong>Designation:</strong> {userData.designation}</p>
                <p className="text-gray-400"><strong>Department:</strong> {userData.department}</p>
                <p className="text-gray-400"><strong>Work City:</strong> {userData.workCity}</p>
            </div>

            {selectedRole === "host" && userData.vehicles && userData.vehicles.length > 0 && (
                <div className="flex flex-col items-center space-y-3">
                    <h3 className="text-lg font-semibold">Vehicles</h3>
                    {userData.vehicles.map((vehicle, index) => (
                        <div key={index} className="text-gray-400">
                            <p><strong>Make:</strong> {vehicle.make}</p>
                            <p><strong>Model:</strong> {vehicle.model}</p>
                            <p><strong>Year:</strong> {vehicle.year}</p>
                            <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
                            {vehicle.images && vehicle.images.length > 0 && (
                                <div className="flex space-x-2">
                                    {vehicle.images.map((image, imgIndex) => (
                                        <img key={imgIndex} src={image} alt="Vehicle" className="w-16 h-16 rounded" />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
