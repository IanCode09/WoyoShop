import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },

    {
        name: 'Ian',
        email: 'ian@gmail.com',
        password: bcrypt.hashSync('ian123', 10),
        isAdmin: false
    }
]

export default users