//Hack: Package imports
import bcryptjs from 'bcryptjs';//Hack: password encryption
import crypto from 'crypto'; //Hack: Reset token

//Hack: Local imports
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessfullEmail } from '../mailtrap/emails.js';

//Todo: Signup Function
export const signup = async (req, res) => {
    //Hack: distructure req.body 
    const { email, password, name } = req.body;

    //Todo: Error handling before signup || create user
    try {
        //Hack: check if any field is empty
        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        //Hack: if user already exited
        const useAlreadyExists = await User.findOne({ email });

        if (useAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        //Hack: Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        //Hack: Verification Implement JWT Token Generation
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        //Hack: Create User
        //Hack: Saves a new document or updates an existing document if it has been modified.
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //Hack: 24 hours 
        })

        //Hack: Save User
        //Hack: If the document is new, it is inserted into the database. If it already exists, any changes made to the document are saved.
        await user.save();

        //Hack: JWT
        //Hack: Created token and set the cookie
        generateTokenAndSetCookie(res, user._id)

        //Hack: Send Verification email
        await sendVerificationEmail(user.email, verificationToken);

        //Hack: Send success response
        res.status(201).json({
            success: true, message: "User registered successfully", user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false, message: error.message,
        })
    }
}

//Todo: Verify Email Function
export const verifyEmail = async (req, res) => {
    //Hack: Get Six Digit Verification Code
    const { code } = req.body;

    //Hack: Block of code for verification
    try {
        const user = await User.findOne({
            //Hack: find the Token
            verificationToken: code,
            //Hack: Ckeck if it is expired by checking if greater than present time
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        //Hack: send invalid token or expired token if there is no record or result from filter logic
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }

        //Hack: set user isVerified = true if there is record or result from filter logic
        user.isVerified = true;
        //Hack: set verificationToken to undefine once user isVerified = true
        user.verificationToken = undefined;
        //Hack: set verificationTokenExpiresAt to undefine once user isVerified = true
        user.verificationTokenExpiresAt = undefined;
        //Hack: Save User to database
        await user.save();

        //Hack: Send a welcome email
        await sendWelcomeEmail(user.email, user.name);

        //Hack: Send success response
        res.status(200).json({
            success: true, message: "Email verification successful", user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({ success: false, message: error.message })
    }
}

//Todo: Login Function
export const login = async (req, res) => {
    //Hack: Get email and password from request body
    const { email, password } = req.body;

    //Hack: Login logic block
    try {
        // Hack: Check if user field is empty
        if (!email || !password) {
            throw new Error("All fields are required")
        }

        //Hack: Check if user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Hack: use "bcryptjs" to compare password with db password
        //Hack: "req.body.password, db.password"
        const isMatch = await bcryptjs.compare(password, user.password);

        //Hack: Check if password match
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" })
        }

        //Hack: Generate JWT token and set the cookie
        generateTokenAndSetCookie(res, user._id);

        //Hack: Update lastLogin
        user.lastlogin = new Date();

        //Hack: Save Changes to database after lastLogin Update
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

//Todo: Logout Function
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" })
}

//Todo: Forget Password Function
export const forgotPassword = async (req, res) => {
    //Hack: extract email from request body
    const { email } = req.body

    //Hack: Block of code for forget password
    try {
        //Hack: check if user with the email exit
        const user = await User.findOne({ email })
        //Hack: on check failure return
        if (!user) {
            return res.status(400).json({ success: false, message: "User with this email doesn't exit" })
        }

        //Hack: Generate Reset Token using crypto
        const resetToken = crypto.randomBytes(20).toString('hex');
        //Hack: set resetTokenExpiresAt
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        //Hack: update user doc with reset tokent string and resetTokenExpiresAt time
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        //Hack: Save updated user
        await user.save();

        //Hack: Send reset password email
        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`);

        //Hack: send respond if all went succesful
        res.status(200).json({
            success: true, message: "Reset password link sent successfully", user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(500).json({ success: false, message: error.message })
    }


}

//Todo: Reset Password Function
export const resetPassword = async (req, res) => {
    //Hack: extract the token from url
    const { token } = req.params;
    const { password } = req.body;

    //Hack: Block of code for reset password
    try {
        //Hack: check if token is valid and not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        //Hack: check if user exists
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset password token" });
        }

        //Hack: hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        //Hack: Update users doc
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        //Hack: Save the updated user document to the database
        await user.save();

        //Hack: Send a success email
        await sendResetSuccessfullEmail(user.email, user.name)

        res.status(200).json({
            success: true, message: "reset password token validated successful", user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log(`Failed to verify resetToken: ${error}`);
        return res.status(400).json({ success: false, message: error.message });
    }
}

//Todo: Check if Authenticated Function
export const checkAuth = async (req, res) => {
    try {
        //Hack: Find if user exit with the req userId
        const user = await User.findById(req.userId).select("-password");

        //Hack: return respond if user with the req userId doesn't exists 
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" })
        }

        //Hack: Return true respond if user exist
        res.status(200).json({ success: true, message: "User found", user })
    } catch (error) {
        console.log("Error in checkAuth:", error);
        res.status(500).json({ success: false, message: error.message })
    }
}