const { Router } = require('express');
const router = Router();
const { getMenu, findItemId, findItemTitle, addItem, deleteItem } = require('../model/menudb');
const menuArr = require('../menu.json')
const { auth } = require('../auth')

router.get('/', async (req, res) => {
    const menu = await getMenu(menuArr.menu)
    const resObj = {
        success: false
    };

    if (menu) {
        resObj.success = true;
        resObj.menu = menu;
    } else {
        resObj.message = 'ErrorErrorError'
    };

    res.json(resObj);
});

router.post('/', auth, async (req, res) => {
    const { id, title, desc, price } = req.body;
    const newItem = {
        id: id,
        title: title,
        desc: desc,
        price: price
    };

    const resObj = {
        success: false
    }

    if (newItem.hasOwnProperty('id') && newItem.hasOwnProperty('title') && newItem.hasOwnProperty('desc') && newItem.hasOwnProperty('price')) {
        const checkIfIdExist = await findItemId(newItem.id)
        const checkIfTitleExist = await findItemTitle(newItem.title)
        if (checkIfIdExist.length === 0 && checkIfTitleExist.length === 0) {
            const addedItem = addItem(newItem);
            if (addedItem) {
                resObj.success = true
                resObj.message = `${newItem.title} added to the menu`
            } else {
                resObj.message = 'Something went wrong...'
            }
        } else {
            if (checkIfIdExist.length === 1) {
                resObj.message = `An item with id ${newItem.id} already exist`
            } else if (checkIfTitleExist.length === 1) {
                resObj.message = `An item with the title ${newItem.title} already exist`
            }
        }
    } else {
        resObj.message = 'Wrong input'
    }
    res.json(resObj)
});

router.delete('/:id', auth, async (req, res) => {
    const itemId = Number(req.params.id);
    const resObj = {
        success: false
    }

    const checkIfExist = await findItemId(itemId)
    if (checkIfExist.length === 1) {
        const removeItem = await deleteItem(itemId)
        if (removeItem > 0) {
            resObj.success = true
            resObj.message = `Item removed`
        } else {
            resObj.message = 'Something went wrong...'
        }
    } else {
        resObj.message = 'An item with that id does not exist.'
    }
    res.json(resObj)
});

module.exports = router