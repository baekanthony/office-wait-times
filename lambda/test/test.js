import { handler } from "../index.js";

handler({}, {})
  .then(response => {
    console.log('API response:', response);
  })
  .catch(err => {
    console.error('API error:', err);
  });