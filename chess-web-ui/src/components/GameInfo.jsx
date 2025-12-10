function GameInfo({ moveHistory, capturedPieces }) {
  const whiteCaptured = capturedPieces?.white || [];
  const blackCaptured = capturedPieces?.black || [];

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 h-[600px] flex flex-col">
      {/* Move History */}
      <div className="flex-1 mb-4 overflow-hidden flex flex-col">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          📜 Move History
        </h3>
        <div className="flex-1 bg-slate-900 rounded-xl p-4 overflow-y-auto border border-slate-700 shadow-inner">
          {moveHistory.length === 0 ? (
            <p className="text-slate-500 text-center italic py-4">No moves yet</p>
          ) : (
            <div className="space-y-1">
              {moveHistory.map((move, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded ${
                    index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'
                  } hover:bg-slate-700 transition-colors`}
                >
                  <span className="text-amber-500 font-bold w-8">{Math.floor(index / 2) + 1}.</span>
                  <span className="text-slate-300 font-mono">{move}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500" style={{ fontFamily: 'Playfair Display, serif' }}>
          ⚔️ Captured Pieces
        </h3>

        {/* Black Captured (taken by White) */}
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-700 shadow-inner">
          <p className="text-slate-400 text-sm mb-1">White captured:</p>
          <div className="flex flex-wrap gap-1">
            {blackCaptured.length === 0 ? (
              <span className="text-slate-600 text-sm italic">None</span>
            ) : (
              blackCaptured.map((piece, i) => (
                <span key={i} className="text-2xl drop-shadow-lg">{piece}</span>
              ))
            )}
          </div>
        </div>

        {/* White Captured (taken by Black) */}
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-700 shadow-inner">
          <p className="text-slate-400 text-sm mb-1">Black captured:</p>
          <div className="flex flex-wrap gap-1">
            {whiteCaptured.length === 0 ? (
              <span className="text-slate-600 text-sm italic">None</span>
            ) : (
              whiteCaptured.map((piece, i) => (
                <span key={i} className="text-2xl drop-shadow-lg">{piece}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameInfo;
