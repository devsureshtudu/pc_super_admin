const express = require('express');
const { body } = require('express-validator');

const apartmentController = require('../controllers/apartment');
const uploadImage = require('../middleware/upload-image');

const router = express.Router();

router.get('/apartments', apartmentController.getAllApartments);

router.get('/apartment/:apartmentId', apartmentController.getSingleApartment);

router.delete('/apartment/:apartmentId', apartmentController.deleteApartment);

router.post('/apartment', uploadImage,
    [
        body('name')
            .notEmpty()
            .withMessage('Please enter apartment name!'),
        body('age')
            .notEmpty()
            .withMessage("Please enter the apartment's age")
            .isInt()
            .withMessage("Age must be an integer"),
        body('bio')
            .trim()
            .notEmpty()
            .withMessage("Please enter the apartment's biography")
            .isLength({ min: 15 })
            .withMessage('The biography must be at least 15 characters'),
    ],
    apartmentController.addApartment
);

router.put('/apartment/:apartmentId', uploadImage,
    [
        body('name')
            .notEmpty()
            .withMessage('Please enter apartment name!'),
        body('age')
            .notEmpty()
            .withMessage("Please enter the apartment's age")
            .isInt()
            .withMessage("Age must be an integer"),
        body('bio')
            .trim()
            .notEmpty()
            .withMessage("Please enter the apartment's biography")
            .isLength({ min: 15 })
            .withMessage('The biography must be at least 15 characters'),
    ],
    apartmentController.updateApartment);

module.exports = router;