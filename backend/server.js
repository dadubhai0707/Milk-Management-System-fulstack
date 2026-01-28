require("dotenv").config();
const app = require("./app")
const connectDb = require("./config/DB")

connectDb()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server Start ", PORT)
})