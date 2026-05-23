import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379"); // redis client for publishing messages to channels


app.post('/notifications', async(req,res) => {
    const payload = {
        title: req.body.title || "Default Title",
        createdAt: new Date().toISOString(),
    }
    const receivers = await publisher.publish("notifications", JSON.stringify(payload));
    res.json({message: `Notification sent to ${receivers} subscribers!`, payload});
});



app.listen(3000,()=>{
    console.log('Server is running on port http://localhost:3000');
});


// Start subscriber first in terminal 1 cd 08-live-admin-notification-pubsub
// npm run subscriber

// Start API in terminal 2 (same folder)
// npm run api

// Publish a notification from bruno

// How to confirm subscriber received it:

// In API response, look at receivers value.
// If it says Notification sent to 1 subscribers, one active subscriber got it.

// In subscriber terminal, you should see logs like:
// Subscribed to notifications channel successfully!
// Received on notifications : { title: 'Hello Admin', createdAt: '...' }

// If receivers is 0, subscriber was not connected/subscribed at publish time. Redis Pub/Sub does not store old messages, so subscriber must be running before you publish.

