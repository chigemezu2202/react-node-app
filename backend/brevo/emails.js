//Hack: Imports
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

//Hack: Configure Brevo API Client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

//Hack: Create transactional email instance
const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

//Hack: Email templates
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const sender = { name: "NexTechSphere Innovation", email: "chigemezuezimoha@gmail.com" };



// 1️⃣ Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      "verificationCode",
      verificationToken
    );

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "Verify Your Email Address",
      htmlContent,
    });

    console.log("✅ Verification email sent successfully:", response);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};


// 2️⃣ Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const htmlContent = `
      <h2>Welcome ${name}!</h2>
      <p>Thank you for joining @Auth. We’re excited to have you!</p>
    `;

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "Welcome to @Auth",
      htmlContent,
    });

    console.log("✅ Welcome email sent successfully:", response);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};


// 3️⃣ Reset Password Email
export const sendResetPasswordEmail = async (email, resetToken) => {
  try {
    
    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      
      "resetURL",
      resetToken

    );

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "Password Reset Request",
      htmlContent,
    });

    console.log("✅ Password reset email sent successfully:", response);
  } catch (error) {
    console.error("❌ Error sending reset email:", error);
    throw new Error(`Error sending reset email: ${error.message}`);
  }
};


// 4️⃣ Password Reset Success Email
export const sendResetSuccessfullEmail = async (email, name) => {
  try {
    const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
      "{name}",
      name
    );

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "Password Reset Successful",
      htmlContent,
    });

    console.log("✅ Reset success email sent successfully:", response);
  } catch (error) {
    console.error("❌ Error sending reset success email:", error);
    throw new Error(`Error sending reset success email: ${error.message}`);
  }
};
