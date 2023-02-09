const { user } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const payload = req.body;

    const hashedPassword = bcrypt.hashSync(payload.password, 8);

    const registerUser = await user.create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    });

    return res.status(201).send({
      message: 'create user success',
      object: registerUser,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;

    const getUser = await user.findOne({
      where: { username: payload.username },
    });
    // console.log(getUser);
    const comparedPassword = bcrypt.compareSync(
      payload.password,
      getUser.dataValues.password
    );

    // console.log(comparedPassword);

    if (comparedPassword === false) {
      return res.status(400).send({
        message: 'invalid password',
      });
    } else {
      const token = jwt.sign(
        {
          id: getUser.dataValues.id,
          email: getUser.dataValues.email,
          username: getUser.dataValues.username,
        },
        process.env.JWT_KEY,
        { expiresIn: 3600 }
      );

      return res.status(200).send({
        message: 'login success',
        token: token,
      });
    }

    return res.status(201).send(getUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const payload = req.body;

    const getUser = await user.findOne({
      where: { username: payload.username },
    });

    const comparedPassword = bcrypt.compareSync(
      payload.password,
      getUser.dataValues.password
    );

    if (comparedPassword === false) {
      return res.status(400).send({
        message: 'invalid password',
      });
    }

    const hashedPassword = bcrypt.hashSync(payload.newpassword, 8);

    const update = await user.update(
      {
        username: payload.newusername,
        password: hashedPassword,
      },
      { where: { username: payload.username } }
    );

    // console.log(payload);
    res.status(201).send({
      message: 'update success',
      object: update,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const payload = req.body;

    const getUser = await user.findOne({
      where: { username: payload.username },
    });

    const comparedPassword = bcrypt.compareSync(
      payload.password,
      getUser.dataValues.password
    );

    if (comparedPassword === false) {
      return res.status(400).send({
        message: 'invalid password',
      });
    }

    const deleted = await user.destroy({
      where: { username: payload.username },
    });

    res.status(201).send({
      message: `delete ${payload.username} success`,
      object: deleted,
    });
  } catch (error) {
    res.status(500).send({
      message: `delete failed`,
      error: error.message,
    });
  }
};
