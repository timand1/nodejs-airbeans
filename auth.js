const express = require('express')
const { findAdmin } = require('./model/accountdb')

async function auth(req, res, next) {
    const adminKey = req.headers['api-key']
    const apiKeys = await findAdmin(adminKey)
    if (adminKey && apiKeys.length > 0) {
        next();
    }

    else {
        const resObj = {
            error: 'Access denied'
        }
        res.json(resObj)
    }
}

module.exports = { auth };