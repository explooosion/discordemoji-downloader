const fs = require('fs')
const request = require('request')
const signale = require('signale')

const {
    FILE_categories,
    FILE_emoji,
} = require('./config')

// Timeout deley for request, avoid to socket error
const DELEY = 30

// Read api from local
const categories = JSON.parse(fs.readFileSync(`api/${FILE_categories}`))
const emoji = JSON.parse(fs.readFileSync(`api/${FILE_emoji}`))

// Create img directory
if (!fs.existsSync('img')) fs.mkdirSync('img')

// Create categories folder
Object.keys(categories).forEach(key => {
    const folder = CateParse(categories[key])
    if (!fs.existsSync(`img/${folder}`)) fs.mkdirSync(`img/${folder}`)
})

// Start download
Download(0)

/**
 * Download File
 * @param {Number} index The index start from.
 */
function Download(index) {
    const cate = CateParse(categories[emoji[index].category])
    let fileUrl = String(emoji[index].image).trim()
    let fileName = String(emoji[index].image).split('/')
    fileName = FileNameParse(fileName[fileName.length - 1])
    setTimeout(() => {

        signale.pending(`[${index + 1}/${emoji.length}] - ${fileUrl}`)

        if (!fs.existsSync(`./img/${cate}/${fileName}`)) {
            try {
                request(fileUrl).pipe(fs.createWriteStream(`./img/${cate}/${fileName}`))
            } catch (e) {
                signale.fatal(new Error(`Can not download [${index + 1}/${emoji.length}] - ${fileUrl}`))
            }
        }

        index += 1
        if (index < emoji.length) {
            Download(index)
        } else {
            signale.success('Finish.')
            process.exit()
        }

    }, DELEY)
}

/**
 * RegExp CateName 
 * @param {String} cate Parse the cataname.
 */
function CateParse(cate) {
    return String(cate).trim().replace(/\s/g, '').replace('/', '')
}

/**
 * RegExp FileName
 * @param {String} file Parse the filename.
 */
function FileNameParse(file) {
    // return String(file).match(/[^\\\/:*?"<>|\r\n]+$/)[0]
    return String(file).replace(':', '')
}