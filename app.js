const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/pokemon/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon non trouvé" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
