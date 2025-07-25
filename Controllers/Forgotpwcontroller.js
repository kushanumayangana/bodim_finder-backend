const Registarmodel = require('../models/Registarmodel');
const bcrypt = require('bcryptjs');

exports.forgotpassword = async (req, res) => {
  try {
   const { emailOrUsername, newPassword } = req.body;


    const user = await Registarmodel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Forgot password error:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};
