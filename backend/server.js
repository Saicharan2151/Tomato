import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Ensure this path is correct
import foodRouter from "./routes/foodRoute.js"; // Ensure this path is correct
import userRouter from "./routes/userRoute.js"; // Ensure this path is correct
import 'dotenv/config'; // Make sure dotenv is installed
import cartRouter from "./routes/cartRoutes.js"; // Ensure this path is correct
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port if available

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
