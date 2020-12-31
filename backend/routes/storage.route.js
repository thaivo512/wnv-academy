const express = require('express');
const auth = require('../middlewares/auth.mdw'); 
const router = express.Router();
const randomstring = require('randomstring');
const path = require('path'); 
const fs = require('fs');

router.post('/', auth(), async (req, res) => {
    try {
        if(!req.files) {
            return res.send({
                is_success: false,
                message: 'No file uploaded'
            });
        } 
        
        let file = req.files.file;

        const extension = file.name.substring(file.name.lastIndexOf("."));
        const uri = randomstring.generate(20) + extension;
        file.mv('./storage/' + uri);

        res.json({
            is_success: true,
            message: 'File is uploaded',
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size,
                uri: uri
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});


router.get('/:fileName',  async (req, res) => {
    
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..', 'storage', fileName);


    try {
        fs.accessSync(filePath, fs.F_OK);
        // Do something
        return res.sendFile(filePath);
    } catch (e) {
        // It isn't accessible
        return res.status(404).send("File not found");
    } 
});

module.exports = router;