const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true // Faltu spaces hata dega
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      lowercase: true, // "ABC@GMAIL.COM" -> "abc@gmail.com"
      trim: true,
      unique: true, // Do log same email use na kar sakein
      sparse: true // Taaki agar kisi ka email null hai toh unique error na aaye
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "seller", "customer"],
      default: "customer",
      required: true
    },
    refreshKey: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    profileImage: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);