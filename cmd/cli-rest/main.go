package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

// APIResponse represents a generic API response
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// GameState represents the current game state
type GameState struct {
	ID         string   `json:"id"`
	Board      string   `json:"board"`
	Turn       string   `json:"turn"`
	LastMove   string   `json:"last_move,omitempty"`
	Outcome    string   `json:"outcome,omitempty"`
	ValidMoves []string `json:"valid_moves,omitempty"`
}

// ComputerMoveResponse represents response from computer move endpoint
type ComputerMoveResponse struct {
	Move      string    `json:"move"`
	GameState GameState `json:"gameState"`
}

const (
	apiBaseURL = "http://localhost:8080/api/v1"
)

func main() {
	gameID := ""

	fmt.Println("=== Chess CLI (REST) ===")
	fmt.Println("Enter moves in standard algebraic notation (e.g., e4, Nf3, O-O)")
	fmt.Println("Type 'new' to start a new game, 'quit' to exit, 'help' for commands")
	fmt.Println()

	for {
		// Display board if we have an active game
		if gameID != "" {
			displayGame(gameID)
		}

		// Check game state
		if gameID != "" {
			if outcome := checkGameEnd(gameID); outcome != "" {
				fmt.Printf("\n=== GAME OVER ===\n")
				fmt.Printf("%s\n", outcome)
				gameID = ""
				continue
			}
		}

		// Get user input
		reader := bufio.NewReader(os.Stdin)
		fmt.Print("Your move: ")
		input, err := reader.ReadString('\n')
		if err != nil {
			// Handle EOF gracefully
			if err.Error() == "EOF" {
				fmt.Println("\nGame ended - input stream closed.")
				return
			}
			fmt.Printf("Error reading input: %v\n", err)
			continue
		}

		input = strings.TrimSpace(input)

		// Handle commands
		switch strings.ToLower(input) {
		case "quit":
			fmt.Println("Game ended by user.")
			return
		case "help":
			showHelp()
			continue
		case "new":
			gameID = createNewGame()
			continue
		case "moves":
			if gameID != "" {
				showValidMoves(gameID)
			} else {
				fmt.Println("No active game. Type 'new' to start a game.")
			}
			continue
		}

		// Try to make a move if we have an active game
		if gameID != "" {
			makeMove(gameID, input)
		} else {
			fmt.Println("No active game. Type 'new' to start a game.")
		}
	}
}

func createNewGame() string {
	fmt.Println("Creating new game...")

	resp, err := makeAPIRequest("POST", apiBaseURL+"/games", nil)
	if err != nil {
		fmt.Printf("Error creating game: %v\n", err)
		return ""
	}

	if !resp.Success {
		fmt.Printf("Failed to create game: %s\n", resp.Error)
		return ""
	}

	// Parse game state from response
	data, _ := json.Marshal(resp.Data)
	var gameState GameState
	json.Unmarshal(data, &gameState)

	fmt.Printf("New game created (ID: %s)\n", gameState.ID)
	fmt.Printf("You are playing as White\n")

	return gameState.ID
}

func displayGame(gameID string) {
	resp, err := makeAPIRequest("GET", apiBaseURL+"/games/"+gameID, nil)
	if err != nil {
		fmt.Printf("Error getting game state: %v\n", err)
		return
	}

	if !resp.Success {
		fmt.Printf("Failed to get game state: %s\n", resp.Error)
		return
	}

	// Parse game state
	data, _ := json.Marshal(resp.Data)
	var gameState GameState
	json.Unmarshal(data, &gameState)

	fmt.Printf("\nCurrent Position (Game ID: %s):\n", gameState.ID)
	fmt.Println(gameState.Board)
	fmt.Printf("\nTurn: %s\n", gameState.Turn)

	if gameState.LastMove != "" {
		fmt.Printf("Last move: %s\n", gameState.LastMove)
	}

	fmt.Println(strings.Repeat("-", 50))
}

func makeMove(gameID, move string) {
	moveReq := map[string]string{"move": move}

	resp, err := makeAPIRequest("POST", apiBaseURL+"/games/"+gameID+"/moves", moveReq)
	if err != nil {
		fmt.Printf("Error making move: %v\n", err)
		return
	}

	if !resp.Success {
		fmt.Printf("Invalid move: %s\n", resp.Error)
		fmt.Println("Try again or type 'help' for commands")
		return
	}

	fmt.Printf("Move played: %s\n", move)

	// Get computer move if it's Black's turn
	resp, err = makeAPIRequest("GET", apiBaseURL+"/games/"+gameID, nil)
	if err != nil {
		fmt.Printf("Error getting game state: %v\n", err)
		return
	}

	if resp.Success {
		data, _ := json.Marshal(resp.Data)
		var gameState GameState
		json.Unmarshal(data, &gameState)

		if gameState.Turn == "b" {
			getComputerMove(gameID)
		}
	}
}

func getComputerMove(gameID string) {
	fmt.Println("Computer is thinking...")

	resp, err := makeAPIRequest("POST", apiBaseURL+"/games/"+gameID+"/computer-move", nil)
	if err != nil {
		fmt.Printf("Error getting computer move: %v\n", err)
		return
	}

	if !resp.Success {
		fmt.Printf("Computer move failed: %s\n", resp.Error)
		return
	}

	// Parse computer move response
	data, _ := json.Marshal(resp.Data)
	var compResp ComputerMoveResponse
	json.Unmarshal(data, &compResp)

	fmt.Printf("Computer plays: %s\n", compResp.Move)
}

func showValidMoves(gameID string) {
	resp, err := makeAPIRequest("GET", apiBaseURL+"/games/"+gameID+"/valid-moves", nil)
	if err != nil {
		fmt.Printf("Error getting valid moves: %v\n", err)
		return
	}

	if !resp.Success {
		fmt.Printf("Failed to get valid moves: %s\n", resp.Error)
		return
	}

	// Parse valid moves
	data, _ := json.Marshal(resp.Data)
	var validMoves []string
	json.Unmarshal(data, &validMoves)

	fmt.Printf("\nValid moves (%d):\n", len(validMoves))
	for i, move := range validMoves {
		fmt.Printf("  %s", move)
		if (i+1)%8 == 0 {
			fmt.Println()
		}
	}

	if len(validMoves)%8 != 0 {
		fmt.Println()
	}
}

func checkGameEnd(gameID string) string {
	resp, err := makeAPIRequest("GET", apiBaseURL+"/games/"+gameID, nil)
	if err != nil {
		return ""
	}

	if !resp.Success {
		return ""
	}

	// Parse game state
	data, _ := json.Marshal(resp.Data)
	var gameState GameState
	json.Unmarshal(data, &gameState)

	return gameState.Outcome
}

func makeAPIRequest(method, url string, data interface{}) (*APIResponse, error) {
	client := &http.Client{Timeout: 10 * time.Second}

	var req *http.Request
	var err error

	if data != nil {
		jsonData, _ := json.Marshal(data)
		req, err = http.NewRequest(method, url, strings.NewReader(string(jsonData)))
		if err != nil {
			return nil, err
		}
		req.Header.Set("Content-Type", "application/json")
	} else {
		req, err = http.NewRequest(method, url, nil)
		if err != nil {
			return nil, err
		}
	}

	req.Header.Set("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var apiResp APIResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&apiResp)
	if err != nil {
		return nil, err
	}

	return &apiResp, nil
}

func showHelp() {
	fmt.Println("\n=== Help ===")
	fmt.Println("Commands:")
	fmt.Println("  new     - Start a new game")
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
