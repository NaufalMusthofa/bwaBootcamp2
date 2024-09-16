const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      require: [true, "nama harus diisi"],
    },
    email: {
      type: String,
      maxlength: [40, 'panjang name maksimal 40 karakter'],
      require: [true, "email harus diisi"],
    },
    password: {
      type: String,
      minlength: 7,
      require: [true, "password harus diisi"],
    },
    role: {
        type: String,
        enum: ['admin', 'organizer', 'owner'],
        default: 'admin'
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      require: true
    },
  },

  {
    timestamps: {
      currentTime: () => {
        const now = new Date();
        const localDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        return localDate;
      },
    },
  }
);

// bisa disebut hooks
// function biasa (this nya kalo ini dapat digunakan untuk mengakses data instance tersebut, penjelasan ada dibawah)
userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')){
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});

userSchema.methods.comparePassword = async function (canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", userSchema);


/*
Program pertama dan kedua memiliki tujuan yang sama, yaitu untuk meng-hash password sebelum menyimpan user ke dalam database, namun ada perbedaan penting dalam penggunaan `this`.

### Perbedaan Utama:
1. **Program Pertama (fungsi biasa):**
   ```javascript
   userSchema.pre('save', async function (next) {
       const User = this;
       if (User.isModified('password')){
           User.password = await bcrypt.hash(User.password, 12);
       }
       next();
   })
   ```
   - Menggunakan **fungsi biasa (regular function)**.
   - Dalam fungsi biasa, keyword `this` merujuk pada instance dari schema yang sedang diolah (misalnya, user yang sedang disimpan). Oleh karena itu, `this` dapat digunakan untuk mengakses data instance tersebut.

2. **Program Kedua (arrow function):**
   ```javascript
   userSchema.pre('save', async (next) => {
       const User = this;
       if (User.isModified('password')){
           User.password = await bcrypt.hash(User.password, 12);
       }
       next();
   })
   ```
   - Menggunakan **arrow function**.
   - Arrow function tidak memiliki binding `this` sendiri. Dalam konteks ini, `this` di dalam arrow function tidak akan merujuk ke instance schema, tetapi ke konteks `this` yang berada di luar function tersebut (kemungkinan besar undefined atau konteks global).

### Kesimpulan:
- **Program pertama** adalah yang benar karena menggunakan regular function untuk memastikan bahwa `this` merujuk pada instance dari user yang sedang disimpan.
- **Program kedua** tidak akan berfungsi seperti yang diharapkan karena `this` dalam arrow function tidak merujuk ke instance schema, sehingga tidak bisa mengakses `User.password` dengan benar.

Jadi, sebaiknya gunakan bentuk pertama dengan regular function untuk memastikan `this` mengacu ke instance schema.

*/
