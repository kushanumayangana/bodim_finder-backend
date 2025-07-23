const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db'); // ⬅ Database connection
const propertyRoutes = require('./routes/property.routes'); // Your property routes
const Registerroutes = require('./routes/Registerroutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ fixed syntax error
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/properties', propertyRoutes);
app.use('./api/user',Registerroutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
