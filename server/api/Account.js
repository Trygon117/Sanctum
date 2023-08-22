const database = require('../database');
const { Account } = database;

// attempts to create a new account for the current session
// requires: email, username, password, password2
const signup = async (req, res) => {
    const email = `${req.body.email}`;
    const username = `${req.body.username}`;
    const password = `${req.body.password}`;
    const password2 = `${req.body.password2}`;

    if (!username || !password || !password2 || !email) {
        return res.status(400).json({ error: 'Missing Credentials' });
    }

    if (password !== password2) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(400).json({ error: 'Email does not match pattern' });
    }

    if (!/^[A-Za-z0-9_\-.]{1,16}$/.test(username)) {
        return res.status(400).json({ error: 'Username does not match pattern' });
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return res.status(400).json({ error: 'Password does not match pattern' });
    }

    try {
        const profilePicture = {
            name: "default-profile",
            data: null,
            mimeType: null,
        }
        const hash = await Account.generateHash(password);
        const newAccount = new Account({ email, username, password: hash, profilePicture });
        await newAccount.save();
        req.session.account = Account.toAPI(newAccount);
        return res.json({
            loggedIn: true,
            account: req.session.account
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Username already in use' });
        }
        return res.status(400).json({ error: 'An error occurred' });
    }
};

// attempts to login to the current session
// requires: username, password
const login = (req, res) => {
    const username = `${req.body.username}`;
    const password = `${req.body.password}`;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing Credentials' });
    }

    return Account.authenticate(username, password, (err, account) => {
        if (err || !account) {
            return res.status(401).json({ error: 'Login Failed' });
        }

        req.session.account = Account.toAPI(account);

        return res.json({
            loggedIn: true,
            account: req.session.account,
            redirect: '/'
        });
    });
};

// destroys the current session
const logout = (req, res) => {
    req.session.destroy();
    return res.json({
        loggedIn: false,
        redirect: '/'
    });
};

// checks if the user is logged in
const isLoggedIn = (req, res) => {
    if (req.session.account) {
        return res.status(200).json({ loggedIn: true, account: req.session.account });
    } else {
        return res.status(200).json({ loggedIn: false, account: null });
    }
};

module.exports = {
    signup,
    login,
    logout,
    isLoggedIn,
};