const userModel = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
  async signUp(req: any, res: any) {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    try {
      const user = await userModel.create(req.body);
      return res.status(201).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getAllUsers(req: any, res: any) {
    try {
      const users = await userModel.find();
      return res.status(200).json({ ok: true, data: users });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async logIn(req: any, res: any) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ ok: false, msg: error.details[0].message });
    console.log(req.session);

    let user = await userModel.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({
        ok: false,
        msg: "Invalid email",
      });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)
      return res.status(400).send({ ok: false, msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ ok: true, data: { token, user } });
  },

  async addFav(req: any, res: any) {
    const schema = Joi.object({
      fav: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ ok: false, msg: error.details[0].message });
    const { id } = req.user;
    const { fav } = req.body;

    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { $push: { favs: fav } },
        { new: true }
      );
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async deleteUser(req: any, res: any) {
    const { id } = req.user;
    try {
      const user = await userModel.findByIdAndDelete(id);
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async deleteFav(req: any, res: any) {
    const { id } = req.user;
    const { fav } = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { $pull: { favs: fav } },
        { new: true }
      );
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getFavs(req: any, res: any) {
    const { id } = req.user;
    try {
      const user = await userModel.findById(id);
      return res.status(200).json({ ok: true, data: user.favs });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getUser(req: any, res: any) {
    const { id } = req.user;
    try {
      const user = await userModel.findById(id);
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async updateUser(req: any, res: any) {
    const { id } = req.user;
    const { password } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    try {
      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },
};
