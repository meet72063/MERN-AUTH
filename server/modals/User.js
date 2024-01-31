const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: false,
    },
    email: {
      type: String,
      unique: true,
    },
    picture: [String],
    googleId: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

//hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(String(this.password), salt);
  }
  next();
});

//validate if user provided password is correct or not
userSchema.methods.comparePassword = async function (candidatePasswd) {
  const match = await bcrypt.compare(String(candidatePasswd), this.password);
  return match;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
