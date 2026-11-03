const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'lesson-19-local-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const DATA_FILE = path.join(__dirname, 'study-steps.json');

app.use(cors());
app.use(express.json());

async function readDb() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeDb(db) {
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function createToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const token = header.slice('Bearer '.length);

  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/', (_req, res) => {
  res.json({ message: 'Course auth backend is running' });
});

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const trimmedName = String(name || '').trim();
    const normalizedEmail = normalizeEmail(email);
    const trimmedPassword = String(password || '').trim();

    if (!trimmedName || !normalizedEmail || trimmedPassword.length < 8) {
      return res.status(400).json({
        error: 'Name, email, and a password with at least 8 characters are required',
      });
    }

    const db = await readDb();
    const existingUser = db.users.find((user) => normalizeEmail(user.email) === normalizedEmail);

    if (existingUser) {
      return res.status(409).json({ error: 'An account with that email already exists' });
    }

    const passwordHash = await bcrypt.hash(trimmedPassword, 10);
    const newUser = {
      id: `user_${Date.now()}`,
      name: trimmedName,
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    await writeDb(db);

    return res.status(201).json({
      message: 'Registration successful',
      token: createToken(newUser),
      user: toSafeUser(newUser),
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to complete registration' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const trimmedPassword = String(password || '').trim();

    if (!normalizedEmail || !trimmedPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = await readDb();
    const user = db.users.find((entry) => normalizeEmail(entry.email) === normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(trimmedPassword, user.passwordHash);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      token: createToken(user),
      user: toSafeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to complete login' });
  }
});

app.get('/auth/me', authMiddleware, async (req, res) => {
  try {
    const db = await readDb();
    const user = db.users.find((entry) => entry.id === req.auth.userId);

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    return res.status(200).json({ user: toSafeUser(user) });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load current user' });
  }
});

app.get('/study-steps', authMiddleware, async (req, res) => {
  try {
    const db = await readDb();
    const delayMs = Number(req.query.delay ?? 0);

    const sendSteps = () => res.status(200).json(db.steps);

    if (delayMs > 0) {
      setTimeout(sendSteps, delayMs);
      return;
    }

    return sendSteps();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load study steps' });
  }
});

app.get('/study-steps/:id', authMiddleware, async (req, res) => {
  try {
    const db = await readDb();
    const step = db.steps.find((entry) => String(entry.id) === String(req.params.id));

    if (!step) {
      return res.status(404).json({ error: `No study step found for id ${req.params.id}` });
    }

    return res.status(200).json(step);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load study step' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Course auth backend is running on port ${PORT}`);
});
