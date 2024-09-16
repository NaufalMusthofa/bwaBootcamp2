const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

// 2. genrate url image (belom dipake)
const generateUrlImage = async(req, res) => {
    const result = `uploads/${req.file.filename}`;
    return result;
}

// 1. kita gunakan cara ini (update ini yang dipake)
const createImage = async(req, res, next) => {
    const result = await Images.create({
        name: req.file ? `uploads/${req.file.filename}` : 'uploads/avatar/default.jpg'
    });

    return result
};

const getAllImages = async() => {
    const result = await Images.find();
    return result;
}

// tambahkan fuction checking image untuk nanti di si talents nya
// dan untuk async nya jangan make paramter req, res. langsung saja cari id nya
// jadi di paramter async langsung cari berdasarkan id nya
const checkingImage = async(imageId) => {
    const result = await Images.findById(imageId);
    console.log(result);

    // buat kondisi ketika id nya tidak ditemukan
    if (!result) throw new NotFoundError(`tidak ada gambar dengan id : ${imageId}`);

    // ketika kondisi id nya benar / ada
    return result
}

module.exports = {
    createImage,
    generateUrlImage,
    checkingImage,
    getAllImages,

};