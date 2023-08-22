const database = require('../database');
const { Project } = database;

// creates a new project for the current session account
const createProject = async (req, res) => {
    //return res.json({ message: "Not Implemented" });
    try {

        const newProject = new Project({
            name: req.body.name,
            synopsis: req.body.synopsis,
            chapters: [],
            events: [],
            characters: [],
            users: [{
                user: req.session.account._id,
                permissions: "Owner",
            }],
        });

        await newProject.save();

        return res.json({ project: newProject });
    } catch (err) {
        console.log(err);
        return res.json({ error: 'something went wrong' });
    }
}

// finds any projects associated with the current session account
const getUserProjects = async (req, res) => {
    try {
        const results = await Project.find({ "users.user": req.session.account._id });
        console.log(results);
        return res.json({ projects: results });
    } catch (err) {
        console.log(err);
        return res.json({ error: 'something went wrong' });
    }
}

module.exports = {
    getUserProjects,
    createProject,
};