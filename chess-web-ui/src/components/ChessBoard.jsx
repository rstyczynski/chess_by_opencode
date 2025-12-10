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

  const getSquareName = (row, col) => {
    return `${files[col]}${ranks[row]}`;
  };

  const isLightSquare = (row, col) => (row + col) % 2 === 0;

  const isValidMove = (row, col) => {
    const square = getSquareName(row, col);
    return validMoves?.includes(square);
  };

  const isLastMove = (row, col) => {
    const square = getSquareName(row, col);
    return lastMove?.includes(square);
  };

  const isSelected = (row, col) => {
    const square = getSquareName(row, col);
    return selectedSquare === square;
  };

  return (
    <div className="relative">
      {/* Board Container with wooden frame effect */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-6 rounded-2xl shadow-2xl">
        {/* Board Coordinates - Ranks (Left) */}
        <div className="absolute left-2 top-6 flex flex-col justify-around h-[480px] text-amber-200 font-bold text-sm">
          {ranks.map(rank => (
            <div key={rank} className="h-[60px] flex items-center">{rank}</div>
          ))}
        </div>

        {/* Board Coordinates - Files (Bottom) */}
        <div className="absolute bottom-2 left-6 flex justify-around w-[480px] text-amber-200 font-bold text-sm">
          {files.map(file => (
            <div key={file} className="w-[60px] flex justify-center">{file}</div>
          ))}
        </div>

        {/* Chessboard */}
        <div className="grid grid-cols-8 gap-0 w-[480px] h-[480px] border-4 border-amber-950 rounded-lg overflow-hidden shadow-inner relative">
          {squares.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const squareName = getSquareName(rowIndex, colIndex);
              const isLight = isLightSquare(rowIndex, colIndex);
              const isValid = isValidMove(rowIndex, colIndex);
              const isLast = isLastMove(rowIndex, colIndex);
              const isSelectedSq = isSelected(rowIndex, colIndex);

              // Elegant square colors
              let bgColor = isLight
                ? 'bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-100'
                : 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900';

              if (isSelectedSq) {
                bgColor = 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 ring-4 ring-blue-300';
              } else if (isValid) {
                bgColor = 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 ring-2 ring-green-300';
              } else if (isLast) {
                bgColor = 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500';
              }

              const hasPiece = piece !== ' ' && piece !== '.' && piece !== '-';

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${bgColor} flex items-center justify-center text-5xl cursor-pointer hover:brightness-110 transition-all duration-200 relative group ${hasPiece ? 'hover:scale-105' : ''}`}
                  onClick={() => onSquareClick(squareName)}
                  style={{
                    boxShadow: isSelectedSq || isValid ? 'inset 0 2px 8px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  {hasPiece && (
                    <span
                      className="drop-shadow-lg filter"
                      style={{
                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
                        textShadow: '1px 1px 2px rgba(255,255,255,0.3)',
                      }}
                    >
                      {PIECE_MAP[piece] || piece}
                    </span>
                  )}

                  {/* Valid move indicator dot */}
                  {isValid && !hasPiece && (
                    <div className="absolute w-4 h-4 bg-green-700 rounded-full opacity-60"></div>
                  )}

                  {/* Square coordinate tooltip on hover */}
                  <span className="absolute bottom-0.5 right-1 text-[8px] opacity-30 group-hover:opacity-60 font-mono">
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
