const multer = require('multer');

const getImagePath = (fileUrl) => {
    let image = fileUrl.split('/');
    let imageName = image[image.length - 1];

    return process.env.UPLOAD_FOLDER + '/' + imageName;
};

/**
 * Store image to "uploads" folder. after modifiying image namge.
 *
 */
const getStorage = () => {
    return (Storage = multer.diskStorage({
        destination: process.env.UPLOAD_FOLDER,
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname);
        },
    }));
};

const uploadImage = () => {
    return multer({
        storage: getStorage(),
    }).single('image');
};


const getFomattedDate = (datetime) => {
    return new Date(datetime).toDateString()
};


module.exports = {
    getImagePath,
    uploadImage,
    getFomattedDate,
};


