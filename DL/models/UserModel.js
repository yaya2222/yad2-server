const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, unique: true,
        validate: {
            validator: function (val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
    idProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    tel: {
        number: { type: String, required: true ,validate:{
            validator:function(val){
                return /^05\d([-]{0,1})\d{7}$/.test(val)
            },
            message:props=>`The number ${props.value} is not an Israeli mobile phone number`
        }},
        isWhatapp: { type: Boolean }
    },
    isActive: { type: Boolean, default: true },
    lastConnection: { type: Date, default: new Date(),select:false},
    firstConnection: { type: Date, default: new Date(), immutable: true ,select:false}
},
)

module.exports = new mongoose.model("users", UserSchema)