const { StatusCodes } = require('http-status-codes');

const User = require('./../model/userModel');


const registerUser = async (req, res) => {

    try {

        const { fullname, email, password } = req.body;

        const isEmailAlreadyExists = await User.findOne({ email: email });

        if (isEmailAlreadyExists) {

            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'user with this emailID already exists',
                data: null
            });

        }


        await User.create({ fullname, email, password });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'your account is registered successfully. Now please login'
        });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const isUserAlreadyExists = await User.findOne({ email: email });

        if (!isUserAlreadyExists) {

            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid Login Credentials. Please try again',
                data: null
            });

        };


        const isPasswordCorrect = await isUserAlreadyExists.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid Login Credentials. Please try again',
                data: null
            });
        };

        const token = isUserAlreadyExists.generateToken();


        res.status(StatusCodes.OK).json({
            success: false,
            message: 'you are logged in successfully',
            data: null,
            token: token
        });


    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};

const userProfile = async (req, res) => {

    try {

        const authenticatedUser = await User.findById(req.body.user);

        res.status(200).send({
            success: true,
            data: {
                fullName: authenticatedUser.fullname,
                email: authenticatedUser.email
            }
        });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

}


module.exports = {
    registerUser,
    loginUser,
    userProfile
}