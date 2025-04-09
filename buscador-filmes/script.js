/* JSON (JavaScript Object Notation) é um formato leve e fácil de ler usado para armazenar e trocar dados entre sistemas, como entre seu código JavaScript e uma API. Pense nele como uma maneira organizada de escrever informações que tanto humanos quanto máquinas entendem. */

const form = document.getElementById("buscaForm");
const resultados = document.getElementById("resultados");
const toggleTheme = document.getElementById("toggleTheme");
const apiKey = "071a3e04ff983ee9da0ba3f7a247583d"; // Substitua pela sua chave REAL

// Alternar tema
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Busca de filmes
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const termo = document.getElementById("termo").value.trim();

  if (!termo) {
    resultados.innerHTML = "<p style='color: red;'>Digite um termo para buscar!</p>";
    return;
  }

  resultados.innerHTML = "<p class='loading'>Carregando...</p>";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(termo)}`
    );
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    resultados.innerHTML = "";
    if (data.results.length === 0) {
      resultados.innerHTML = "<p>Nenhum filme encontrado.</p>";
      return;
    }

    data.results.slice(0, 5).forEach(filme => {
      const div = document.createElement("div");
      div.classList.add("filme");
      div.innerHTML = `
        <img src="${filme.poster_path ? 'https://image.tmdb.org/t/p/w200' + filme.poster_path : 'https://via.placeholder.com/200x300'}" alt="${filme.title}">
        <div>
          <h2>${filme.title}</h2>
          <p>Lançamento: ${filme.release_date || "Desconhecido"}</p>
          <p>Nota: ${filme.vote_average}/10</p>
          <p class="overview">${filme.overview || "Sinopse não disponível."}</p>
        </div>
      `;
      resultados.appendChild(div);
    });
  } catch (error) {
    resultados.innerHTML = `<p style="color: red;">Erro ao buscar: ${error.message}</p>`;
  }
});