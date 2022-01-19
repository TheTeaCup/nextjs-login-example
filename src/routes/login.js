var express = require("express");
var router = express.Router();
const redis = require("../redis");

router.post('/', async (req, res) => {
    if (!req.body.username) {
        return res.status(400).json({error: true, message: "username is missing"});
    }

    if (!req.body.password) {
        return res.status(400).json({error: true, message: "username password is missing"});
    }

    redis.get(`user-${req.body.username}`, function (err, object) {
        if (err) {
            res.json({
                error: true,
                message: "DB error"
            });
        } else {
            object = JSON.parse(object);
            if (!object) {
                return res.status(400).json({error: true, message: "no user found"});
            } else {

                if (object.password) {
                    if (object.password === req.body.password) {


                        redis.set(`user-${req.body.username}`, JSON.stringify(object));

                        return res.json({error: false, message: "OK", data: object});
                    } else {
                        return res.status(400).json({error: true, message: "incorrect password"});
                    }
                } else {
                    return res.status(400).json({error: true, message: "no password found"});
                }
            }
        }
    });

});

router.post('/create', async (req, res) => {
    let body = req.body;

    let username = body.username;
    let email = body.email;
    let password = body.password;

    if (!username) return res.status(400).json({error: true, message: "body missing 'username'"});
    if (!email) return res.status(400).json({error: true, message: "body missing 'email'"});
    if (!password) return res.status(400).json({error: true, message: "body missing 'password'"});

    try {
        redis.get(`user-${email}`, function (err, object) {
            if (err) {
                return res.status(500).json({error: true, message: err});
            }

            if (object) {
                return res.json({error: true, message: "email already registered"});
            } else {

                let data = {
                    email: email,
                    password: password,
                    admin: false,
                    staff: false,
                    accountCreatedAt: Date.now(),
                    isEmailVerified: false,
                    name: username
                }


                redis.set(`user-${email}`, JSON.stringify(data));
                res.json({error: false, message: "OK", data: data});
            }
        })
    } catch (e) {
        return res.status(500).json({error: true, message: "unexpected error", err: e});
    }
})
module.exports = router;
