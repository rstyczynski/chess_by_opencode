function GameControls({ gameId, turn, outcome, onNewGame, onComputerMove, loading }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl space-y-4 w-[400px] md:w-[480px]">
      <h1 className="text-3xl font-bold text-center text-amber-900">
        ♔ Chess Game ♔
      </h1>

      {gameId && (
        <div className="space-y-2">
          <div className="text-center">
            <p className="text-lg font-semibold">
              Turn: <span className="text-blue-600">{turn}</span>
            </p>
            {outcome && (
              <p className="text-xl font-bold text-green-600 mt-2">
                {outcome}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onComputerMove}
              disabled={loading || outcome}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Thinking...' : 'AI Move'}
            </button>

            <button
              onClick={onNewGame}
              disabled={loading}
              className="flex-1 bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              New Game
            </button>
          </div>
        </div>
      )}

      {!gameId && !loading && (
        <button
          onClick={onNewGame}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors"
        >
          Start New Game
        </button>
      )}

      {loading && !gameId && (
        <div className="text-center text-gray-600">Creating game...</div>
      )}
    </div>
  );
}

export default GameControls;
