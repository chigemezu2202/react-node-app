import { motion } from "framer-motion";
import { Loader } from "lucide-react";
const NotFound = () => {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
   
        <motion.div
          className="flex w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.02 }}
        >
          <Loader className="w-6 h-6 mx-auto animate-spin" />
          <span className="mb-4 text-2xl font-black text-center text-gray-700 cursor-pointer">Page Not Found</span>
          <Loader className="w-6 h-6 mx-auto animate-spin" />
        </motion.div>
    
    </div>
  );
};

export default NotFound;
