require("dotenv");
var axios = require("axios").default;

const generateToken = async () => {
  try {
    var options = {
      method: "POST",
      url: "https://dev-34crl0ebsqxu7bk8.us.auth0.com/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.APP_AUTH0_CLIENT_ID,
        client_secret: process.env.APP_AUTH0_CLIENT_SECRET,
        audience: process.env.APP_AUTH0_AUDIENCE,
      }),
    };

    const response = await axios.request(options);
    const { data } = response;
    return data.access_token;
  } catch (error) {
    res.status(500).json({ message: "Error while Fetching Token" });
  }
};

const fetchManagers = async (req, res) => {
  try {
    const { role_id } = req.query;
    const token = await generateToken();
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/roles/${role_id}/users`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    const { data } = response;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error while Fetching Managers" });
  }
};

module.exports = { fetchManagers };
