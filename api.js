const fs = require('fs')
const request = require('request')
const signale = require('signale')

const {
    URL_categories,
    URL_emoji,
    FILE_categories,
    FILE_emoji,
} = require('./config')

// Create api directory
if (!fs.existsSync('api')) fs.mkdirSync('api')

// Save cate api
if (!fs.existsSync(`api/${FILE_categories}`)) {
    signale.pending('Getting categories ...')
    request(URL_categories).pipe(fs.createWriteStream(`api/${FILE_categories}`))
}

// Save emoji api
if (!fs.existsSync(`api/${FILE_emoji}`)) {
    signale.pending('Getting emoji api ...')
    request(URL_emoji).pipe(fs.createWriteStream(`api/${FILE_emoji}`))
}
