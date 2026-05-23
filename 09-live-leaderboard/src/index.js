import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379"); // redis client for interacting with Redis

app.post('/post/:id/view', async(req,res) => {
    const postId = req.params.id;
    await redis.incr(`post_views:${postId}`);
    res.json({message: `View count for post ${postId} incremented!`});
});

app.post('/leaderboard/score', async(req,res) => {
    const {userId, score} = req.body;
    await redis.zincrby("leaderboard",score, userId);
    res.json({message: `Score for user ${userId} updated by ${score} points!`});
});

app.get('/leaderboard', async(req,res) => {
    const top10users = await redis.zrevrange("leaderboard", 0, 9, "WITHSCORES");
    const leaderboard = [];
    for (let i = 0; i < top10users.length; i += 2) {
        leaderboard.push({
            userId: top10users[i],
            score: Number(top10users[i + 1]),
        });
    }
    res.json({leaderboard});
});

app.get('/leaderboard/:userId/rank', async(req,res) => {
    const userId = req.params.userId;
    const rank = await redis.zrevrank("leaderboard", userId);
    if(rank === null) {
        res.json({message: `User ${userId} is not on the leaderboard!`});
    } else {
        res.json({userId, rank: rank + 1}); // +1 to convert 0-based index to 1-based rank
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});