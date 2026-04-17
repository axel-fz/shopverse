import { PayunitClient } from '@payunit/nodejs-sdk';
 
// Initialiser avec la configuration
export const payUnitClient = new PayunitClient({
  baseURL: 'https://gateway.payunit.net', // facultatif
  apiKey: process.env.PAYUNIT_apiKey, //token ,live key
  apiUsername: process.env.PAYUNIT_apiUsername,
  apiPassword: process.env.PAYUNIT_apiPassword,
  mode: 'live', // ou 'live',
   // facultatif
});