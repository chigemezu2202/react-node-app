import Brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

export default apiInstance;
console.log('Brevo succesfully configured', apiInstance)