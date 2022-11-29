const mongoose = require('mongoose');
const apartments_details = mongoose.Schema(
    {
        categoryName: { type: String },
        countryCode: { type: String },
        phone: { type: String },
        reviewsCount: { type: String },
        state: { type: String },
        street: { type: String },
        title: { type: String },
        totalScore: { type: String },
        url: { type: String },
        website: { type: String },
        _id: { type: String },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('apartments_details', apartments_details);
