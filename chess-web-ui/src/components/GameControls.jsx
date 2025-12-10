function GameControls({ gameId, turn, outcome, onNewGame, onComputerMove, loading }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-amber-700">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-6xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Cinzel, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          ♔ ROYAL CHESS ♔
        </h1>
        <p className="text-amber-700 text-lg font-semibold italic">A sophisticated chess experience</p>
      </div>

      {gameId && (
        <div className="space-y-4">
          {/* Game Status */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-2xl border-2 border-amber-400 shadow-lg">
            <div className="text-center">
              <p className="text-amber-800 text-sm uppercase tracking-wider font-bold mb-2">Current Turn</p>
              <p className="text-5xl font-bold text-amber-900">
                {turn}
              </p>
              {outcome && (
                <div className="mt-4 pt-4 border-t-2 border-amber-300">
                  <p className="text-3xl font-bold text-green-700">
                    🏆 {outcome}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onComputerMove}
              disabled={loading || outcome}
              className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-5 px-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 border-2 border-blue-800"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🤖</span> AI Move
                </span>
              )}
            </button>

            <button
              onClick={onNewGame}
              disabled={loading}
              className="bg-gradient-to-br from-amber-600 to-amber-700 text-white py-5 px-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 border-2 border-amber-800"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">🔄</span> New Game
              </span>
            </button>
          </div>
        </div>
      )}

      {!gameId && !loading && (
        <button
          onClick={onNewGame}
          className="w-full bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-8 px-8 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-4 border-green-800"
        >
          <span className="flex items-center justify-center gap-4">
            <span className="text-4xl">♔</span>
            Start New Game
            <span className="text-4xl">♚</span>
          </span>
        </button>
      )}

      {loading && !gameId && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-4 text-amber-900">
            <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-2xl font-bold">Creating game...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameControls;
