const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['individual', 'business'], required: true },
  //individual users
  name: { type: String },
  surname: { type: String },
  dateOfBirth: { type: Date },
  //business users
  businessName: { type: String },
  //Common fields
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  paymentMethods: [{
    cardNumber: String,
    cardHolder: String,
    expiryDate: String,
    cvv: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports =  mongoose.model('User', UserSchema);