import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379'); // redis client

app.post('/user/:id/json', async (req, res) => {
    await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body)); // Store user profile as JSON string
    res.json({ savedAs : "json" });
});

app.get('/user/:id/json', async (req, res) => {
    const raw = await redis.get(`user:${req.params.id}:json`);
    res.json({ user : raw ? JSON.parse(raw) : null }); // Parse string to JSON
});

app.post('/user/:id/hash', async (req, res) => {
    await redis.hset(`user:${req.params.id}:hash`, req.body);
    res.json({ savedAs : "hash" });
});

app.get('/user/:id/hash', async (req, res) => {
    const user = await redis.hgetall(`user:${req.params.id}:hash`);
    res.json({ user }); // hgetall returns an object
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Command to run this file: npm run dev
// Some other functions to try:
// set -> store single variable
// hset -> store object
// hgetall -> like getting entire object
// hget -> get specific field from hash
// hdel -> delete specific field from hash
// hexists -> check if field exists in hash