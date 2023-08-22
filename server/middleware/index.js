const requiresLogin = (req, res, next) => {
    if (!req.session.account) {
        return res.redirect('/login');
    }
    return next();
};

const requiresLogout = (req, res, next) => {
    if (req.session.account) {
        return res.redirect('/');
    }
    return next();
};

const requiresSecure = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
};

const bypassSecure = (req, res, next) => {
    next();
};

// const throttle = (req, res, next) => {
//     if (req.session.throttle === undefined || req.session.throttle === null) {
//         req.session.throttle = [];
//         next();
//     }

//     const shouldThrottle = req.session.throttle.includes(req.route.path);
//     //0 < req.session.throttle.filter((path) => {
//     //     console.log(path);
//     //     if (path.path === req.route.path) {
//     //         const currentDate = new Date();
//     //         console.log(path.initial.getTime(), currentDate.getTime());
//     //         if (path.initial.getTime() - currentDate.getTime()) {

//     //         }
//     //         return true;
//     //     }
//     // }).length;

//     console.log(shouldThrottle, req.session.throttle);

//     if (shouldThrottle) {
//         return res.json({ err: "throttled" });
//     } else {
//         req.session.throttle = [...req.session.throttle, req.route.path];
//         setTimeout(() => {
//             const index = req.session.throttle.indexOf(req.route.path);
//             req.session.throttle = req.session.throttle.splice(index, 1);
//             console.log('unthrottled', req.session.throttle);
//         }, 5000);
//         next();
//     }
// }

// const resetThrottle = (req, res, next) => {
//     console.log('resetThrottle');
//     req.session.throttle = [];
// }

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production') {
    module.exports.requiresSecure = requiresSecure;
} else {
    module.exports.requiresSecure = bypassSecure;
}