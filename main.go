package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/corentings/chess/v2"
	"github.com/corentings/chess/v2/uci"
)

type Game struct {
	chessGame *chess.Game
	engine    *uci.Engine
}

func main() {
	game := &Game{}

	// Initialize game
	if err := game.initialize(); err != nil {
		fmt.Printf("Error initializing game: %v\n", err)
		fmt.Println("Make sure Stockfish is installed and available in PATH")
		os.Exit(1)
	}
	defer game.cleanup()

	// Main game loop
	game.play()
}

func (g *Game) initialize() error {
	// Initialize chess game
	g.chessGame = chess.NewGame()

	// Initialize UCI engine (Stockfish)
	engine, err := uci.New("stockfish")
	if err != nil {
		return fmt.Errorf("failed to initialize Stockfish engine: %w", err)
	}
	g.engine = engine

	return nil
}

func (g *Game) cleanup() {
	if g.engine != nil {
		g.engine.Close()
	}
}

func (g *Game) play() {
	fmt.Println("=== Chess CLI ===")
	fmt.Println("Enter moves in standard algebraic notation (e.g., e4, Nf3, O-O)")
	fmt.Println("Type 'quit' to exit, 'help' for commands")
	fmt.Println()

	for {
		// Display board
		g.displayBoard()

		// Check game state
		if outcome := g.chessGame.Outcome(); outcome != chess.NoOutcome {
			g.displayGameEnd(outcome)
			return
		}

		// Human move
		if g.chessGame.Position().Turn() == chess.White {
			if !g.getHumanMove() {
				return
			}
		} else {
			// Computer move (Black)
			g.getComputerMove()
		}
	}
}

func (g *Game) displayBoard() {
	fmt.Println("\nCurrent Position:")
	board := g.chessGame.Position().Board()
	fmt.Println(board.Draw())

	// Display game status
	fmt.Printf("\nTurn: %s\n", g.chessGame.Position().Turn().String())

	// Show last move if any
	moves := g.chessGame.Moves()
	if len(moves) > 0 {
		lastMove := moves[len(moves)-1]
		fmt.Printf("Last move: %s\n", lastMove.String())
	}

	fmt.Println(strings.Repeat("-", 50))
}

func (g *Game) getHumanMove() bool {
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("Your move (White): ")
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Printf("Error reading input: %v\n", err)
			continue
		}

		input = strings.TrimSpace(input)

		// Handle commands
		switch strings.ToLower(input) {
		case "quit":
			fmt.Println("Game ended by user.")
			return false
		case "help":
			g.showHelp()
			continue
		case "moves":
			g.showValidMoves()
			continue
		}

		// Try to make the move
		if err := g.makeMove(input); err != nil {
			fmt.Printf("Invalid move: %v\n", err)
			fmt.Println("Try again or type 'help' for commands")
			continue
		}

		break
	}

	return true
}

func (g *Game) makeMove(moveStr string) error {
	// Validate move format and execute
	err := g.chessGame.PushNotationMove(moveStr, chess.AlgebraicNotation{}, nil)
	if err != nil {
		return fmt.Errorf("invalid move: %w", err)
	}

	fmt.Printf("Move played: %s\n", moveStr)
	return nil
}

func (g *Game) getComputerMove() {
	fmt.Println("Computer is thinking...")

	// Get valid moves
	validMoves := g.chessGame.ValidMoves()
	if len(validMoves) == 0 {
		return
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
		fmt.Printf("Engine error: %v\n", err)
		// Fallback to random valid move
		g.makeRandomMove(validMoves)
		return
	}

	// Get the best move from engine
	searchResults := g.engine.SearchResults()
	if searchResults.BestMove == nil {
		fmt.Println("Engine couldn't find a move, using random move")
		g.makeRandomMove(validMoves)
		return
	}

	// Convert UCI move to chess move and execute
	uciMove := searchResults.BestMove.String()

	// Find the corresponding chess move
	for _, move := range validMoves {
		if move.String() == uciMove {
			if err := g.chessGame.Move(&move, nil); err != nil {
				fmt.Printf("Error executing computer move: %v\n", err)
				g.makeRandomMove(validMoves)
				return
			}
			fmt.Printf("Computer plays: %s\n", move.String())
			return
		}
	}

	// If no matching move found, use random move
	fmt.Println("Engine move not valid, using random move")
	g.makeRandomMove(validMoves)
}

func (g *Game) makeRandomMove(validMoves []chess.Move) {
	if len(validMoves) == 0 {
		return
	}

	// Simple random selection
	move := validMoves[rand.Intn(len(validMoves))]
	if err := g.chessGame.Move(&move, nil); err != nil {
		fmt.Printf("Error making random move: %v\n", err)
		return
	}
	fmt.Printf("Computer plays (random): %s\n", move.String())
}

func (g *Game) displayGameEnd(outcome chess.Outcome) {
	fmt.Println("\n=== GAME OVER ===")
	switch outcome {
	case chess.WhiteWon:
		fmt.Println("White wins!")
	case chess.BlackWon:
		fmt.Println("Black wins!")
	default:
		fmt.Println("Draw!")
	}

	method := g.chessGame.Method()
	if method != chess.NoMethod {
		fmt.Printf("By %s\n", method.String())
	}
}

func (g *Game) showHelp() {
	fmt.Println("\n=== Help ===")
	fmt.Println("Commands:")
	fmt.Println("  <move>  - Enter a move in algebraic notation (e.g., e4, Nf3, O-O)")
	fmt.Println("  moves   - Show all valid moves")
	fmt.Println("  help    - Show this help message")
	fmt.Println("  quit    - Exit the game")
	fmt.Println("\nMove notation examples:")
	fmt.Println("  Pawn moves: e4, d5, a3")
	fmt.Println("  Piece moves: Nf3 (Knight to f3), Bb5 (Bishop to b5)")
	fmt.Println("  Captures: exd5, Nxf3")
	fmt.Println("  Castling: O-O (kingside), O-O-O (queenside)")
	fmt.Println("  Promotion: e8=Q (pawn to queen)")
}

func (g *Game) showValidMoves() {
	validMoves := g.chessGame.ValidMoves()
	fmt.Printf("\nValid moves (%d):\n", len(validMoves))

	for i, move := range validMoves {
		fmt.Printf("  %s", move.String())
		if (i+1)%8 == 0 {
			fmt.Println()
		}
	}

	if len(validMoves)%8 != 0 {
		fmt.Println()
	}
}
