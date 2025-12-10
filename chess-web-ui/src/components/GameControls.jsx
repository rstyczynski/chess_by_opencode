import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api.js';
import ChessBoard from './ChessBoard.jsx';

// Game controls component
function GameControls({ gameState, onNewGame, onMove, isLoading }) {
  const [moveInput, setMoveInput] = useState('');

  const handleMoveSubmit = async (e) => {
    e.preventDefault();
    if (moveInput.trim() && !isLoading) {
      await onMove(moveInput.trim());
      setMoveInput('');
    }
  };

  const handleComputerMove = async () => {
    if (!isLoading && gameState.id) {
      await onMove('computer');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Game Status */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Game Controls</h3>
          {gameState.id && (
            <div className="space-y-2 text-sm">
              <p><strong>Game ID:</strong> {gameState.id}</p>
              <p><strong>Turn:</strong> {gameState.turn === 'w' ? 'White' : 'Black'}</p>
              {gameState.lastMove && <p><strong>Last Move:</strong> {gameState.lastMove}</p>}
              {gameState.outcome && <p className="text-red-600 font-bold"><strong>Game Over:</strong> {gameState.outcome}</p>}
            </div>
          )}
        </div>

        {/* Move Input */}
        {gameState.id && gameState.turn === 'w' && (
          <form onSubmit={handleMoveSubmit} className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Move (algebraic notation):
              </label>
              <input
                type="text"
                value={moveInput}
                onChange={(e) => setMoveInput(e.target.value)}
                placeholder="e.g., e4, Nf3, O-O"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !moveInput.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Making Move...' : 'Make Move'}
            </button>
          </form>
        )}

        {/* Computer Move Button */}
        {gameState.id && gameState.turn === 'b' && (
          <button
            onClick={handleComputerMove}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Thinking...' : 'Get Computer Move'}
          </button>
        )}

        {/* New Game Button */}
        <button
          onClick={onNewGame}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          New Game
        </button>

        {/* Valid Moves Display */}
        {gameState.validMoves && gameState.validMoves.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Valid Moves:</h4>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {gameState.validMoves.map((move, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded text-center"
                >
                  {move}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameControls;