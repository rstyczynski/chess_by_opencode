import { useState } from 'react';

const PIECE_MAP = {
  '♔': '♔', '♕': '♕', '♖': '♖', '♗': '♗', '♘': '♘', '♙': '♙',
  '♚': '♚', '♛': '♛', '♜': '♜', '♝': '♝', '♞': '♞', '♟': '♟'
};

function ChessBoard({ board, onSquareClick, selectedSquare, validMoves, lastMove }) {
  const parseBoard = (boardString) => {
    if (!boardString) return Array(8).fill(Array(8).fill(' '));
    const lines = boardString.split('\n').filter(line => line.trim() && !line.includes('abcdefgh'));
    const squares = [];
    for (let i = 0; i < Math.min(8, lines.length); i++) {
      const row = [];
      const chars = lines[i].split('').filter(c => Object.keys(PIECE_MAP).includes(c) || c === ' ' || c === '.');
      for (let j = 0; j < 8; j++) {
        row.push(chars[j] || ' ');
      }
      squares.push(row);
    }
    return squares;
  };

  const squares = parseBoard(board);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getSquareName = (row, col) => {
    return `${files[col]}${ranks[row]}`;
  };

  const isLightSquare = (row, col) => (row + col) % 2 === 0;

  const isValidMove = (row, col) => {
    const square = getSquareName(row, col);
    return validMoves?.includes(square);
  };

  const isLastMove = (row, col) => {
    const square = getSquareName(row, col);
    return lastMove?.includes(square);
  };

  const isSelected = (row, col) => {
    const square = getSquareName(row, col);
    return selectedSquare === square;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-2xl">
      <div className="grid grid-cols-8 gap-0 w-[400px] h-[400px] md:w-[480px] md:h-[480px] border-4 border-amber-900">
        {squares.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const squareName = getSquareName(rowIndex, colIndex);
            const isLight = isLightSquare(rowIndex, colIndex);
            const isValid = isValidMove(rowIndex, colIndex);
            const isLast = isLastMove(rowIndex, colIndex);
            const isSelectedSq = isSelected(rowIndex, colIndex);

            let bgColor = isLight ? 'bg-amber-100' : 'bg-amber-700';
            if (isSelectedSq) bgColor = 'bg-blue-400';
            else if (isValid) bgColor = 'bg-green-400';
            else if (isLast) bgColor = 'bg-yellow-300';

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${bgColor} flex items-center justify-center text-4xl md:text-5xl cursor-pointer hover:opacity-80 transition-opacity relative`}
                onClick={() => onSquareClick(squareName)}
              >
                {piece !== ' ' && piece !== '.' ? PIECE_MAP[piece] || piece : ''}
                <span className="absolute bottom-0 right-1 text-xs text-gray-500">
                  {squareName}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChessBoard;
