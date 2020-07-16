import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    validated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 8);
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

export default model('User', UserSchema);
