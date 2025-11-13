import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import prisma from "./prismaClient";
import companionRoutes from "./routes/companion";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("💫 NeuroBridge Backend Running...");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/companion", companionRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

