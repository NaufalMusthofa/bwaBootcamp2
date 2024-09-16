// kita import dulu package mongoose nya agar tersimpan nanti di node_modules
const mongoose = require('mongoose');

// lalu kita tarik si config.js nya yang ada di folder app dengan kta deklarasikan urlDb nya
const {urlDb} = require('../config');

// lalu kita connect kan mongo DB nya dengan konfigurasi yang sudah kita buat
mongoose.connect(urlDb);

// lalu kita simpan di constan db
const db = mongoose.connection;

// lalu panggil db nya dengan kita export
module.exports = db;

