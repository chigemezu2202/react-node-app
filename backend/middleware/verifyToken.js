//Hack: Package Imports
import jwt from 'jsonwebtoken'

//Hack: Check if user is authenticated function using cookies with name token
export const verifyToken = (req, res, next) => {
    //Hack: Extract Cookie from request url if user is signed in
    const token = req.cookies.token;

    console.log("HEY Auth Middleware", token)

    if (!token) {
        return res.status(400).json({ success: false, message: "Unauthorize - no token found"})
    }
    //Hack: Verify Cookie block
    try {
        //Hack: Verify The token: cookies if exits
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //Hack: return a respond if cookies doestn't exits
        if (!decode) {
            return res.status(400).json({success: false, message: "Unauthorize - Invalid token"})
        }

        //Hack: If cookies are valid, add userId to request
        //Hack: add userId field to the request
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error)
        res.status(500).json({success: false, message: "Server error"})
    }
}