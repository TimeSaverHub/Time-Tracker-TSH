import { onRequest } from "firebase-functions/v2/https";

// Basic function to keep the import used and Firebase Functions happy
export const api = onRequest((request, response) => {
  response.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});