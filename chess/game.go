package chess

import (
	"fmt"
	"time"

	"github.com/corentings/chess/v2"
	"github.com/corentings/chess/v2/uci"
)

// Game wraps the chess.Game with additional metadata
type Game struct {
	chessGame *chess.Game
	engine    *uci.Engine
}

// NewGame creates a new chess game with UCI engine
func NewGame() (*Game, error) {
	chessGame := chess.NewGame()

	// Initialize UCI engine (Stockfish)
	engine, err := uci.New("stockfish")
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Stockfish engine: %w", err)
	}

	return &Game{
		chessGame: chessGame,
		engine:    engine,
	}, nil
}

// Close cleans up the UCI engine
func (g *Game) Close() {
	if g.engine != nil {
		g.engine.Close()
	}
}

// GetPosition returns the current board position as string
func (g *Game) GetPosition() string {
	board := g.chessGame.Position().Board()
	return board.Draw()
}

// GetTurn returns whose turn it is
func (g *Game) GetTurn() string {
	return g.chessGame.Position().Turn().String()
}

// GetLastMove returns the last move made
func (g *Game) GetLastMove() string {
	moves := g.chessGame.Moves()
	if len(moves) > 0 {
		return moves[len(moves)-1].String()
	}
	return ""
}

// GetOutcome returns the game outcome
func (g *Game) GetOutcome() string {
	outcome := g.chessGame.Outcome()
	if outcome != chess.NoOutcome {
		return outcome.String()
	}
	return ""
}

// GetValidMoves returns all valid moves for current position
func (g *Game) GetValidMoves() []string {
	validMoves := g.chessGame.ValidMoves()
	moves := make([]string, len(validMoves))
	for i, move := range validMoves {
		moves[i] = move.String()
	}
	return moves
}

// MakeMove executes a move in algebraic notation
func (g *Game) MakeMove(moveStr string) error {
	err := g.chessGame.PushNotationMove(moveStr, chess.AlgebraicNotation{}, nil)
	if err != nil {
		return fmt.Errorf("invalid move: %w", err)
	}
	return nil
}

// GetComputerMove gets a move from the UCI engine
func (g *Game) GetComputerMove() (string, error) {
	validMoves := g.chessGame.ValidMoves()
	if len(validMoves) == 0 {
		return "", fmt.Errorf("no valid moves available")
	}

	// Use UCI engine to get best move
	cmdPos := &uci.CmdPosition{
		Position: g.chessGame.Position(),
	}

	cmdGo := &uci.CmdGo{
		MoveTime: time.Second * 2, // Think for 2 seconds
	}

	// Set position and get move
	if err := g.engine.Run(cmdPos, cmdGo); err != nil {
		return "", fmt.Errorf("engine error: %w", err)
	}

	// Get the best move from engine
	searchResults := g.engine.SearchResults()
	if searchResults.BestMove == nil {
		return "", fmt.Errorf("engine couldn't find a move")
	}

	return searchResults.BestMove.String(), nil
}

// MakeComputerMove executes a computer move
func (g *Game) MakeComputerMove() (string, error) {
	move, err := g.GetComputerMove()
	if err != nil {
		return "", err
	}

	// Convert UCI move to chess move and execute
	validMoves := g.chessGame.ValidMoves()
	for _, validMove := range validMoves {
		if validMove.String() == move {
			if err := g.chessGame.Move(&validMove, nil); err != nil {
				return "", fmt.Errorf("error executing computer move: %w", err)
			}
			return move, nil
		}
	}

	return "", fmt.Errorf("engine move not valid")
}
