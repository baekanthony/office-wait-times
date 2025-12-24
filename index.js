require('dotenv').config();

const handler = async (event, context) => {
  const url = process.env.API_URL;
  try {
    const response = await fetch(url);
    const data = await response.text();
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

module.exports = { handler };