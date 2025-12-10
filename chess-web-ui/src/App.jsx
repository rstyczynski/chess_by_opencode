import { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import GameControls from './components/GameControls';
import GameInfo from './components/GameInfo';
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
  const [moveHistory, setMoveHistory] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });

  const mapTurn = (turn) => {
    if (turn === 'w' || turn === 'White') return 'White';
    if (turn === 'b' || turn === 'Black') return 'Black';
    return turn;
  };

  const handleNewGame = async () => {
    try {
      setLoading(true);
      setError(null);
      const game = await api.createGame();
      setGameId(game.id);
      setBoard(game.board);
      setTurn(mapTurn(game.turn));
      setOutcome(null);
      setSelectedSquare(null);
      setValidMoves([]);
      setLastMove(null);
      setMoveHistory([]);
      setCapturedPieces({ white: [], black: [] });
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
      setTurn(mapTurn(state.turn));
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
        setMoveHistory(prev => [...prev, move]);
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
      const result = await api.getComputerMove(gameId);
      if (result.move) {
        setMoveHistory(prev => [...prev, result.move]);
      }
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
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {!gameId ? (
          // Landing page - centered controls
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <GameControls
                gameId={gameId}
                turn={turn}
                outcome={outcome}
                onNewGame={handleNewGame}
                onComputerMove={handleComputerMove}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          // Game in progress - 3-column layout
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Game Controls */}
            <div className="lg:col-span-3">
              <GameControls
                gameId={gameId}
                turn={turn}
                outcome={outcome}
                onNewGame={handleNewGame}
                onComputerMove={handleComputerMove}
                loading={loading}
              />
            </div>

            {/* Center - Chess Board */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <ChessBoard
                board={board}
                onSquareClick={handleSquareClick}
                selectedSquare={selectedSquare}
                validMoves={validMoves}
                lastMove={lastMove}
              />
            </div>

            {/* Right Panel - Game Info */}
            <div className="lg:col-span-3">
              <GameInfo
                moveHistory={moveHistory}
                capturedPieces={capturedPieces}
              />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-gradient-to-r from-red-900 to-red-800 border-2 border-red-600 text-red-100 px-6 py-4 rounded-xl shadow-2xl">
            <p className="font-bold text-lg mb-1">⚠️ Error</p>
            <p className="mb-2">{error}</p>
            <p className="text-sm text-red-300">Make sure the API server is running on localhost:8080</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
