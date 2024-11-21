import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create ProfileContext
const ProfileContext = createContext();



export const ProfileProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) return;

                const response = await axios.post('http://localhost:5000/api/users/getUserData', { userId });
                setUserData(response.data);

                console.log(`Role of user is: ${JSON.stringify(response.data.userRole)}`)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ProfileContext.Provider value={{ userData }}>
            {children}
        </ProfileContext.Provider>
    );
};


export const useProfile = () => useContext(ProfileContext);