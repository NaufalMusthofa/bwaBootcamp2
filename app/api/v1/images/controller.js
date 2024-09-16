const { StatusCodes } = require('http-status-codes');
const { getAllImages, createImage } = require('../../../services/mongoose/images');

const create = async(req, res, next) => {
    try {
        console.log('req.file')
        console.log(req.file)
        const result = await createImage(req);

        res.status(StatusCodes.CREATED).json({
            data: result
        })


    } catch (error) {
        next(error)
    }
}
const index = async(req, res, next) => {
    try {
        console.log('req.file')
        console.log(req.file)
        const result = await getAllImages(req);

        res.status(StatusCodes.OK).json({
            data: result
        })


    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    
}