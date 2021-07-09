const pieces = Array.from(document.getElementsByClassName("piece"));
const emptyPiece = document.querySelector(".empty");
const puzzle = document.querySelector(".puzzle");
const { forceGridAnimation } = animateCSSGrid.wrapGrid(puzzle);
const play = document.querySelector(".actions > button:first-child");

pieces.forEach((piece) => {
  piece.onclick = () => {
    const currentPosition = piece.style.getPropertyValue("--position");
    const emptyPosition = emptyPiece.style.getPropertyValue("--position");
    const coords = GetCoordinates(currentPosition, emptyPosition);

    const distance = CalculateDistance(...coords);
    if (distance > 1) return;

    emptyPiece.style.setProperty("--position", currentPosition);
    piece.style.setProperty("--position", emptyPosition);
    forceGridAnimation();
  };
});

play.onclick = () => {
  const RandomlyOrderedPieces = [...pieces].sort(() => Math.random() - 0.5);

  RandomlyOrderedPieces.forEach((piece, index) => {
    const row = Math.floor(index / 3) + 1;
    const column = (index % 3) + 1;
    const newPosition = ` P${row}${column}`;

    piece.style.setProperty("--position", newPosition);
    forceGridAnimation();
  });
};

function CalculateDistance(x1, y1, x2, y2) {
  const xDistance = Math.abs(x2 - x1);
  const yDistance = Math.abs(y2 - y1);
  return Math.hypot(xDistance, yDistance);
}

function GetCoordinates(position1, position2) {
  const coords = [
    position1[2],
    position1[3],
    position2[2],
    position2[3]
  ].map((coord) => Number(coord));
  return coords;
}