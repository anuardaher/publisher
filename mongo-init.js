print('Start #################################################################');

db.getSiblingDB('admin').auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
)
db.createUser({
    user: 'publisher_user',
    pwd: process.env.USER_PASSWORD,
    roles: ["readWrite"]
})

print('END #################################################################');