const getImagePath = (fileUrl) => {

    
    let image = fileUrl.split("/");
    let imageName = image[image.length - 1];
    return process.env.UPLOAD_FOLDER + "/" + imageName;
  

};

module.exports = {
  getImagePath,
};
