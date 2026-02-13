import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import numerRoutes from "./src/routes/numerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/numer", numerRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;