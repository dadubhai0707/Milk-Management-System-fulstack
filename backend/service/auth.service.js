const User = require("../models/User.model")
const Get = async () => {
    const user = await User.find()
    return user
}
const Save = async (Data) => {
    const user = new User({
        FullName: {
            FirstName: Data.FullName.FirstName,
            LastName: Data.FullName.LastName,
        },
        Email: Data.Email,
        Phone: Data.Phone,
        Password: Data.Password,
        Gender: Data.Gender,
        Address: Data.Address
    })
    const addUser = await user.save()
    return addUser
}

const GenerateAndAccessToken = async (userID) => {
    try {
        const user = await User.findById(userID)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.RefreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return {
            accessToken,
            refreshToken,
            error: null
        }
    } catch (error) {
        return {
            accessToken: null,
            refreshToken: null,
            error
        }
    }
}

module.exports = {
    Save,
    Get,
    GenerateAndAccessToken,
}