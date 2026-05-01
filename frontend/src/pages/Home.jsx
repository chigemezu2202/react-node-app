// import { motion } from "framer-motion";
// import { Loader } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// const Home = () => {
//   const navigate = useNavigate();

//   //Hack: use useAuthStore to get verifyEmail function
//   const { logout, user, isLoading } = useAuthStore();

//   //Hack: logout function
//   const handleLogout = (e) => {
//     e.preventDefault();

//     logout();

//     // Hack: Use setTimeout to delay the reload action to avoid page refreshing too quickly
//     // setTimeout(() => {
//     //   window.location.reload();
//     // }, 1000);
//     //Hack: Redirect to login page after successful Email Verification
//     navigate("/login");
//   };

//   return (
//     <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//       <h1 className="mb-4 text-2xl font-black text-center text-gray-700">
//         DASHBOARD
//       </h1>
//       <motion.div
//         className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 "
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 1.02 }}
//       >
//         <h3>Welcome:  <small><b>{ user.name }</b></small></h3>
//       </motion.div>
//       <motion.div
//         className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 1.02 }}
//       >
//         Account Activity <br />
//         <small>
//           {" "}
//           Joined:
//           {new Date(user.createdAt).toLocaleString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </small>{" "}
//         <br /> <br />
//         <small>
//           Last Login:{" "}
//           {user.lastlogin
//             ? new Date(user.lastlogin).toLocaleString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 second: "2-digit",
//                 hour12: "true",
//               })
//             : "You Signed Up"}
//         </small>
//       </motion.div>
//       <motion.button
//         className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 1.02 }}
//         onClick={handleLogout}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <Loader className="w-6 h-6 mx-auto animate-spin" />
//         ) : (
//           "Logout"
//         )}
//       </motion.button>
//     </div>
//   );
// };

// export default Home;

import { motion } from "framer-motion";
import { Loader, LogOut, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const navigate = useNavigate();
  const { logout, user, isLoading } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="w-full  min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 rounded-xl shadow-lg"
        >
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <LogOut size={18} /> Logout
            </>
          )}
        </motion.button>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Welcome Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <User />
            </div>
            <div>
              <p className="text-sm text-gray-400">Welcome back</p>
              <h2 className="text-xl font-semibold">
                {user?.name || "User"}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Joined Date */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Clock />
            </div>
            <div>
              <p className="text-sm text-gray-400">Joined</p>
              <h2 className="text-lg font-medium">
                {new Date(user?.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Last Login */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Clock />
            </div>
            <div>
              <p className="text-sm text-gray-400">Last Login</p>
              <h2 className="text-lg font-medium">
                {user?.lastlogin
                  ? new Date(user.lastlogin).toLocaleString()
                  : "First login"}
              </h2>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activity Section */}
      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-400 text-sm">
            Your recent account activity will appear here. This is where you can
            plug in logs, actions, or analytics later.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

