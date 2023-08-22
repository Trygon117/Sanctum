const api = require('./api');
const mid = require('./middleware');

const router = (app) => {
    // Constants
    app.get("/api", mid.requiresSecure, api.Constant.api);
    app.get("/default", mid.requiresSecure, api.Constant.defaultPage);
    app.get("/notFound", mid.requiresSecure, api.Constant.notFound);

    // Account
    app.get('/isLoggedIn', mid.requiresSecure, api.Account.isLoggedIn);
    app.post('/login', mid.requiresLogout, mid.requiresSecure, api.Account.login);
    app.post('/signup', mid.requiresLogout, mid.requiresSecure, api.Account.signup);
    app.get('/logout', mid.requiresLogin, mid.requiresSecure, api.Account.logout);

    // Database
    app.get('/getUserProjects', mid.requiresLogin, mid.requiresSecure, api.Database.getUserProjects);
    app.post('/createProject', mid.requiresLogin, mid.requiresSecure, api.Database.createProject);

    app.get("/", mid.requiresSecure, api.Constant.api);
    app.get("/*", mid.requiresSecure, api.Constant.notFound);
};

module.exports = router;