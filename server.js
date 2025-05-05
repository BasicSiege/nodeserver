const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const BASICSIEGE_ID = 295483161;

app.use(cors());
app.use(express.json());

app.post('/following-check', async (req, res) => {
  const { userId, targetUserId } = req.body;

  if (!userId || !targetUserId) {
    return res.status(400).json({ error: 'Missing userId or targetUserId' });
  }

  try {
    const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings?limit=100`);
    const data = await response.json();

    const isFollowing = data.data.some(user => user.id === targetUserId);
    res.json({ isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch followings.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
