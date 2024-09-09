import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const navigate = useNavigate();

  //Hack: use useAuthStore to get verifyEmail function
  const { logout, user, isLoading } = useAuthStore();

  //Hack: logout function
  const handleLogout = (e) => {
    e.preventDefault();

    logout();

    // Hack: Use setTimeout to delay the reload action to avoid page refreshing too quickly
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    //Hack: Redirect to login page after successful Email Verification
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-black text-center text-gray-700">
        DASHBOARD
      </h1>
      <motion.div
        className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
      >
        <h3>Welcome:  <small><b>{ user.name }</b></small></h3>
      </motion.div>
      <motion.div
        className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
      >
        Account Activity <br />
        <small>
          {" "}
          Joined:
          {new Date(user.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </small>{" "}
        <br /> <br />
        <small>
          Last Login:{" "}
          {user.lastlogin
            ? new Date(user.lastlogin).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: "true",
              })
            : "You Signed Up"}
        </small>
      </motion.div>
      <motion.button
        className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="w-6 h-6 mx-auto animate-spin" />
        ) : (
          "Logout"
        )}
      </motion.button>
    </div>
  );
};

export default Home;
