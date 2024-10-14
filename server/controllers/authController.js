import { sendRecoveryEmail } from '../utils/emailServices.js';
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RecoveryCode = require('../models/recoveryCode');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (userType === 'individual') {
      const { name, surname, dateOfBirth } = req.body;
      newUser = new User({
        email,
        password: hashedPassword,
        userType,
        name,
        surname,
        dateOfBirth: new Date(dateOfBirth)
      });
    } else if (userType === 'business') {
      const { businessName } = req.body;
      newUser = new User({
        email,
        password: hashedPassword,
        userType,
        businessName,
      });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, userType: user.userType }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    await RecoveryCode.findOneAndUpdate({ email }, { code: recoveryCode }, { upsert: true });

    await sendRecoveryEmail(email, recoveryCode);

    res.json({ message: 'Recovery code sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending recovery code', error: error.message });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const recoveryCode = await RecoveryCode.findOne({ email, code });

    if (!recoveryCode) {
      return res.status(400).json({ message: 'Invalid recovery code' });
    }

    await RecoveryCode.deleteOne({ email });
    res.json({ message: 'Code verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying code', error: error.message });
  }
};

const changePassword = async (req, res) => { //solo si esta bien el codigo de verificacion
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.updatedAt = new Date();
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
};


module.exports = {
  register,
  login,
  recoverPassword,
  verifyCode,
  changePassword,
}