import React, { useState, useEffect } from 'react';
import { apiClient } from './services/api.js';
import ChessBoard from './components/ChessBoard.jsx';
import GameControls from './components/GameControls.jsx';

// Main App component
function App() {
  const [gameState, setGameState] = useState({
    id: null,
    board: '',
    turn: 'w',
    lastMove: '',
    outcome: '',
    validMoves: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Create new game
  const createNewGame = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.createGame();
      if (response.success) {
        setGameState(response.data);
      } else {
        alert('Failed to create game: ' + response.error);
      }
    } catch (error) {
      alert('Error creating game: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Make move
  const makeMove = async (move) => {
    setIsLoading(true);
    try {
      let response;
      
      if (move === 'computer') {
        response = await apiClient.getComputerMove(gameState.id);
      } else {
        response = await apiClient.makeMove(gameState.id, move);
      }
      
      if (response.success) {
        if (move === 'computer') {
          setGameState(response.data.gameState);
        } else {
          // Refresh game state after making move
          const gameResponse = await apiClient.getGame(gameState.id);
          if (gameResponse.success) {
            setGameState(gameResponse.data);
          }
        }
      } else {
        alert('Failed to make move: ' + response.error);
      }
    } catch (error) {
      alert('Error making move: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh game state periodically
  useEffect(() => {
    if (!gameState.id) return;

    const interval = setInterval(async () => {
      try {
        const response = await apiClient.getGame(gameState.id);
        if (response.success) {
          setGameState(response.data);
        }
      } catch (error) {
        console.error('Error refreshing game state:', error);
      }
    }, 2000); // Refresh every 2 seconds

    return () => clearInterval(interval);
  }, [gameState.id]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Chess Web UI</h1>
          <p className="text-gray-600">Play chess against computer in your browser</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chess Board */}
          <div className="flex justify-center">
            <ChessBoard 
              gameState={gameState}
              onMove={makeMove}
              isLoading={isLoading}
            />
          </div>

          {/* Game Controls */}
          <div className="flex justify-center">
            <GameControls 
              gameState={gameState}
              onNewGame={createNewGame}
              onMove={makeMove}
              isLoading={isLoading}
            />
          </div>
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React, Vite, and Tailwind CSS</p>
          <p>Powered by Chess REST API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
