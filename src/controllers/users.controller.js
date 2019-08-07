const usersRepository = require('../repository/users.repository')

const formatter = (user) => {
    if (!user) return;

    return {
        type: "users",
        id: user.id,
        attributes: {
            name: user.name,
            email: user.email,
            profession: user.profession
        },
        links: {
            self: `/api/v1/users/${user.id}`
        }
    }
}

const getAll = async(req, res) => {
    const users = await usersRepository.getAll()
    return res.status(200).json({ data: users.map(formatter) })
}

const findById = async(req, res) => {
    let user;
    try {
        user = await usersRepository.findById(req.params.id)
    } catch (e) {
        console.error(e);
        return res.status(500)
    }
    return res.status(200).json({ data: formatter(user) });
}

const save = async(req, res) => {
    let user;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing a required parameter" })
    }
    try {
        user = await usersRepository.create(req.body)
    } catch (e) {
        console.error(e);
        return res.status(500)
    }
    console.log(`Created user: ${user.name}, ${user.email} `);
    return res.status(201).json(formatter(user));
}

const remove = async(req, res) => {
    let user;
    try {
        user = await usersRepository.remove(req.params.id);
    } catch (e) {
        console.error(e);
        return res.status(500);
    }
    if (!user) return res.status(404).json({ success: false, message: `User not found for id: ${req.params.id}` })
    console.log(`Deleted user: ${user.name}, ${user.email} `);
    return res.status(204).json();
}

const update = async(req, res) => {
    let user;
    try {
        user = await usersRepository.update(req.params.id, req.body);
    } catch (e) {
        console.error(e);
        return res.status(500);
    }
    if (!user) return res.status(404).json({ success: false, message: `User not found for id: ${req.params.id}` })
    console.log(`Updated user: ${user.name}, ${user.email} `);
    return res.status(201).json(formatter(user));
}

module.exports = {
    getAll,
    save,
    remove,
    findById,
    update
}