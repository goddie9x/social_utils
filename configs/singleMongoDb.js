const connectToDB = async (mongoose, uri) => {
    try {
        mongoose.connect(uri);
        console.log('connect db successfully');
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectToDB;