function GameControls({ gameId, turn, outcome, onNewGame, onComputerMove, loading }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          ♔ Royal Chess ♔
        </h1>
        <p className="text-slate-400 text-sm italic">A sophisticated chess experience</p>
      </div>

      {gameId && (
        <div className="space-y-4">
          {/* Game Status */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-xl border border-slate-600 shadow-lg">
            <div className="text-center">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Current Turn</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
                {turn}
              </p>
              {outcome && (
                <div className="mt-3 pt-3 border-t border-slate-600">
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    🏆 {outcome}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onComputerMove}
              disabled={loading || outcome}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 border border-blue-500"
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>

            <button
              onClick={onNewGame}
              disabled={loading}
              className="group relative overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 border border-amber-500"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-2xl">🔄</span> New Game
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </div>
      )}

      {!gameId && !loading && (
        <button
          onClick={onNewGame}
          className="group relative w-full overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-6 px-8 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-2 border-green-500"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-3xl">♔</span>
            Start New Game
            <span className="text-3xl">♚</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-30 transition-opacity"></div>
        </button>
      )}

      {loading && !gameId && (
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-3 text-amber-400">
            <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-semibold">Creating game...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameControls;
