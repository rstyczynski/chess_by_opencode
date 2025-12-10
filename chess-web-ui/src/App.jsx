import { useState, useEffect } from 'react';
import ChessBoard from './components/ChessBoard';
import GameControls from './components/GameControls';
import * as api from './services/api';

function App() {
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState('');
  const [turn, setTurn] = useState('White');
  const [outcome, setOutcome] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNewGame = async () => {
    try {
      setLoading(true);
      setError(null);
      const game = await api.createGame();
      setGameId(game.id);
      setBoard(game.board);
      setTurn(game.turn);
      setOutcome(null);
      setSelectedSquare(null);
      setValidMoves([]);
      setLastMove(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to create game:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshGameState = async () => {
    if (!gameId) return;
    try {
      const state = await api.getGameState(gameId);
      setBoard(state.board);
      setTurn(state.turn);
      setOutcome(state.outcome || null);
      setLastMove(state.last_move);
    } catch (err) {
      setError(err.message);
      console.error('Failed to refresh game state:', err);
    }
  };

  const handleSquareClick = async (square) => {
    if (!gameId || outcome || loading) return;

    if (!selectedSquare) {
      // First click - select piece
      setSelectedSquare(square);
      try {
        const moves = await api.getValidMoves(gameId);
        // Filter moves from this square
        const movesFromSquare = moves.moves?.filter(m => m.startsWith(square.toLowerCase())) || [];
        setValidMoves(movesFromSquare.map(m => m.substring(2, 4))); // Extract destination squares
      } catch (err) {
        console.error('Failed to get valid moves:', err);
        setValidMoves([]);
      }
    } else {
      // Second click - make move
      const move = `${selectedSquare}${square}`.toLowerCase();
      try {
        setLoading(true);
        await api.makeMove(gameId, move);
        await refreshGameState();
        setSelectedSquare(null);
        setValidMoves([]);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSelectedSquare(null);
        setValidMoves([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleComputerMove = async () => {
    if (!gameId || outcome || loading) return;
    try {
      setLoading(true);
      setError(null);
      await api.getComputerMove(gameId);
      await refreshGameState();
      setSelectedSquare(null);
      setValidMoves([]);
    } catch (err) {
      setError(err.message);
      console.error('Failed to get computer move:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-4">
        <GameControls
          gameId={gameId}
          turn={turn}
          outcome={outcome}
          onNewGame={handleNewGame}
          onComputerMove={handleComputerMove}
          loading={loading}
        />

        {gameId && (
          <ChessBoard
            board={board}
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            validMoves={validMoves}
            lastMove={lastMove}
          />
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <p className="text-sm mt-1">Make sure the API server is running on localhost:8080</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
