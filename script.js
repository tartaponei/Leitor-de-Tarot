decks = {
    major: {
        names: [
            "O Louco", "O Mago", "A Sacerdotisa", "A Imperatriz",
            "O Imperador", "O Hierofante", "Os Enamorados", "O Carro",
            "A Força", "O Eremita", "A Roda da Fortuna", "A Justiça",
            "O Enforcado", "A Morte", "A Temperança", "O Diabo",
            "A Torre", "A Estrela", "A Lua", "O Sol",
            "O Julgamento", "O Mundo"
        ],
        fileNames: [
            "00-fool", "01-magician", "02-highpriestess", "03-empress",
            "04-emperor", "05-hierophant", "06-lovers", "07-chariot",
            "08-strength", "09-hermit", "10-wheeloffortune", "11-justice",
            "12-hangedman", "13-death", "14-temperance", "15-devil",
            "16-tower", "17-star", "18-moon", "19-sun",
            "20-judgement", "21-world"
        ],
        folder: "major"
    },
    minor: {
        names: [
            // Espadas (numeradas + corte)
            "Ás de Espadas", "Dois de Espadas", "Três de Espadas", "Quatro de Espadas",
            "Cinco de Espadas", "Seis de Espadas", "Sete de Espadas", "Oito de Espadas",
            "Nove de Espadas", "Dez de Espadas",
            "Rei de Espadas", "Rainha de Espadas", "Cavaleiro de Espadas", "Pajem de Espadas",
            
            // Copas (numeradas + corte)
            "Ás de Copas", "Dois de Copas", "Três de Copas", "Quatro de Copas",
            "Cinco de Copas", "Seis de Copas", "Sete de Copas", "Oito de Copas",
            "Nove de Copas", "Dez de Copas",
            "Rei de Copas", "Rainha de Copas", "Cavaleiro de Copas", "Pajem de Copas",
            
            // Paus (numeradas + corte)
            "Ás de Paus", "Dois de Paus", "Três de Paus", "Quatro de Paus",
            "Cinco de Paus", "Seis de Paus", "Sete de Paus", "Oito de Paus",
            "Nove de Paus", "Dez de Paus",
            "Rei de Paus", "Rainha de Paus", "Cavaleiro de Paus", "Pajem de Paus",
            
            // Ouros (numeradas + corte)
            "Ás de Ouros", "Dois de Ouros", "Três de Ouros", "Quatro de Ouros",
            "Cinco de Ouros", "Seis de Ouros", "Sete de Ouros", "Oito de Ouros",
            "Nove de Ouros", "Dez de Ouros",
            "Rei de Ouros", "Rainha de Ouros", "Cavaleiro de Ouros", "Pajem de Ouros"
        ],
        fileNames: [
            // Espadas (22-31 numeradas, 62-65 corte)
            "22-aceofswords", "23-twoofswords", "24-threeofswords", "25-fourofswords",
            "26-fiveofswords", "27-sixofswords", "28-sevenofswords", "29-eightofswords",
            "30-nineofswords", "31-tenofswords",
            "62-kingofswords", "63-queenofswords", "64-knightofswords", "65-pageofswords",
            
            // Copas (38-47 numeradas, 66-69 corte)
            "32-aceofcups", "33-twoofcups", "34-threeofcups", "35-fourofcups",
            "36-fiveofcups", "37-sixofcups", "38-sevenofcups", "39-eightofcups",
            "40-nineofcups", "41-tenofcups",
            "66-kingofcups", "67-queenofcups", "68-knightofcups", "69-pageofcups",
            
            // Paus (54-63 numeradas, 70-73 corte)
            "42-aceofwands", "43-twoofwands", "44-threeofwands", "45-fourofwands",
            "46-fiveofwands", "47-sixofwands", "48-sevenofwands", "49-eightofwands",
            "50-nineofwands", "51-tenofwands",
            "70-kingofwands", "71-queenofwands", "72-knightofwands", "73-pageofwands",
            
            // Ouros (74-83 numeradas, 84-87 corte)
            "52-aceofpentacles", "53-twoofpentacles", "54-threeofpentacles", "55-fourofpentacles",
            "56-fiveofpentacles", "57-sixofpentacles", "58-sevenofpentacles", "59-eightofpentacles",
            "60-nineofpentacles", "61-tenofpentacles",
            "74-kingofpentacles", "75-queenofpentacles", "76-knightofpentacles", "77-pageofpentacles"
        ],
        folder: "minor"
    }
};

// Combina os baralhos
decks.all = {
    names: [...decks.major.names, ...decks.minor.names],
    fileNames: [...decks.major.fileNames, ...decks.minor.fileNames],
    folder: "",
    minId: 0,
    maxId: 87
};

function getRandomCard(deckType) {
    const deck = decks[deckType];
    let cardId;
    
    if (deckType === 'all') {
        // Sorteia considerando todos os IDs possíveis (0-87)
        cardId = Math.floor(Math.random() * (deck.maxId - deck.minId + 1));
        
        // Ajusta para pular os intervalos não utilizados
        if (cardId >= 32 && cardId <= 37) cardId += 6;   // Pula para 38-43 (Copas)
        if (cardId >= 48 && cardId <= 53) cardId += 6;   // Pula para 54-59 (Paus)
        if (cardId >= 64 && cardId <= 65) cardId += 10;  // Pula para 74-75 (Ouros)
    } else {
        // Sorteia dentro do intervalo do baralho específico
        cardId = Math.floor(Math.random() * (deck.maxId - deck.minId + 1)) + deck.minId;
    }
    
    // Encontra o índice correspondente no array
    let index;
    if (deckType === 'major') {
        index = cardId;
    } else if (deckType === 'minor') {
        index = cardId - 22;
    } else { // 'all'
        index = cardId <= 21 ? cardId : cardId - 22 + decks.major.names.length;
    }
    
    return {
        id: cardId,
        name: deck.names[index],
        fileName: deck.fileNames[index] + '.png',
        folder: deckType === 'all' ? (cardId <= 21 ? 'major' : 'minor') : deck.folder
    };
}

document.getElementById("draw").addEventListener("click", () => {
    const deckType = document.getElementById("deck").value;
    const card = getRandomCard(deckType);
    const imagePath = `imagens/${card.folder}/${card.fileName}`;
    
    const imgElement = document.getElementById("card-image");
    const nameElement = document.getElementById("card-name");
    
    console.log(`Sorteio: ID ${card.id} | ${imagePath}`); // Debug
    
    // Reset e carregamento
    imgElement.src = "";
    imgElement.style.display = "none";
    nameElement.textContent = "Carregando...";
    
    imgElement.src = imagePath + `?t=${Date.now()}`;
    nameElement.textContent = card.name;
    
    imgElement.onerror = () => {
        console.error("Imagem não encontrada:", imagePath);
        nameElement.textContent = `Erro: Carta ${card.id} não encontrada!`;
        imgElement.style.display = "none";
    };
    
    imgElement.onload = () => {
        imgElement.style.display = "block";
        imgElement.alt = card.name;
    };
});