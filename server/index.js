import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const cache = new Map();
const TTL = 10 * 60 * 1000; // 10 минут

app.get("/games/:steamId", async (req, res) => {
  const { steamId } = req.params;
  const key = process.env.STEAM_API_KEY;

  // --- ПРОВЕРКА КЭША ---
  const cached = cache.get(steamId);

  if (cached) {
    const isExpired = Date.now() - cached.timestamp > TTL;

    if (!isExpired) {
      console.log("Отдаём из кэша:", steamId);
      return res.json(cached.data);
    }

    cache.delete(steamId);
  }

  // --- ЗАПРОС В STEAM ---
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${steamId}&include_appinfo=true`
    );

    const data = await response.json();

    // --- СОХРАНЕНИЕ В КЭШ ---
    cache.set(steamId, {
      data: data,
      timestamp: Date.now(),
    });

    console.log("Сохранили в кэш:", steamId);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3002, () => {
  console.log("Server started on http://localhost:3002");
});
