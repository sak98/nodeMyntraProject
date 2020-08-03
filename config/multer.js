//uploading files or images 
const multer = require("multer");
const { data } = require("jquery");

//destination folder : public/uploads {in this case}

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
module.exports ={storage};
