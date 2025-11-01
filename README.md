# 📝 TaskOTrack

A modern, full-stack task management application built with React and Node.js. TaskOTrack helps you organize, track, and manage your tasks efficiently with a beautiful and intuitive interface.

![TaskOTrack Banner](./public/TaskOTrack-icon.svg)

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with JWT tokens
- ✅ **Task Management** - Create, read, update, and delete tasks
- 📊 **Task Statistics** - View your productivity with visual statistics
- 🎯 **Task Status Tracking** - Track tasks as Not Started, In Progress, or Completed
- 📅 **Due Date Management** - Set and track task deadlines
- 👤 **User Profile** - Manage your account and view task statistics
- 🎨 **Modern UI** - Clean and responsive design with smooth animations
- 🔄 **Real-time Updates** - Instant task updates without page refresh
- 🌐 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/TaskOTrack.git
cd TaskOTrack
```

### Install All Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

## 🏃‍♂️ Running the Application

### Single Command to Run Everything
```bash
npm start
# or
npm run dev
```

This will start both:
- ✅ **Backend Server** on `http://localhost:4000`
- ✅ **Frontend App** on `http://localhost:5173`

### Access the Application
Open your browser and navigate to `http://localhost:5173`

### Alternative: Run Separately (if needed)

**Backend:**
```bash
cd server
node server.js
```

**Frontend (in new terminal):**
```bash
npm run client
```

## 📁 Project Structure

```
TaskOTrack/
├── public/
│   └── TaskOTrack-icon.svg       # App icon
├── server/
│   ├── server.js                 # Express server
│   ├── db.js                     # Database configuration
│   ├── database.db              # SQLite database (auto-generated)
│   └── package.json             # Server dependencies
├── src/
│   ├── components/
│   │   ├── Buttons/
│   │   │   ├── EditButton.jsx
│   │   │   └── PlusButton.jsx
│   │   ├── Cards/
│   │   │   ├── loginCard.jsx
│   │   │   ├── signUpCard.jsx
│   │   │   ├── MenuCard.jsx
│   │   │   ├── taskDetailCard.jsx
│   │   │   ├── taskInputCard.jsx
│   │   │   └── MultipleTasks.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── HeaderUser.jsx
│   │   ├── Loading/
│   │   │   └── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthProvider.jsx      # Authentication context
│   ├── hooks/
│   │   └── usePageTransition.js  # Custom hook for transitions
│   ├── Pages/
│   │   ├── HomePage.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserSignUp.jsx
│   │   ├── DashBoardPage.jsx
│   │   └── UserProfile.jsx
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
└── README.md
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'notStarted',
  due_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `PUT /api/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user
- `GET /api/tasks/stats` - Get task statistics
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

All task endpoints require JWT authentication via `Authorization: Bearer <token>` header.

## 🎨 Features in Detail

### Authentication System
- Secure user registration and login
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes for authenticated users
- Persistent login sessions

### Task Management
- Create tasks with title, description, status, and due date
- Edit existing tasks
- Delete tasks with confirmation
- Real-time task updates
- Task filtering by status (future enhancement)

### Dashboard
- View all your tasks at a glance
- Quick access to task creation
- Task statistics overview
- Responsive grid layout

### User Profile
- View account information
- Update username and email
- Change password securely
- View task statistics (Total, Completed, In Progress, Not Started)
- Logout functionality

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API endpoints
- User-specific data isolation
- SQL injection prevention
- CORS configuration

## 🛠️ Development

### Environment Variables (Optional)
Create a `.env` file in the server directory:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=4000
```

### Available Scripts

```bash
# Development      
npm run dev            # Run both server and client

```

## 📝 Future Enhancements

- [ ] Task categories and tags
- [ ] Task priority levels
- [ ] Search and filter functionality
- [ ] Task sorting options
- [ ] Email notifications for due dates
- [ ] Dark mode
- [ ] Task collaboration features
- [ ] Export tasks to CSV/PDF
- [ ] Calendar view
- [ ] Recurring tasks

## 🐛 Troubleshooting

### Port Already in Use
If port 4000 or 5173 is already in use:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:4000 | xargs kill -9
```

### Database Issues
Delete and recreate the database:
```bash
cd server
rm database.db
cd ..
npm start
```

### Module Not Found
Reinstall dependencies:
```bash
rm -rf node_modules server/node_modules
npm install
cd server
npm install
cd ..
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@kalai-mugilan-125](https://github.com/kalai-mugilan-125)
- LinkedIn: [Kalai Mugilan R P](https://www.linkedin.com/in/kalai-mugilan-r-p/)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the robust backend framework
- SQLite for the lightweight database
- Font Awesome for icons

## 📞 Support

If you have any questions or need help, please open an issue or contact [mugilankalai.123@gmail.com](mailto:mugilankalai.123@gmail.com)

---
