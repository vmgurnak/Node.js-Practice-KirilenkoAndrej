import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import { createError } from '../helpers/createError.js';

export const registerUser = async (req, res, next) => {
  try {
    const heshPassword = await bcrypt.hash(req.body.password, 10);
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      password: heshPassword,
    };
    const newUser = await User.create(newUserData);
    res.status(201).send({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      throw createError(401, 'Email or password is wrong');
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(isPasswordCorrect);
    if (isPasswordCorrect === false) {
      throw createError(401, 'Email or password is wrong');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    await User.findByIdAndUpdate(user._id, { token: token }, { new: true });
    res.status(200).send({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};
