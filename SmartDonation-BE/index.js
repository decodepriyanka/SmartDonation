import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import ngoRoute from "./routes/ngoRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import donationRoute from "./routes/donationItemRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import formData from "express-form-data";
import emailRoute from "./routes/emailRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());

app.use("/api/users", userRoute);
app.use("/api/ngo", ngoRoute);
app.use("/api/category", categoryRoute);
app.use("/api/admin", adminRoute);
app.use("/api/donation", donationRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/mail", emailRoute);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
