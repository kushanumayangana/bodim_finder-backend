const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const connectDB = require('./config/db'); // ⬅ Database connection
const propertyRoutes = require('./routes/propertyroutes'); // Your property routes
const Registerroutes = require('./routes/Registerroutes');
const Loginroutes = require('./routes/Loginroutes');
const Forgotpwroute = require('./routes/Forgotpwroutes');
const commentRoute = require('./routes/commentRoute');
const feedbackRoutes = require('./routes/feedbackRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ fixed syntax error

// Debug: Check if uploads directory exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsPath));
console.log('Static files served from:', uploadsPath);

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/properties', commentRoute);

app.use('/api/user', Registerroutes); 
app.use('/api/user',Loginroutes);
app.use('/api/user',Forgotpwroute);
app.use('/api/feedback', feedbackRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
