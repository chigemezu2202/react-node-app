// import SibApiV3Sdk from "sib-api-v3-sdk";
// import dotenv from "dotenv";
// dotenv.config();

// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// const sender = { name: "NEXTECHSPHERE INNOVATION", email: "chigemezuezimoha@gmail.com" };

// (async () => {
//     try {
//         const response = await tranEmailApi.sendTransacEmail({
//             sender,
//             to: [{ email: "chigemezuhipoliatus@gmail.com" }], // test to yourself
//             subject: "✅ Brevo Test Email",
//             htmlContent: "<h1>Success!</h1><p>Your Brevo API is working 🎉</p>",
//             textContent: "Your Brevo API is working successfully 🎉",
//         });
//         console.log("✅ Email sent:", response);
//     } catch (error) {
//         console.error("❌ Error:", error);
//     }
// })();
