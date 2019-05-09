const knox = require('knox-s3')
const fs = require('fs')
const path = require('path')


let sec;
if (process.env.NODE_ENV == 'production') {
    sec = process.env.AWS; // in prod the secrets are environment variables
    var client = knox.createClient({
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        bucket: 'socialnettwerk'
    });
} else {
    sec = require('../.secrets');
    var client = knox.createClient({
        key: sec.AWS.AWS_KEY,
        secret: sec.AWS.AWS_SECRET,
        bucket: 'socialnettwerk'
    });
}


exports.upload = function(req, res, next) {
    console.log('got to s3..', req.file)
    if (!req.file) {
        return res.sendStatus(500);
    }
    const s3Request = client.put(req.file.filename, {
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    });
    const stream = fs.createReadStream(req.file.path);
    stream.pipe(s3Request);

    s3Request.on('response', s3Response => {
        //console.log('s3', req.body);
        if (s3Response.statusCode == 200) {
            res.locals.newImg = {
                url: s3Response.req.url,
                userId: req.body.iUser
            }
            next();
            fs.unlink(req.file.path, () => {});
        } else {
            res.sendStatus(500);
        }
    })
}

exports.deleteImg = (req, res, next) => {
    try { 
        let delBase = path.parse(req.body.delUrl).base;
        console.log('deleting from bucket..', delBase);
        client.deleteFile(`/${delBase}`, (err, res) => {
            if (err) {
                console.log('err del s3..', err);
                res.sendStatus(500);
            } else {
                console.log('deleted', res.statusCode);
            }
        })
    } catch (err) {
        console.log('err del s3..', err);
        res.sendStatus(500);
    }
    next()

}
