import express from 'express';
import {emailQueue} from './queue.js';
import { Backoffs, delay } from 'bullmq';

const app = express();

app.use(express.json());

app.post("/welcome-email", async (req, res) => {
    const job = emailQueue.add(
        "send-welcome-email",
        {
            to: req.body.to,
            subject: req.body.subject || "Welcome to our service!",
            body: req.body.body || "Thank you for signing up for our service. We're glad to have you on board!"
        },
        {//configuration options for the job
            attempts: 3, // Retry up to 3 times if the job fails
            backoff:{
                type : "exponential",
                delay : 1000 // Initial delay of 1 second before retrying
            }
        }
    );
    res.json({message: "Welcome email job added to the queue!", jobId: job.id});
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});