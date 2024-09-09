import { motion } from "framer-motion";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Hack: use useAuthStore to get signup function
  const { forgotPassword, isLoading, error, success, status, user } =
    useAuthStore();

  //Hack: forgot function
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    await forgotPassword(email);
    //Hack:show sent forget password mail page
    setIsSubmitted(true);
    //Hack: Notification lib package
    toast.success("Email Sent Successfully");
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
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <>
            <p className="mb-6 text-center text-gray-300">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <form onSubmit={handleForgotPassword}>
              <Input
                icon={Mail}
                type="email"
                placeholder="yourmail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* //Hack: Show Error message */}
              {status && (
                <p className="mt-2 font-semibold text-center text-red-400">
                  <small>{}</small>
                </p>
              )}
              {error && (
                <p className="mt-2 font-semibold text-center text-red-500">
                  {typeof error === "string" && <small>{error}</small>}
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
                  <Loader className="w-6 h-6 mx-auto animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Mail className="w-16 h-16 px-4 py-4 text-white bg-green-400 bg-opacity-50 rounded-full" />
            </div>
            <p className="mb-6 text-center text-gray-300">
              If an account exists for {user.email}, <br /> you will receive a
              password reset link shortly.
            </p>
          </>
        )}
      </div>

      <div className="flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50">
        <p className="text-sm text-gray-400">
          <Link
            to={"/login"}
            className="flex gap-1 text-green-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mx-auto my-auto" />
            Back to Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
