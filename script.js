const searchField = document.getElementById("searchField");
let searchResults = document.querySelector("#searchResults");
let queenSection = document.querySelector("#queenSection")
let metallicaSection = document.querySelector("#metallicaSection")
let eminemSection = document.querySelector("#eminemSection")
let found = document.querySelector("#found")

function createCards(artist, section) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)

        .then(response => { return response.json()})

        .then(data => {
            //Rimuovo il d-none nel caso la sezione sia in una delle 3 principali(queen, metallica, eminem)
            if (section.parentNode.id.toLowerCase() == `${artist}`) {
                let div = document.getElementById(`${artist}`);
                div.classList.remove("d-none")
            }

            //"Estraggo" l'array dall'API
            let arraySongs = data.data;

            //Creo un ciclo che crea una card per ogni canzone
            arraySongs.forEach(song => {
                //Creo un filtro in modo tale che esca solo l'artista che si cerca oppure l'artista della sezione
                if (section.parentNode.id.toLowerCase() == `${artist}`) {
                    if (song.artist.name.toLowerCase() != artist) {
                        return;
                    }
                }

                let card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("bg-transparent");
                card.classList.add("border");
                card.classList.add("border-0");
                card.classList.add("overflow-x-hidden");
                card.classList.add("col");
    
                card.innerHTML = 
                `
                <img src="${song.album.cover}" class="card-img-top" alt="album cover">
                <div class="card-body px-0">
                    <h5 class="card-title text-white text-truncate">${song.album.title}</h5>
                    <p class="card-text text-white text-truncate">${song.title}</p>
                    <p class="card-text small text-white">${song.artist.name}</p>
                </div>
                `;
                section.appendChild(card)
            });

        })
    
        .catch(e => {console.error("Errore in jsonplaceholder:", e)})
}

//Al caricamento della pagina "creo" le carte per ogni sezione
window.onload = () => {
    createCards("eminem", eminemSection);
    createCards("metallica", metallicaSection);
    createCards("queen", queenSection);
}

function search() {
    searchSection.innerHTML="";
    //Rimuovo la classe d-none solo qui perchè lo faccio comparire solo al click 
    found.classList.remove("d-none");
    eminemSection.parentNode.classList.add("d-none");
    metallicaSection.parentNode.classList.add("d-none");
    queenSection.parentNode.classList.add("d-none");
    if (searchField.value == "") {
        eminemSection.parentNode.classList.remove("d-none");
        metallicaSection.parentNode.classList.remove("d-none");
        queenSection.parentNode.classList.remove("d-none");
    }
    found.classList.add("text-white");
    createCards(searchField.value, searchSection);
    searchField.value = "";
}

