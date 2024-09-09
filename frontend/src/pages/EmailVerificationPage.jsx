import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//Hack: import useAuthStore
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    //Handle pasted code
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //Focus on the last non-empty input or the first empty one
      const lastFilledindex = newCode.filter((digit) => digit !== "");
      const focusIndex = lastFilledindex < 5 ? lastFilledindex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      //Focus on the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //Hack: use useAuthStore to get verifyEmail function
  const { verifyEmail, isLoading, error, success, status } = useAuthStore();

  //Hack: verifyEmail function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      //Hack: Redirect to home page after successful Email Verification
      navigate("/");
      toast.success("Email Verified Succesfully")
    } catch (error) {
      console.error(error);
      // TODO: Show error message to user
    }
  };
  //Hack:Auto Submit when all field are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl"
    >
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={"6"}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-2xl font-bold text-center text-white bg-gray-700 border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
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
              "Very Up"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailVerificationPage;
