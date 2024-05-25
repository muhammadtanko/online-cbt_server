const userController = require("../controller/user.controller");
const { Router } = require("express");

module.exports = () => {
    const api = Router();

    api.post("/", async (req, res) => {
        try {
            const body = req.body;
            const { ok, payLoad, message } = await userController.registerUser(body);
            if (ok) {
                res.status(201).json({ ok, payLoad });
            } else {
                res.status(500).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            const { ok, payLoad, message } = await userController.loginUser({ email, password });

            if (ok) {
                res.status(201).json({ ok, payLoad });
            } else {
                res.status(500).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { ok, payLoad, message } = await userController.getUser(id);
            if (ok) {
                res.status(200).json({ ok, payLoad });
            } else {
                res.status(404).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.get("/", async (req, res) => {
        try {
            const { ok, payLoad, message } = await userController.getUsers();
            if (ok) {
                res.status(200).json({ ok, payLoad });
            } else {
                res.status(500).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });



    return api;
};
