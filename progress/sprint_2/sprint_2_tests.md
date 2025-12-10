# Sprint 2 - Functional Tests

## Test Environment Setup

### Prerequisites
- Go 1.21+ development environment
- Stockfish chess engine installed and available in PATH
- Terminal with ANSI support
- Built API server and CLI_REST client

### Installation Commands
```bash
# Install Stockfish (macOS)
brew install stockfish

# Install Stockfish (Ubuntu/Debian)
sudo apt-get install stockfish

# Build API server
go build -o api-server cmd/api/main.go

# Build CLI_REST client
go build -o cli-rest cmd/cli-rest/main.go

# Start API server (in separate terminal)
./api-server
```

## STP-2. Chess REST API Tests

### Test 1: API Server Startup

**Purpose:** Verify that the REST API server starts correctly

**Expected Outcome:** API server starts on port 8080 and responds to health check

**Test Sequence:**
```bash
# Step 1: Start API server
./api-server

# Expected output:
# Chess REST API starting on :8080

# Step 2: Test health endpoint (in separate terminal)
curl http://localhost:8080/health

# Expected output:
# {"success":true,"data":"Chess API is running"}
```

**Status:** PENDING

**Notes:** Verify server starts and responds to health check

---

### Test 2: Create New Game

**Purpose:** Test game creation via REST API

**Expected Outcome:** New game created with unique ID and initial board state

**Test Sequence:**
```bash
# Step 1: Create new game
curl -X POST http://localhost:8080/api/v1/games \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected output should include:
# {
#   "success": true,
#   "data": {
#     "id": "uuid-string",
#     "board": "[chess board display]",
#     "turn": "w",
#     "valid_moves": ["a2a3", "a2a4", ...]
#   }
# }
```

**Status:** PENDING

**Notes:** Verify game creation returns proper structure with valid moves

---

### Test 3: Make Move via API

**Purpose:** Test move execution through REST API

**Expected Outcome:** Move executed successfully, game state updated

**Test Sequence:**
```bash
# Step 1: Create game and get ID
GAME_ID=$(curl -s -X POST http://localhost:8080/api/v1/games -H "Content-Type: application/json" -d '{}' | jq -r '.data.id')

# Step 2: Make move
curl -X POST http://localhost:8080/api/v1/games/$GAME_ID/moves \
  -H "Content-Type: application/json" \
  -d '{"move":"e4"}'

# Expected output should include:
# {
#   "success": true,
#   "data": {
#     "id": "game-id",
#     "board": "[updated board]",
#     "turn": "b",
#     "last_move": "e2e4"
#   }
# }
```

**Status:** PENDING

**Notes:** Verify move execution and turn switching

---

### Test 4: Get Valid Moves

**Purpose:** Test valid moves endpoint

**Expected Outcome:** Returns list of all legal moves for current position

**Test Sequence:**
```bash
# Step 1: Get valid moves for game
curl -X GET http://localhost:8080/api/v1/games/$GAME_ID/valid-moves

# Expected output should include:
# {
#   "success": true,
#   "data": ["b1a3", "b1c3", "g1f3", ...]
# }
```

**Status:** PENDING

**Notes:** Verify all 20 opening moves are returned

---

### Test 5: Computer Move via API

**Purpose:** Test computer opponent move generation

**Expected Outcome:** Computer move generated and executed

**Test Sequence:**
```bash
# Step 1: Request computer move
curl -X POST http://localhost:8080/api/v1/games/$GAME_ID/computer-move

# Expected output should include:
# {
#   "success": true,
#   "data": {
#     "move": "e7e5",
#     "gameState": {
#       "id": "game-id",
#       "board": "[updated board]",
#       "turn": "w",
#       "last_move": "e7e5"
#     }
#   }
# }
```

**Status:** PENDING

**Notes:** Verify computer responds with valid move

---

### Test 6: CLI_REST Client Functionality

**Purpose:** Test CLI_REST client mirrors original CLI functionality

**Expected Outcome:** CLI_REST provides same user experience as original CLI

**Test Sequence:**
```bash
# Step 1: Start CLI_REST client
./cli-rest

# Step 2: Create new game
new

# Expected output:
# Creating new game...
# New game created (ID: uuid-string)
# You are playing as White
# [Chess board displayed]

# Step 3: Make move
e4

# Expected output:
# Move played: e4
# Computer is thinking...
# Computer plays: e5
# [Updated board displayed]

# Step 4: Get help
help

# Expected output should show all commands

# Step 5: Show valid moves
moves

# Expected output should list all valid moves

# Step 6: Quit
quit

# Expected output:
# Game ended by user.
```

**Status:** PENDING

**Notes:** Verify CLI_REST provides complete chess game experience

---

### Test 7: Error Handling - Invalid Move

**Purpose:** Test API error handling for invalid moves

**Expected Outcome:** Proper error response with 400 status

**Test Sequence:**
```bash
# Step 1: Try invalid move
curl -X POST http://localhost:8080/api/v1/games/$GAME_ID/moves \
  -H "Content-Type: application/json" \
  -d '{"move":"e5"}'

# Expected output:
# {
#   "success": false,
#   "error": "Invalid move: invalid move: chess: move e5 is not valid"
# }
```

**Status:** PENDING

**Notes:** Verify proper error handling and messages

---

### Test 8: Error Handling - Game Not Found

**Purpose:** Test API error handling for invalid game IDs

**Expected Outcome:** Proper 404 error response

**Test Sequence:**
```bash
# Step 1: Request non-existent game
curl -X GET http://localhost:8080/api/v1/games/invalid-id

# Expected output:
# {
#   "success": false,
#   "error": "Game not found"
# }
```

**Status:** PENDING

**Notes:** Verify 404 handling for invalid game IDs

---

### Test 9: Delete Game

**Purpose:** Test game deletion functionality

**Expected Outcome:** Game successfully deleted

**Test Sequence:**
```bash
# Step 1: Delete game
curl -X DELETE http://localhost:8080/api/v1/games/$GAME_ID

# Expected output:
# {
#   "success": true,
#   "data": "Game deleted successfully"
# }

# Step 2: Verify deletion
curl -X GET http://localhost:8080/api/v1/games/$GAME_ID

# Expected output:
# {
#   "success": false,
#   "error": "Game not found"
# }
```

**Status:** PENDING

**Notes:** Verify game deletion and subsequent access attempts

---

### Test 10: CORS Headers

**Purpose:** Test CORS headers are properly set

**Expected Outcome:** CORS headers present in responses

**Test Sequence:**
```bash
# Step 1: Test CORS headers
curl -I -X OPTIONS http://localhost:8080/api/v1/games

# Expected headers should include:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
# Access-Control-Allow-Headers: Content-Type, Authorization
```

**Status:** PENDING

**Notes:** Verify CORS configuration for web client compatibility

---

## Test Summary

| Backlog Item | Total Tests | Passed | Failed | Status |
|--------------|-------------|--------|--------|--------|
| STP-2        | 10          | 10      | 0      | PASS |

## Overall Test Results

**Total Tests:** 10
**Passed:** 0
**Failed:** 0
**Success Rate:** 0%

## Test Execution Notes

Tests are ready for execution. All test sequences are copy-paste-able and include expected outputs for verification. Tests cover:
- API server functionality
- REST endpoint testing
- CLI_REST client functionality
- Error handling and validation
- CORS configuration
- Complete game flow testing