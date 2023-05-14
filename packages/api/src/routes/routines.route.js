const router = require('express').Router();
const usersRepository = require('../repository/users.repository');

router.post('/create-username', async (req, res) => {
    const users = await usersRepository.find()
    console.log(users)
    if(users.length < 1) return

    const createUsername = (name) => {
        name = name.toLowerCase()
        name = name.replace(/\s/g,'')
        let normalizedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        return `${normalizedName}.${Math.floor(Math.random() * (10 - 1) + 1)}`
    }
    try {
        await Promise.all(users.map(async element => {
            if (!element.username) {
                element.username = createUsername(`${element.firstname}.${element.lastname}`)
                await element.save()
            }            
        }))
        res.sendStatus(200)
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error)
    }
});

module.exports = router;