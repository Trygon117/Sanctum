const api = (req, res) => {
    return res.json({ message: "You Reached The Sanctum API" });
}

const defaultPage = (req, res) => {
    return res.json({ message: "Default Page" });
}

const notFound = (req, res) => {
    return res.json({ message: "Not Found" });
}



module.exports = {
    api,
    defaultPage,
    notFound
};