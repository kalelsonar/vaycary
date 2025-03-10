import bodyParser from "body-parser";
import { ogImageuploadDir } from "../config";
import multer from "multer";
const crypto = require('crypto');
const fs = require('fs')
import sharp from 'sharp'

const ogImageUpload = app => {
    let storage = multer.diskStorage({
        destination: ogImageuploadDir,
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                console.log('error', err)
                if (err) return cb(err);

                let ext;

                switch (file.mimetype) {
                    case 'image/jpeg':
                        ext = '.jpeg';
                        break;
                    case 'image/png':
                        ext = '.png';
                        break;
                    case 'image/jpg':
                        ext = '.jpg';
                        break;
                }
                cb(null, raw.toString('hex') + ext);
            })
        }
    })
    let upload = multer({ storage: storage });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    app.post('/uploadOgImage', function (req, res, next) {
        if (!req.user) {
            res.send(403);
        } else {
            next();
        }
    }, upload.single('file'), async (req, res, next) => {
        let file = req.file;

        sharp(file.path)
            .resize(1280)
            //.crop(sharp.strategy.entropy)
            .toFile(ogImageuploadDir + 'small_' + file.filename, function (err) {
                console.log("Error from resizing files", err);
            });

        sharp(file.path)
            .resize(1280)
            //.crop(sharp.strategy.entropy)
            .toFile(ogImageuploadDir + 'medium_' + file.filename, function (err) {
                console.log("Error from resizing files", err);
            });

        res.send({ status: 'SuccessFully uploaded!', file });

    });
}

export default ogImageUpload;
