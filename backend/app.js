// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const path = require('path');

// Load environment variables
dotenv.config();

// Import config
const { mongoURI, port } = require('./src/config/keys.config');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const studentsRoutes = require('./src/routes/students.routes');
const teachersRoutes = require('./src/routes/teachers.routes');
const adminRoutes = require('./src/routes/admin.routes');
const eventsRoutes = require('./src/routes/events.routes');
const examsRoutes = require('./src/routes/exams.routes');
const reportsRoutes = require('./src/routes/reports.routes');
const notificationsRoutes = require('./src/routes/notifications.routes');
const attendanceRoutes = require('./src/routes/attendance.routes');
const analyticsRoutes = require('./src/routes/analytics.routes');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check route
app.get('/', (req, res) => res.send('School Management System API running'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Connect to MongoDB
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(port || 5000, () => console.log(`Server running on port ${port || 5000}`));
//   })
//   .catch((err) => {
//     console.error('MongoDB connection failed:', err.message);
//   });
// Connect to MongoDB and start server
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port || 5000, () => {
      console.log(`Server running on port ${port || 5000}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
