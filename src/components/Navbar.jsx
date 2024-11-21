import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole"));
    const { logout } = useAuth(); // Destructure logout from useAuth
    const navigate = useNavigate();



    // Handle the logout process
    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirect to login page after logout
    };


    return (
        <nav className="relative z-50 top-auto left-auto w-auto sm:relative sm:top-0 sm:left-0 sm:w-full sm:z-50 bg-[#13162e] text-white px-4 py-4">
            <div className="container mx-auto flex justify-between items-center">

                {/* Left Section: NavLinks */}

                <div className="hidden sm:flex sm:items-center gap-8">
                    {userRole === "commuter" ?
                        <a href="/" className="hover:text-gray-300">Hosts</a> :
                        <a href="/" className="hover:text-gray-300">Commuters</a>
                    }


                    {/* Publish Icon */}
                    <a href="/publish" >
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            add_circle
                        </span>
                    </a>

                    {/* Edit Publish Icon (Non-Clickable) */}
                    <div className=" pointer-events-none">
                        <span className="material-symbols-outlined text-xl text-gray-500">
                            edit
                        </span>
                    </div>

                    {/* Profile Icon */}
                    <a href="/profile">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            person
                        </span>
                    </a>


                    {/* Inbox Icon (Non-Clickable) */}
                    <div className=" pointer-events-none">
                        <span className="material-symbols-outlined text-xl text-gray-500">
                            chat
                        </span>
                    </div>

                </div>

                {/* Right Section: Sign In Button */}
                <div className="hidden sm:flex">
                    <a href="/login" onClick={handleLogout} className="text-white bg-red-700 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-6 py-1">
                        Logout
                    </a>
                </div>




                {/* Mobile Menu Icon */}
                <div className="sm:hidden" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <button className="text-white focus:outline-none">
                        <IoMenu className="mt-2 text-lg" />
                    </button>
                </div>
            </div>



            {/* Mobile Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-[#13162e]">
                    {userRole === "commuter" ?
                        <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-700 text-white">Hosts</a> :
                        <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-700 text-white">Commuters</a>
                    }


                    {/* Publish Icon */}
                    <a href="/publish" className="block py-2 px-4 text-sm hover:bg-gray-700 text-white">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            add_circle
                        </span>
                    </a>

                    {/* Edit Publish Icon (Non-Clickable) */}
                    <div className="block py-2 px-4 text-sm hover:bg-gray-700 text-white pointer-events-none">
                        <span className="material-symbols-outlined  text-xl text-gray-500">
                            edit
                        </span>
                    </div>

                    {/* Profile Icon */}
                    <a href="/profile" className="block py-2 px-4 text-sm hover:bg-gray-700 text-white">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            person
                        </span>
                    </a>


                    {/* Inbox Icon (Non-Clickable) */}
                    <div className="block py-2 px-4 text-sm hover:bg-gray-700 text-white pointer-events-none">
                        <span className="material-symbols-outlined text-xl text-gray-500">
                            chat
                        </span>
                    </div>


                    <div className="flex px-4 mt-4 bg-[#13162e] mb-6 z-50">
                        <a href="/login" onClick={handleLogout} className="text-white bg-red-700 rounded-lg w-full text-center hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-6 py-1 z-50">
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
