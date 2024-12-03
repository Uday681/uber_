import http from 'http';
import app from './app.js';
import connectDB from './db/db.js';

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

export default server;