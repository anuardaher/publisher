print('Start #################################################################')

db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME || 'root',
  process.env.MONGO_INITDB_ROOT_PASSWORD || 'example'
)
db.createUser({
  user: process.env.MONGO_INITDB_USER || 'publisher',
  pwd: process.env.MONGO_INITDB_USER_PASSWORD || 'publisher123',
  roles: ['readWrite']
})

print('END #################################################################')
