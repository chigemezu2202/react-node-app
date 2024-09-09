//Hack: local imports
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

//Hack: Verification Email Function using Mailtrap
export const sendVerificationEmail = async (email, verificationToken) => {
    //Hack: Recipient emails
    const recipient = [
        { email }
    ];
    
    //Hack: Email code block
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email Address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken),
            // category: "Verification Email"
        });
        console.log("Email Sent Succesfully", response)
    } catch (error) {
        console.log("Error Sending Verification Email", error)
        throw new Error(`Error sending verification email: ${error}`);
    }
}

//Hack: Welcome Email Function using Mailtrap
export const sendWelcomeEmail = async (email, name) => {
    //Hack: Recipient emails
    const recipient = [
        { email }
    ];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "0c01311e-01b7-428b-9076-34bedb378b38",
            template_variables: {
                "company": "@Auth",
                "name": name
            },
            // category: "Welcome Email"
        });
        console.log("Welcome Email Sent Succesfully", response)
    } catch (error) {
        console.log("Error Sending  Welcome Email", error)
        throw new Error(`Error sending Welcome email: ${error}`);
    }
}

//Hack: Rest Password Email Function using Mailtrap
export const sendResetPasswordEmail = async (email, resetToken) => {
    //Hack: Receipient mail
    const recipient = [
        { email }
    ];

    //Hack: reset email block
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Password Message",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace( "{resetURL}", resetToken ),
     
        });
    } catch (error) {
        throw new Error(`Error in Sending Reset Mail: ${error}`)
    }

}

//Hack: Password Reset Success Email Function using Mailtrap
export const sendResetSuccessfullEmail = async (email, name) => {
    //Hack: get receipient
    const recipient = [
        {mail: email}
    ]

    //Hack: MAil Block 
    try {
        const response = mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Success Message",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{name}", name),

        })
           
    } catch (error) {
        throw new Error(`Mail Unable to be delivered: ${error}`)
        console.log("there is an error:", error)
    }
}
