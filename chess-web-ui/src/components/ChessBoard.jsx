import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api.js';

// Chess piece Unicode symbols
const PIECES = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
  '.': '-',
};

// Chess board component
function ChessBoard({ gameState, onMove, isLoading }) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  useEffect(() => {
    if (gameState.validMoves) {
      setValidMoves(gameState.validMoves);
    }
  }, [gameState]);

  const handleSquareClick = async (square) => {
    if (isLoading || !gameState.id) return;

    // Check if it's a valid move
    if (validMoves.includes(square)) {
      await onMove(square);
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  const renderBoard = () => {
    const board = gameState.board || '';
    const lines = board.split('\n').filter(line => line.trim());
    
    return lines.map((line, rowIndex) => {
      const squares = line.split('').filter(char => char.trim());
      
      return (
        <div key={rowIndex} className="flex justify-center">
          {squares.map((square, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 1;
            const isValidMove = validMoves.includes(square);
            const isSelected = selectedSquare === square;
            
            let piece = PIECES[square] || '';
            if (square === '.' && isLight) {
              piece = <div className="w-8 h-8 bg-green-200"></div>;
            } else if (square === '.' && !isLight) {
              piece = <div className="w-8 h-8 bg-green-300"></div>;
            } else if (square !== '.') {
              piece = (
                <div className={`text-4xl ${isSelected ? 'text-yellow-400' : ''} ${isValidMove ? 'text-blue-400' : ''}`}>
                  {piece}
                </div>
              );
            }
            
            return (
              <div 
                key={colIndex}
                className={`w-12 h-12 border border-gray-400 flex items-center justify-center cursor-pointer
                  ${isLight ? 'bg-green-200' : 'bg-green-300'}
                  ${isSelected ? 'ring-2 ring-yellow-400' : ''}
                  ${isValidMove ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => handleSquareClick(square)}
              >
                {piece}
              </div>
            );
          })}
        </div>
      );
    });
  };

  if (!gameState.id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Start a new game to begin playing</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">Chess Game</h2>
        {gameState.id && <p className="text-sm text-gray-600">Game ID: {gameState.id}</p>}
        {gameState.turn && <p className="text-sm text-gray-600">Turn: {gameState.turn === 'w' ? 'White' : 'Black'}</p>}
        {gameState.lastMove && <p className="text-sm text-gray-600">Last Move: {gameState.lastMove}</p>}
        {gameState.outcome && <p className="text-lg font-bold text-red-600">Game Over: {gameState.outcome}</p>}
      </div>
      
      <div className="border-2 border-gray-800 inline-block">
        {renderBoard()}
      </div>
      
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-l-2 border-gray-900"></div>
          <p className="ml-2 text-gray-600">Thinking...</p>
        </div>
      )}
    </div>
  );
}

export default ChessBoard;