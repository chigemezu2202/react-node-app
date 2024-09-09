//Hack: Package import
import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';


dotenv.config(); // Hack: to enable process of.env variables


//Hack: Export MailtrapClient Config
export const mailtrapClient = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io/", token: process.env.MAILTRAP_TOKEN || "3ac1216cfcc82afdf2711ada74ee5425" });
console.log('Mailtrap succesfully configured', mailtrapClient)

//Hack: Export MailtrapClient Sender
export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Chigemezu Testing",
};

