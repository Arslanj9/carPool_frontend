import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from "./context/AuthContext";
import LoginForm from './pages/LoginForm'
import Navbar from './components/Navbar'
import Hosts from './pages/Hosts'
import Commuters from './pages/Commuters'
import Publish from './pages/Publish'
import Profile from './pages/Profile'
import EditPublish from './pages/EditPublish';
// import Inbox from './pages/Inbox'


function App() {

  const { isLoggedIn, userRole } = useAuth();
  const [userRoleFromLocalStorage, setUserRoleFromLocalStorage] = useState(() => localStorage.getItem("userRole"))


  // Combine userRole and userRoleFromLocalStorage
  const effectiveUserRole = userRole || userRoleFromLocalStorage;


  return (
    <>

      {/* Show Navbar only if the user is logged in and has selected a role */}
      {isLoggedIn && effectiveUserRole && <Navbar />}

      <Routes>
        {/* Show LoginForm if the user is not logged in */}
        {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}


        {/* Host Route - Accessible only if logged in and role is selected */}
        {isLoggedIn && effectiveUserRole == 'commuter' && (
          <Route path="/" element={<Hosts />} />
        )}

        {/* Commuter Route - Accessible only if logged in and role is selected */}
        {isLoggedIn && effectiveUserRole === 'host' && (
          <Route path="/" element={<Commuters />} />
        )}

        {isLoggedIn && effectiveUserRole && (
          <Route path="/publish" element={<Publish />} />
        )}

        {isLoggedIn && effectiveUserRole && (
          <Route path="/profile" element={<Profile />} />
        )}

        {isLoggedIn && effectiveUserRole && (
          <Route path="/editPublish" element={<EditPublish />} />
        )}

        {/* {isLoggedIn && isRoleSelected && (
          <Route path="/inbox" element={<Inbox />} />
        )} */}


      </Routes>

    </>
  )
}

export default App
