const { StatusCodes } = require('http-status-codes');
// import services, untuk supaya kita ubah nya / maintance nya nanti di services nya aja
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require('../../../services/mongoose/categories');

// post categories
const create = async(req, res, next) => {
    try {
        const result = await createCategories(req);

        // lalu kita bisa balikin res nya mau apa
        res.status(StatusCodes.CREATED).json({
            data: result,
        })

    } catch (err) {
        next(err);
    }
};

// get all categories
const indexAllCategories = async(req, res, next) => {
    try {
        const result = await getAllCategories(); // panggil aja getAllCategories nya yg ada di foder services

        res.status(StatusCodes.OK).json({
            data: result,
        })


    } catch (err) {
        next('error', err)
    }
}

// find id
const find = async(req, res, next) => {
    try {
        const result = await getOneCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })

    } catch (error) {
        next(error)
    };
};

// update categories
const update = async(req, res, next) => {
    try {
        const result = await updateCategories(req)

        // panggil res nya
        res.status(StatusCodes.OK).json({
            data: result,
        })

    } catch (error) {
        next(error)
    };
};

// delete categories
const destroy = async(req, res, next) => {
    try {
        const notifDelete = 'Data Berhasil Di Hapus!'
        const result = await deleteCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: notifDelete,
        })

        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create, indexAllCategories, find, update, destroy
};