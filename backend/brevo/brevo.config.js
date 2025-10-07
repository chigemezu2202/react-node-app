// brevo.config.js
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export const brevoTransactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();
export const sender = { email: "chigemezuezimoha@gmail.com", name: "NexTechSphere Innovation" };
