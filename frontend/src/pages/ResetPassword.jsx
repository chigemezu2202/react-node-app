import { motion } from "framer-motion";
import { Loader, Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCompare, setPasswordCompare] = useState(true);

  //Hack: use useAuthStore to get signup function
  const { resetPassword, isLoading, error, success, status } = useAuthStore();

  //Hack: login function
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password === "" && confirmPassword === "") {
      //   Hack: Empty field block
    } else {
      if (password !== confirmPassword) {
        setPasswordCompare(false);
      } else {
        setPasswordCompare(true);
        //Hack: Reset Password
        await resetPassword(token, password);
        //Hack: Notification lib package
        toast.success("Password Reset Successfully");
        //Hack: Redirect to home page after successful login

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl"
    >
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* //Hack: Show Error message */}
          {status && (
            <p className="mt-2 font-semibold text-center text-red-400">
              <small>{}</small>
            </p>
          )}
          {passwordCompare ? (
            error && (
              <p className="mt-2 font-semibold text-center text-red-500">
                {typeof error === "string" && <small>{error}</small>}
              </p>
            )
          ) : (
            <p className="mt-2 font-semibold text-center text-red-500">
              <small>Password Mismatched</small>
            </p>
          )}
          {success && (
            <p className="mt-2 font-semibold text-center text-red-500">
              {typeof success === "string" && <small>{success}</small>}
            </p>
          )}
          <motion.button
            className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.02 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center gap-2">
                <span>Resetting...</span>{" "}
                <Loader className="w-6 h-6 animate-spin" />
              </span>
            ) : (
              "Set New Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
