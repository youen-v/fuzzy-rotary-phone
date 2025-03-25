document
  .getElementById("pokemonForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const input = document.getElementById("pokemonName");
    const name = input.value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Recherche en cours...";

    try {
      const response = await fetch(`/api/pokemon/${name}`);

      if (!response.ok) {
        throw new Error("Pokémon non trouvé");
      }

      const data = await response.json();

      resultDiv.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Type(s) : ${data.types.map((t) => t.type.name).join(", ")}</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p style="color:red;">Erreur : ${error.message}</p>`;
    }
  });
