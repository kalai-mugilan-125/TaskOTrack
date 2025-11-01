/* eslint-env node */
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Auth middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
    db.run(query, [username, email, hashed], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET, { expiresIn: '7d' });
      res.json({
        message: 'Registration successful',
        token,
        user: { id: this.lastID, username, email }
      });
    });
  } catch (_error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
});

// Update profile endpoint
app.put('/api/profile', verifyToken, async (req, res) => {
  const { username, email, currentPassword, newPassword } = req.body;
  const userId = req.userId;

  try {
    db.get('SELECT * FROM users WHERE id = ?', [userId], async (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (currentPassword && newPassword) {
        const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
        if (!validPassword) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        db.run(
          'UPDATE users SET username = ?, email = ?, password_hash = ? WHERE id = ?',
          [username, email, hashedNewPassword, userId],
          function(updateErr) {
            if (updateErr) {
              return res.status(500).json({ error: 'Failed to update profile' });
            }
            res.json({ 
              message: 'Profile updated successfully',
              user: { id: userId, username, email }
            });
          }
        );
      } else {
        db.run(
          'UPDATE users SET username = ?, email = ? WHERE id = ?',
          [username, email, userId],
          function(updateErr) {
            if (updateErr) {
              return res.status(500).json({ error: 'Failed to update profile' });
            }
            res.json({ 
              message: 'Profile updated successfully',
              user: { id: userId, username, email }
            });
          }
        );
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// TASK ENDPOINTS
// IMPORTANT: Place specific routes BEFORE parameterized routes

// Get task statistics (must be before /api/tasks/:id)
app.get('/api/tasks/stats', verifyToken, (req, res) => {
  const userId = req.userId;

  db.all('SELECT status FROM tasks WHERE user_id = ?', [userId], (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }

    const stats = {
      total: tasks.length,
      notStarted: tasks.filter(t => t.status === 'notStarted').length,
      inProgress: tasks.filter(t => t.status === 'inProgress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };

    res.json(stats);
  });
});

// Get all tasks for logged-in user
app.get('/api/tasks', verifyToken, (req, res) => {
  const userId = req.userId;

  db.all('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json(tasks);
  });
});

// Create new task
app.post('/api/tasks', verifyToken, (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.userId;

  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const query = `INSERT INTO tasks (user_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)`;
  
  db.run(query, [userId, title, description || '', status || 'notStarted', dueDate || null], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create task' });
    }

    res.json({
      message: 'Task created successfully',
      task: {
        id: this.lastID,
        user_id: userId,
        title,
        description: description || '',
        status: status || 'notStarted',
        due_date: dueDate || null,
        created_at: new Date().toISOString()
      }
    });
  });
});

// Update task
app.put('/api/tasks/:id', verifyToken, (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const taskId = req.params.id;
  const userId = req.userId;

  // Verify task belongs to user
  db.get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId], (err, task) => {
    if (err || !task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const query = `UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?`;
    
    db.run(query, [title, description, status, dueDate, taskId, userId], function(updateErr) {
      if (updateErr) {
        return res.status(500).json({ error: 'Failed to update task' });
      }

      res.json({
        message: 'Task updated successfully',
        task: {
          id: taskId,
          user_id: userId,
          title,
          description,
          status,
          due_date: dueDate
        }
      });
    });
  });
});

// Delete task
app.delete('/api/tasks/:id', verifyToken, (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId;

  db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Auth API working!');
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));