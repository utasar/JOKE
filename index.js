const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

const apiKey = "SAXb3lrT9IIorMjQkAFWBg==KCDQCZgWgcoAU4ai";
const apiKey = "4kqGcJx8uDXo3XIskcbzokAz7rN8nWJs3PL9Mcll";

const options = {
  method: "GET",
@@ -10,28 +10,26 @@ const options = {
  },
};

const apiURL = `https://api.api-ninjas.com/v1/dadjokes?limit=1`;
const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke() {
  try {
    btnEl.innerText = "Loading...";
    btnEl.disabled = true;
    jokeEl.innerText = "Updating...";
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();
    const jokeContent = data[0].joke;
    jokeEl.innerText = jokeContent;
    btnEl.innerText = "Tell me a joke";

    btnEl.disabled = false;
    console.log(data);
    btnEl.innerText = "Tell me a joke";

    jokeEl.innerText = data[0].joke;
  } catch (error) {
    console.log(error);
    jokeEl.innerText = "An error happened, try again later";
    btnEl.innerText = "Tell me a joke";
    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";
    console.log(error);
  }
}

getJoke();

btnEl.addEventListener("click", getJoke);