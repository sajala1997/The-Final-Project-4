const urlModel = require("../model/urlModel")
const validUrl = require('valid-url')
const shortid = require('shortid')

const baseUrl = 'http:localhost:3000'

const createUrl = async function (req, res) {

    let longUrl= req.body
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }
    let urlCode = shortid.generate()
    if (validUrl.isUri(longUrl)) {
        let checkUrl = await urlModel.findOne({ longUrl: longUrl })
        if(checkUrl) return res.status(400).send({ status: false, msg: "shortUrl already exist" })
        else
            shortUrl = baseUrl + '/' + urlCode

        let data = {
            "longUrl": longUrl,
            "shortUrl": shortUrl,
            "urlCode" : urlCode
        }
        let url = await urlModel.create(data);
        return res.status(201).send({ status: true, msg: url })

    }
}

module.exports.createUrl=createUrl