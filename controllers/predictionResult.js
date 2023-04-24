const { StatusCodes } = require('http-status-codes');

const Prediction = require('./../model/predModel');


const postPredictionController = async (req, res) => {

    try {

        const pred = req.body.predResultString;

        await Prediction.create({ predResult: pred, createdBy: req.body.user });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};

const getAllPredictions = async (req, res) => {

    try {

        const allPredData = await Prediction.find({ createdBy: req.body.user });

        const lastEvaluatedResult = allPredData[allPredData.length - 1].predResult;

        res.status(200).send({
            success: true,
            data: lastEvaluatedResult
        });


    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    }
};

module.exports = {
    postPredictionController,
    getAllPredictions
};