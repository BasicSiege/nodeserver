const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const BASICSIEGE_ID = 295483161;

app.use(cors());
app.use(express.json());

app.post('/following-check', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings?limit=100`);
    const data = await response.json();

    const isFollowing = data.data.some(user => user.id === BASICSIEGE_ID);
    return res.json({ isFollowing });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch followings.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
