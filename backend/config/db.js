import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect("mongodb+srv://sdudala:Charan123@cluster0.hxfxm7f.mongodb.net/food-del")
        .then(() => console.log("DB connected"))
        .catch((err) => console.error("DB connection error:", err));
};
