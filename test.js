const { handler } = require('./index');

handler({}, {})
  .then(response => {
    console.log('API response:', response);
  })
  .catch(err => {
    console.error('API error:', err);
  });