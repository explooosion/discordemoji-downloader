const fs = require('fs')
const request = require('request')
const signale = require('signale')

const {
    URL_categories,
    URL_emoji,
    FILE_categories,
    FILE_emoji,
} = require('./config')

if (!fs.existsSync('api')) fs.mkdirSync('api')

if (!fs.existsSync(`api/${FILE_categories}`)) {
    signale.pending('Download categories ...')
    request(URL_categories).pipe(fs.createWriteStream(`api/${FILE_categories}`))
    signale.success('Finish.');
}

if (!fs.existsSync(`api/${FILE_emoji}`)) {
    signale.pending('Download emoji api ...')
    request(URL_emoji).pipe(fs.createWriteStream(`api/${FILE_emoji}`))
    signale.success('Finish.');
}
