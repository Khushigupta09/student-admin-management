const bcrypt = require('bcryptjs');

const plainPassword = 'admin'; // Replace with your desired password
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

console.log('Hashed Password:', hashedPassword);
