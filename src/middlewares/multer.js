const path = require("path");

const multer = require("multer");

const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadImage = multer({ storage: imageStore });

module.exports = { uploadImage };
// module.exports = (folderName) => {
//     return multer({
//         fileFilter: (req,file,cb)=> {
//             const ext = path.extname(file.originalname)
//             if (
//                 ext !== ".png" &&
//                 ext !== ".gif" &&
//                 ext !== ".jpg" &&
//                 ext !== ".jpeg"
//             ) {
//                 return cb(new Error("Seules les images sont autorisées"))
//             }
//             cb(null,true)
//         },
//         dest:`/upload/${folderName}`,
//         filename:(req,file,cb) => {
//             cb(null,file.originalname)
//         }
//     })
// }
