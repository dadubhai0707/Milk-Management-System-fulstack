import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["super_admin", "admin", "seller", "customer"],
      default: "customer",
      required: true
    },

    RefreshToken: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    profileImage: {
      type: String,
      default: ""
    },

    lastLoginAt: {
      type: Date
    },


  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);



userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next()
  this.Password = await bcrypt.hash(this.Password, 12)
  next()
})

userSchema.methods.isPasswordCorrect = async function (Password) {
  return await bcrypt.compare(Password, this.Password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
  },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id
  },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
}
