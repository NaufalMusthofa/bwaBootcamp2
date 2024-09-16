const Talents = require('../../api/v1/talents/model');
// import checking image nya
const { checkingImage } = require('./images')

// import error nya (yg sudah kita buat)
const { BadRequestError, NotFoundError } = require('../../errors');

// get all talents
const getAllTalents = async(req) => {
    const { keyword } = req.query; // bisa disebut filter pencarian nantinya berdasarkan name nya seperti dibawah

    // kita buat kondisi dengan objek kosong
    let condition = {};

    // kita cek ketika si keyword nya true / kita mencari ada name nya
    // ...condition (ini merupakan spread operator) tujuanya untuk copy in si datanya kedalam condition
    // $regex (untuk memanipulasi string, jadi ktika kita mencari m dia bakal muncul pencarian berdasarkan str m)
    // $options: 'i' (memanpulasi string, jadi saat mencari huruf besar/kecil sama aj)
    if (keyword){
        condition = {...condition, name: { $regex: keyword, $options: 'i'}};
    }

    // kita ambil data nya berdasarkan keyword nya
    // mencari/tampilkan berdasrkan condition nya dengan populate
    const result = await Talents.find(condition).populate({
        // mencari id lalu name nya
        path: 'image',
        select: '_id name'
    })
    .select('_id name role'); // kita hanya tampilkan

    return result;
}

// craete talents
const createTalents = async(req) => {
    const {name, image, role} = req.body;

    // kita cecking image nya ada atau tidak
    await checkingImage(image)

    // kita check juga talents ada / tidak
    const check = await Talents.findOne({name});

    // ketika ada
    if (check) throw new BadRequestError('pembicara sudah terdaftar');

    // ketika tidak ada, buat baru
    const result = await Talents.create({name, image, role});

    return result;
}

const getOneTalents = async(req) => {
    const { id } = req.params;
    const result = await Talents.findOne({_id: id}).populate({
        path: 'image',
        select: '_id name'
    }).select('_id name role image');

    // cek dulu id nya ada/tidak
    if (!result) throw new BadRequestError(`tidak ada pembicara dengan id : ${id}`);

    // klo ada id nya jalan ini
    return result;
}

const updateTalents = async(req) => {
    const { id } = req.params;
    const { name, image, role} = req.body;

    // checking image nya dulu
    await checkingImage(image);

    // cari id talents
    const check = await Talents.findOne({
        name,
        _id: {$ne: id}
    });

    if (check) throw new BadRequestError('pembicara nama duplikat');

    const result = await Talents.findByIdAndUpdate(
        {_id: id},
        {name, image, role},
        {new: true, runValidators: true}
    );

    return result
}

// delete
const deleteTalents = async(req) => {
    const { id } = req.params;

    const result = await Talents.findOne({_id: id});

    if (!result) throw new NotFoundError(`tidak ada pembicara dengan id : ${id}`);

    // kalo ada id nya, maka delete
    await result.deleteOne();

    return result;
};

const checkingTalents = async(talentId) => {

    const result = await Talents.findById(talentId);

    if (!result) throw new BadRequestError(`tidak ada pembicara dengan id : ${talentId}`);

    return result;
}


module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingTalents
}