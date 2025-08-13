# BodimFinder Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/bodimfinder
JWT_SECRET=your_jwt_secret_key_here_change_in_production
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

### 3. MongoDB Setup
- Make sure MongoDB is running on your system
- The database will be created automatically when you first run the application

### 4. Gmail Setup for Email
- Enable 2-factor authentication on your Gmail account
- Generate an App Password for this application
- Use the App Password in EMAIL_PASS

### 5. Start the Server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user
- `POST /api/user/verify-otp` - Verify OTP

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create a new property (requires auth)
- `GET /api/properties/:id` - Get property by ID
- `GET /api/properties/university/:university` - Get properties by university
- `GET /api/properties/user/:userId` - Get properties by user
- `DELETE /api/properties/:id` - Delete property (requires auth)

### Comments
- `GET /api/properties/:id/comments` - Get comments for a property
- `POST /api/properties/:id/comment` - Add comment to property (requires auth)

## Fixed Issues
- ✅ Property model schema updated to match controller expectations
- ✅ Removed duplicate routes
- ✅ Fixed user ID reference in comment controller
- ✅ Fixed syntax errors in register controller
- ✅ Updated React version for better compatibility
- ✅ Cleaned up frontend routing 