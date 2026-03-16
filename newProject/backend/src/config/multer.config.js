import multer from "multer";

export const  storage = multer.diskStorage({
    destination:function(req,file,cb){
cb(null,'public/temp/my-uploads')
        
    },


    filename: function (req , file,cb) {
        const uniqueSuffix = Date.now()
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
    })
  
const upload = multer({ storage })

export default upload