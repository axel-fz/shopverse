import { PayunitClient } from '@payunit/nodejs-sdk';
 
// Initialiser avec la configuration
export const payUnitClient = new PayunitClient({
  baseURL: 'https://gateway.payunit.net', // facultatif
  apiKey: process.env.apiKey, //token ,live key
  apiUsername: process.env.apiUsername,
  apiPassword: process.env.apiPassword,
  mode: 'live', // ou 'live',
   // facultatif
});