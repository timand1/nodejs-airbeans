const nedb = require('nedb-promise');
const database = new nedb({ filename: 'account.db', autoload: true });

async function createAccount(account) {
    const result = await database.insert(account);
    return result;
};

async function compareCredentials(credentials) {
    const result = await database.find({ $and: [{ username: credentials.username }, { password: credentials.password }] });
    return result;
}

async function checkIfAccountExist(credentials) {
    const result = await database.find({ $or: [{ username: credentials.username }, { email: credentials.email }] });
    return result;
}

async function findAdmin(adminKey) {
    const result = await database.find({ apiKey: adminKey })
    return result
}
module.exports = { createAccount, compareCredentials, checkIfAccountExist, findAdmin }