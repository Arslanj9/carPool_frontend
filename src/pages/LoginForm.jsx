import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function LoginForm() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, setError } = useAuth(); // Use context
  const navigate = useNavigate();



  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null); // Reset error after 5 seconds
      }, 4000);
    }

    // Cleanup function to clear the timer if the component unmounts or error changes
    return () => clearTimeout(timer);
  }, [error]);


  const handleInputChange = (e) => {
    setName( e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, password); // Call login from context

    localStorage.getItem("userId") 
    ? navigate("/") 
    : console.log("User is not logged in");
  };

  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };




  return (
    <div className="flex items-center justify-center mt-3 sm:mt-16 bg-[#13162e] z-2">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#21243D] bg-opacity-40 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center bg-transparent">Login</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-transparent">

          <div>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-100 border-opacity-30 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              placeholder="Enter your username"
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-100 border-opacity-30 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-4 bg-green-300 right-3 flex items-center cursor-pointer"
            >
              {showPassword ?
                <span className="material-symbols-outlined ">
                  visibility_off
                </span> :
                <span className="material-symbols-outlined">
                  visibility
                </span>}
            </span>
          </div>

          {error && <p className="text-red-500 text-center bg-transparent">{error}</p>} {/* Display error if any */}

          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default LoginForm;
