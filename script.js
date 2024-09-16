const container = document.getElementById("puzzleContainer");
const pieceContainer = document.getElementById("pieceContainer");

const totalRows = 8; // Nombre de lignes dans la grille
const totalCols = 6; // Nombre de colonnes dans la grille
const tileWidth = 100; // Largeur des pièces
const tileHeight = 50; // Hauteur des pièces

// Tableau pour stocker les pièces de puzzle
const pieces = [];

// Générer automatiquement les pièces de puzzle et les zones de drop
for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalCols; col++) {
    const pieceIndex = row * totalCols + col;

    // Créer une zone de drop
    const dropZone = document.createElement("div");
    dropZone.classList.add("drop-zone");
    dropZone.style.top = `${row * tileHeight}px`;
    dropZone.style.left = `${col * tileWidth}px`;
    dropZone.id = `drop${pieceIndex}`;
    container.appendChild(dropZone);

    // Créer une pièce de puzzle
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.id = `piece${pieceIndex}`;
    piece.style.backgroundImage = `url('100x50/p${pieceIndex}.jpg')`; // Adapter selon ton nommage d'image
    piece.draggable = true;

    // Ajouter la pièce au tableau pour la mélanger plus tard
    pieces.push(piece);

    // Ajouter un événement de drag-and-drop pour chaque pièce
    piece.addEventListener("dragstart", dragStart);
  }
}

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mélanger les pièces
const shuffledPieces = shuffle(pieces);

// Ajouter les pièces mélangées au conteneur
shuffledPieces.forEach((piece) => {
  pieceContainer.appendChild(piece);
});

// Fonction drag-and-drop
function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

// Appliquer le dragover et drop sur chaque zone de drop
const dropZones = document.querySelectorAll(".drop-zone");
dropZones.forEach((zone) => {
  zone.addEventListener("dragover", dragOver);
  zone.addEventListener("drop", dropPiece);
});

function dragOver(e) {
  e.preventDefault(); // Nécessaire pour activer le drop
}

function dropPiece(e) {
  e.preventDefault();
  const pieceId = e.dataTransfer.getData("text");
  const draggedPiece = document.getElementById(pieceId);

  // Vérifier si l'élément ciblé est bien une drop-zone
  if (e.target.classList.contains("drop-zone")) {
    const dropZone = e.target;

    // Déplacer la pièce vers la zone de drop
    dropZone.appendChild(draggedPiece);

    // Replacer la pièce au bon endroit dans la zone de drop
    draggedPiece.style.position = "absolute";
    draggedPiece.style.left = "0";
    draggedPiece.style.top = "0";
  }
}
