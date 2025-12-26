require('dotenv').config({ path: __dirname + '/.env' });

const handler = async (event, context) => {
  const url = process.env.API_URL;
  const officeIds = process.env.OFFICE_IDS.split(',');
  const results = [];
  for (const id of officeIds) {
    try {
      const response = await fetch(`${url}/${id}`);
      const data = await response.text();
      results.push({ id, data });
    } catch (err) {
      results.push({ id, error: err.message });
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};

module.exports = { handler };