const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`URL Shortener service listening at http://localhost:${PORT}`),
);
