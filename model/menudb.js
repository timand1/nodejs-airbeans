const nedb = require('nedb-promise');
const database = new nedb({ filename: 'menu.db', autoload: true });

async function getMenu(menuArr) {
    let result = await database.find({});
    if (result.length === 0) {
        for (const menuItem of menuArr) {
            database.insert(menuItem)
        }
        result = await database.find({});
    }
    return result;
};


async function findItemId(itemId) {
    const result = await database.find({ id: itemId })
    return result
}

async function findItemTitle(itemTitle) {
    const result = await database.find({ title: itemTitle })
    return result
}

async function addItem(newItem) {
    const result = await database.insert(newItem)
    return result

}

async function deleteItem(itemId) {
    const result = await database.remove({ id: itemId })
    return result
}

module.exports = { getMenu, findItemId, findItemTitle, addItem, deleteItem }