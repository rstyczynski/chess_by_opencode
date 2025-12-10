package main

import (
	"fmt"
	"net/http"
	"time"

	"chess-cli/chess"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GameSession represents a game session
type GameSession struct {
	ID      string      `json:"id"`
	Game    *chess.Game `json:"-"`
	Created time.Time   `json:"created"`
	Updated time.Time   `json:"updated"`
}

// MoveRequest represents a move request
type MoveRequest struct {
	Move string `json:"move" binding:"required"`
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

// APIResponse represents a generic API response
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

var games = make(map[string]*GameSession)

func main() {
	router := gin.Default()

	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	api := router.Group("/api/v1")
	{
		// Game management
		api.POST("/games", createGame)
		api.GET("/games/:id", getGame)
		api.DELETE("/games/:id", deleteGame)

		// Move management
		api.POST("/games/:id/moves", makeMove)
		api.GET("/games/:id/valid-moves", getValidMoves)
		api.POST("/games/:id/computer-move", getComputerMove)
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, APIResponse{
			Success: true,
			Data:    "Chess API is running",
		})
	})

	fmt.Println("Chess REST API starting on :8080")
	router.Run(":8080")
}

func createGame(c *gin.Context) {
	game, err := chess.NewGame()
	if err != nil {
		c.JSON(http.StatusInternalServerError, APIResponse{
			Success: false,
			Error:   fmt.Sprintf("Failed to create game: %v", err),
		})
		return
	}

	gameID := uuid.New().String()
	session := &GameSession{
		ID:      gameID,
		Game:    game,
		Created: time.Now(),
		Updated: time.Now(),
	}

	games[gameID] = session

	gameState := getGameState(session)
	c.JSON(http.StatusCreated, APIResponse{
		Success: true,
		Data:    gameState,
	})
}

func getGame(c *gin.Context) {
	gameID := c.Param("id")
	session, exists := games[gameID]
	if !exists {
		c.JSON(http.StatusNotFound, APIResponse{
			Success: false,
			Error:   "Game not found",
		})
		return
	}

	gameState := getGameState(session)
	c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Data:    gameState,
	})
}

func deleteGame(c *gin.Context) {
	gameID := c.Param("id")
	_, exists := games[gameID]
	if !exists {
		c.JSON(http.StatusNotFound, APIResponse{
			Success: false,
			Error:   "Game not found",
		})
		return
	}

	delete(games, gameID)
	c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Data:    "Game deleted successfully",
	})
}

func makeMove(c *gin.Context) {
	gameID := c.Param("id")
	session, exists := games[gameID]
	if !exists {
		c.JSON(http.StatusNotFound, APIResponse{
			Success: false,
			Error:   "Game not found",
		})
		return
	}

	var req MoveRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, APIResponse{
			Success: false,
			Error:   fmt.Sprintf("Invalid request: %v", err),
		})
		return
	}

	if err := session.Game.MakeMove(req.Move); err != nil {
		c.JSON(http.StatusBadRequest, APIResponse{
			Success: false,
			Error:   fmt.Sprintf("Invalid move: %v", err),
		})
		return
	}

	session.Updated = time.Now()
	gameState := getGameState(session)
	c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Data:    gameState,
	})
}

func getValidMoves(c *gin.Context) {
	gameID := c.Param("id")
	session, exists := games[gameID]
	if !exists {
		c.JSON(http.StatusNotFound, APIResponse{
			Success: false,
			Error:   "Game not found",
		})
		return
	}

	validMoves := session.Game.GetValidMoves()
	c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Data:    validMoves,
	})
}

func getComputerMove(c *gin.Context) {
	gameID := c.Param("id")
	session, exists := games[gameID]
	if !exists {
		c.JSON(http.StatusNotFound, APIResponse{
			Success: false,
			Error:   "Game not found",
		})
		return
	}

	move, err := session.Game.MakeComputerMove()
	if err != nil {
		c.JSON(http.StatusInternalServerError, APIResponse{
			Success: false,
			Error:   fmt.Sprintf("Computer move failed: %v", err),
		})
		return
	}

	session.Updated = time.Now()
	gameState := getGameState(session)
	c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"move":      move,
			"gameState": gameState,
		},
	})
}

func getGameState(session *GameSession) GameState {
	return GameState{
		ID:         session.ID,
		Board:      session.Game.GetPosition(),
		Turn:       session.Game.GetTurn(),
		LastMove:   session.Game.GetLastMove(),
		Outcome:    session.Game.GetOutcome(),
		ValidMoves: session.Game.GetValidMoves(),
	}
}
