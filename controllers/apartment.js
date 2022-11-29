const Apartment = require('../models/apartment');
const sydFunctions = require('../utils/syd-functions');

exports.getAllApartments = async (req, res, next) => {
    try {
        const list = await Apartment.find()
        res.status(200).json({ message: "List of apartments", list: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleApartment = async (req, res, next) => {
    const apartmentId = req.params.apartmentId;
    try {
        const apartment = await Apartment.findById(apartmentId)
        if (!apartment) {
            return res.status(404).json({ message: 'Apartment not found!' });
        }
        res.status(200).json({ message: "Retrieved apartment", apartment: apartment });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addApartment = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    if (!req.file) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const apartment = new Apartment({
        name: req.body.name,
        age: req.body.age,
        bio: req.body.bio,
        photoUrl: req.file.path.replace("\\", "/") // If you are on Linux or Mac just use req.file.path
    });

    try {
        const result = await apartment.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Apartment is successfully added!",
            apartment: result
        });
    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(apartment.photoUrl);
        }
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateApartment = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }

    let photoUrl = req.body.image;
    if (req.file) {
        photoUrl = req.file.path.replace("\\", "/");
    }
    if (!photoUrl) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const apartmentId = req.params.apartmentId;
    try {
        const apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
            sydFunctions.deleteImage(req.file.path.replace("\\", "/"));
            return res.status(404).json({ message: 'Apartment not found!' });
        }
        if (photoUrl !== apartment.photoUrl) {
            sydFunctions.deleteImage(apartment.photoUrl);
        }
        apartment.name = req.body.name;
        apartment.age = req.body.age;
        apartment.bio = req.body.bio;
        apartment.photoUrl = photoUrl;
        const result = await apartment.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', apartment: result });

    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(apartment.photoUrl);
        }
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteApartment = async (req, res, next) => {
    const apartmentId = req.params.apartmentId;
    try {
        const apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
            return res.status(404).json({ message: 'Apartment not found!' });
        }

        sydFunctions.deleteImage(apartment.photoUrl);
        await Apartment.findByIdAndRemove(apartmentId);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};

