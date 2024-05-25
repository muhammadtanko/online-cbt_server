const userModel = require("../models/user.model")

class UserController {
    constructor() { }
    async registerUser(obj) {
        try {
            const user = userModel(obj);
            const result = await user.save();
            return { ok: true, payLoad: result };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async loginUser({ email, password }) {
        try {
            const user = await userModel.findOne({ email: email });
            if (user) {
                if (user.password == password) {
                    return { ok: true, payLoad: "Login successful!" };
                } else {
                    return { ok: false, message: "password incorrect" };
                }
            } else {
                return { ok: false, message: "user not found" };
            }
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUser(id) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                return { ok: false, message: "User not found" };
            }
            return { ok: true, payLoad: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUsers() {
        try {
            const users = await userModel.find();
            return { ok: true, payLoad: users };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async updateUser(id, updateData) {
        try {
            const user = await userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
            if (!user) {
                return { ok: false, message: "User not found" };
            }
            return { ok: true, payLoad: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete(id);

            return { ok: true, payLoad: `${user.firstName} has been deleted` }
        }
        catch (error) {
            return { ok: false, message: error.message };
        }
    }

}
module.exports = new UserController();