const fs = require('fs')
const request = require('request')
const signale = require('signale')
const uuidv1 = require('uuid/v1')

const {
    FILE_categories,
    FILE_emoji,
} = require('./config')


const categories = JSON.parse(fs.readFileSync(`api/${FILE_categories}`))
const emoji = JSON.parse(fs.readFileSync(`api/${FILE_emoji}`))

if (!fs.existsSync('img')) fs.mkdirSync('img')

Object.keys(categories).forEach(key => {
    const folder = CateParse(categories[key])
    if (!fs.existsSync(`img/${folder}`)) fs.mkdirSync(`img/${folder}`)
})

signale.pending('Download files ...' + emoji.length)
emoji.forEach((em, index) => {
    const cate = CateParse(categories[em.category])
    let fileUrl = String(em['image']).trim()
    let fileName = String(em['image']).split('/')
    fileName = FileNameParse(fileName[fileName.length - 1])
    // console.log(fileUrl)
    try {
        setTimeout(() => {
            request(fileUrl).pipe(fs.createWriteStream(`./img/${uuidv1()}.png`))
        }, 1000)
        // request
        //     .get('http://icons.iconarchive.com/icons/iconka/meow-2/256/cat-sing-icon.png')
        //     .on('response', function (response) {
        //         console.log(response.statusCode) // 200
        //         console.log(response.headers['content-type']) // 'image/png'
        //     })
        //     .on('error', (res) => { console.log(res) })

    } catch (e) { }
    //
    // await request(fileUrl).pipe(fs.createWriteStream(`img/${cate}/${uuidv1()}.png`))
    if (index === emoji.length - 1) {
        signale.success('Finish.')
        // process.exit()
    }
})

function CateParse(cate) {
    return String(cate).trim().replace(' ', '').replace('/', '').replace(' ', '')
}

function FileNameParse(file) {
    return String(file).match(/[^\\\/:*?"<>|\r\n]+$/)[0]
}