import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/api/portfolio/balance/:address", (req, res) => {
  res.json({ success: true, data: { address: req.params.address, tokens: [], features: { defi: true, rwa: true, strategies: true } } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
