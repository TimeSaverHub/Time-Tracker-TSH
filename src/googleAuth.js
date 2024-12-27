import { OAuth2Client } from 'google-auth-library';

// Initialize the OAuth2 client with your credentials
const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export default oauth2Client;
