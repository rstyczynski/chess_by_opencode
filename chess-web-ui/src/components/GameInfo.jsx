function GameInfo({ moveHistory, capturedPieces }) {
  const whiteCaptured = capturedPieces?.white || [];
  const blackCaptured = capturedPieces?.black || [];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-amber-700 h-[660px] flex flex-col">
      {/* Move History */}
      <div className="flex-1 mb-6 overflow-hidden flex flex-col">
        <h3 className="text-3xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
          📜 Move History
        </h3>
        <div className="flex-1 bg-amber-50 rounded-2xl p-4 overflow-y-auto border-2 border-amber-300 shadow-inner">
          {moveHistory.length === 0 ? (
            <p className="text-amber-600 text-center italic py-8 text-lg font-semibold">No moves yet</p>
          ) : (
            <div className="space-y-2">
              {moveHistory.map((move, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    index % 2 === 0 ? 'bg-white' : 'bg-amber-100'
                  } shadow-sm border border-amber-200`}
                >
                  <span className="text-amber-800 font-bold text-lg w-10">{Math.floor(index / 2) + 1}.</span>
                  <span className="text-gray-900 font-mono text-lg font-semibold">{move}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Cinzel, serif' }}>
          ⚔️ Captured
        </h3>

        {/* Black Captured */}
        <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300 shadow-inner">
          <p className="text-amber-800 text-sm font-bold mb-2 uppercase">White captured:</p>
          <div className="flex flex-wrap gap-2">
            {blackCaptured.length === 0 ? (
              <span className="text-amber-500 italic">None</span>
            ) : (
              blackCaptured.map((piece, i) => (
                <span key={i} className="text-3xl drop-shadow-lg">{piece}</span>
              ))
            )}
          </div>
        </div>

        {/* White Captured */}
        <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300 shadow-inner">
          <p className="text-amber-800 text-sm font-bold mb-2 uppercase">Black captured:</p>
          <div className="flex flex-wrap gap-2">
            {whiteCaptured.length === 0 ? (
              <span className="text-amber-500 italic">None</span>
            ) : (
              whiteCaptured.map((piece, i) => (
                <span key={i} className="text-3xl drop-shadow-lg">{piece}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameInfo;
