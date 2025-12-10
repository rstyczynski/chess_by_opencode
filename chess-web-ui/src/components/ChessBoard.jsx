const PIECE_MAP = {
  '♔': '♔', '♕': '♕', '♖': '♖', '♗': '♗', '♘': '♘', '♙': '♙',
  '♚': '♚', '♛': '♛', '♜': '♜', '♝': '♝', '♞': '♞', '♟': '♟'
};

function ChessBoard({ board, onSquareClick, selectedSquare, validMoves, lastMove }) {
  const parseBoard = (boardString) => {
    if (!boardString) return Array(8).fill(Array(8).fill(' '));
    const lines = boardString.split('\n').filter(line => line.trim() && !line.includes('abcdefgh') && !line.includes('ABCDEFGH'));
    const squares = [];
    for (let i = 0; i < Math.min(8, lines.length); i++) {
      const row = [];
      const chars = lines[i].split('').filter(c => Object.keys(PIECE_MAP).includes(c) || c === ' ' || c === '.' || c === '-');
      for (let j = 0; j < 8; j++) {
        const char = chars[j] || ' ';
        row.push(char === '-' || char === '.' ? ' ' : char);
      }
      squares.push(row);
    }
    return squares;
  };

  const squares = parseBoard(board);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getSquareName = (row, col) => `${files[col]}${ranks[row]}`;
  const isLightSquare = (row, col) => (row + col) % 2 === 0;
  const isValidMove = (row, col) => validMoves?.includes(getSquareName(row, col));
  const isLastMove = (row, col) => lastMove?.includes(getSquareName(row, col));
  const isSelected = (row, col) => selectedSquare === getSquareName(row, col);

  return (
    <div className="relative">
      {/* Wooden Frame */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-8 rounded-3xl shadow-2xl" style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
      }}>

        {/* Rank Labels (Left) */}
        <div className="absolute left-2 top-8 flex flex-col justify-around h-[520px] text-amber-200 font-bold text-lg">
          {ranks.map(rank => (
            <div key={rank} className="h-[65px] flex items-center">{rank}</div>
          ))}
        </div>

        {/* File Labels (Bottom) */}
        <div className="absolute bottom-2 left-8 flex justify-around w-[520px] text-amber-200 font-bold text-lg">
          {files.map(file => (
            <div key={file} className="w-[65px] flex justify-center uppercase">{file}</div>
          ))}
        </div>

        {/* Chessboard */}
        <div className="grid grid-cols-8 gap-0 w-[520px] h-[520px] border-8 border-amber-950 rounded-xl overflow-hidden shadow-2xl">
          {squares.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const squareName = getSquareName(rowIndex, colIndex);
              const isLight = isLightSquare(rowIndex, colIndex);
              const isValid = isValidMove(rowIndex, colIndex);
              const isLast = isLastMove(rowIndex, colIndex);
              const isSelectedSq = isSelected(rowIndex, colIndex);

              // LIGHT board colors for visibility
              let bgColor, textColor;

              if (isSelectedSq) {
                bgColor = 'bg-blue-400';
                textColor = 'text-gray-900';
              } else if (isValid) {
                bgColor = 'bg-green-400';
                textColor = 'text-gray-900';
              } else if (isLast) {
                bgColor = 'bg-yellow-300';
                textColor = 'text-gray-900';
              } else if (isLight) {
                bgColor = 'bg-amber-50';
                textColor = 'text-gray-900';
              } else {
                bgColor = 'bg-amber-600';
                textColor = 'text-gray-100';
              }

              const hasPiece = piece !== ' ' && piece !== '.' && piece !== '-';

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${bgColor} ${textColor} flex items-center justify-center text-6xl cursor-pointer hover:brightness-110 transition-all duration-150 relative group`}
                  onClick={() => onSquareClick(squareName)}
                >
                  {hasPiece && (
                    <span
                      className="font-bold"
                      style={{
                        filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.7))',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {PIECE_MAP[piece]}
                    </span>
                  )}

                  {/* Valid move dot */}
                  {isValid && !hasPiece && (
                    <div className="absolute w-5 h-5 bg-green-700 rounded-full shadow-lg"></div>
                  )}

                  {/* Coordinate label */}
                  <span className="absolute bottom-1 right-1.5 text-xs opacity-40 group-hover:opacity-70 font-mono font-semibold">
                    {squareName}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;
