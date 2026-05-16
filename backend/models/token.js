import mongoose from "mongoose"
import {Schema} from "mongoose"

const refreshTokenSchema = Schema({
    token: {type: String, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
},
{timestamps: true}
)

const RefreshToken = mongoose.model('token', refreshTokenSchema)
    // 'token' > collection name in database, 
export default RefreshToken
