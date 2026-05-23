import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379'); // redis client

const QUEUE_KEY = "queue:emails";

app.post('/emails', async (req, res) => {
    const job = {
        to: req.body.to,
        subject: req.body.subject || "No Subject",
        body: req.body.body || "No Content",
        createdAt: new Date().toISOString()
    }
    await redis.lpush(QUEUE_KEY, JSON.stringify(job)); // Add email job to the beginning of the list
    res.json({ queued:true,job });
});

app.get('/emails/process-one', async (req, res) => {
    const rawJob = await redis.rpop(QUEUE_KEY); // Get and remove the last job from the list (FIFO)
    if (!rawJob) {
        return res.json({ message: 'No email jobs in the queue' });
    }
    const job = JSON.parse(rawJob);
    res.json({ processed: true, job });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


// first build the package by running --> bun i
// Command to run this file: npm run dev
