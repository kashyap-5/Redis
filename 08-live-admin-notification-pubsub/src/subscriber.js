import Redis from "ioredis";

const subscriber = new Redis(process.env.REDIS_URL || "redis://localhost:6379"); // redis client for subscribing to channels

subscriber.subscribe("notifications", (err) => {
    if(err) {
        console.error("Failed to subscribe to notifications channel:%s", err.message);
        return;
    }
    console.log("Subscribed to notifications channel successfully!");
});

subscriber.on("message", (channel, message) => {
    console.log("Received on", channel,":",JSON.parse(message));
});