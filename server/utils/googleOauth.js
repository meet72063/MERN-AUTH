const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET_ID,
  "postmessage"
);

//Get user Data from Google
const getUserInfo = async (code, res) => {
  try {
    const r = await oAuth2Client.getToken(code);
    const idToken = r.tokens.id_token;
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload;
  } catch (err) {
    console.log("Error getting info from Google ", err);
    res.status(401);
    throw new Error("Invalid email access Token");
  }
};

module.exports = { getUserInfo };
