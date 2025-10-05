const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { recommend, catalog } = require('./recommender');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS = {
  'u1': { id: 'u1', grade: 2, preferredTopics: ['science'], performance: { science: 65, math: 80 } }
};

app.get('/api/catalog', (req, res) => {
  res.json(catalog);
});

app.get('/api/recommend/:userId', (req, res) => {
  const user = USERS[req.params.userId];
  if (!user) return res.status(404).json({ error: 'User not found' });
  const recs = recommend(user, 4);
  res.json(recs);
});

app.post('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  const { topic, score } = req.body;
  if (!USERS[userId]) USERS[userId] = { id: userId, grade: 1, preferredTopics: [], performance: {} };
  USERS[userId].performance[topic] = score;
  res.json({ ok: true, user: USERS[userId] });
});

app.post('/api/user', (req, res) => {
  const { id, grade, preferredTopics } = req.body;
  USERS[id] = { id, grade, preferredTopics: preferredTopics || [], performance: {} };
  res.json({ ok: true, user: USERS[id] });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
