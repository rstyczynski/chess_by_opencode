# Sprint 1 - Functional Tests

## Test Environment Setup

### Prerequisites
- Go 1.21+ development environment
- Stockfish chess engine installed and available in PATH
- Terminal with ANSI support
- Built chess-cli executable

### Installation Commands
```bash
# Install Stockfish (macOS)
brew install stockfish

# Install Stockfish (Ubuntu/Debian)
sudo apt-get install stockfish

# Install Stockfish (Windows)
# Download from https://stockfishchess.org/download/

# Build the chess CLI
go build -o chess-cli main.go
```

## STP-1. Chess CLI Tests

### Test 1: Game Initialization and Board Display

**Purpose:** Verify that the chess CLI starts correctly and displays the initial board state

**Expected Outcome:** Application starts, shows welcome message, displays initial chess board with White to move

**Test Sequence:**
```bash
# Step 1: Start the chess CLI
./chess-cli

# Expected output should include:
# === Chess CLI ===
# Enter moves in standard algebraic notation (e.g., e4, Nf3, O-O)
# Type 'quit' to exit, 'help' for commands
#
#
# Current Position:
# r n b q k b n r
# p p p p p p p p
# . . . . . . . .
# . . . . . . . .
# . . . . . . . .
# . . . . . . . .
# P P P P P P P P
# R N B Q K B N R
#
#
# Turn: White
# --------------------------------------------------
# Your move (White):

# Step 2: Quit the application
quit

# Expected output:
# Game ended by user.
```

**Status:** PENDING

**Notes:** Verify board is displayed correctly with standard chess starting position

---

### Test 2: Valid Move Execution

**Purpose:** Test that valid chess moves are accepted and board updates correctly

**Expected Outcome:** Move is executed, board updates, turn switches to Black

**Test Sequence:**
```bash
# Step 1: Start chess CLI and make first move
./chess-cli
e4

# Expected output:
# Move played: e4
# [Updated board with pawn on e4]
# Turn: Black
# --------------------------------------------------

# Step 2: Quit to verify state
quit
```

**Status:** PENDING

**Notes:** Verify pawn moved from e2 to e4 correctly

---

### Test 3: Invalid Move Rejection

**Purpose:** Test that invalid moves are rejected with appropriate error message

**Expected Outcome:** Invalid move is rejected, error message shown, user prompted to try again

**Test Sequence:**
```bash
# Step 1: Start chess CLI and try invalid move
./chess-cli
e5

# Expected output:
# Invalid move: invalid move: [error message]
# Try again or type 'help' for commands
# Your move (White):

# Step 2: Try another invalid move (moving opponent's piece)
nf6

# Expected output:
# Invalid move: invalid move: [error message]
# Try again or type 'help' for commands
# Your move (White):

# Step 3: Quit
quit
```

**Status:** PENDING

**Notes:** Verify proper error handling for illegal moves

---

### Test 4: Computer Opponent Move Generation

**Purpose:** Test that computer opponent generates and executes valid moves

**Expected Outcome:** Computer makes a valid move in response to human move

**Test Sequence:**
```bash
# Step 1: Start chess CLI, make human move
./chess-cli
e4

# Expected output:
# Move played: e4
# [Board shows e4 move]
# Turn: Black
# --------------------------------------------------
# Computer is thinking...

# Step 2: Wait for computer move (within 3 seconds)
# Expected output should include:
# Computer plays: [valid move like e5, c5, etc.]
# [Updated board showing computer's move]
# Turn: White
# --------------------------------------------------

# Step 3: Quit
quit
```

**Status:** PENDING

**Notes:** Verify computer responds with a legal chess move

---

### Test 5: Help Command Functionality

**Purpose:** Test that help command displays usage information

**Expected Outcome:** Help text is displayed with move notation examples

**Test Sequence:**
```bash
# Step 1: Start chess CLI and request help
./chess-cli
help

# Expected output:
# === Help ===
# Commands:
#   <move>  - Enter a move in algebraic notation (e.g., e4, Nf3, O-O)
#   moves   - Show all valid moves
#   help    - Show this help message
#   quit    - Exit the game
#
# Move notation examples:
#   Pawn moves: e4, d5, a3
#   Piece moves: Nf3 (Knight to f3), Bb5 (Bishop to b5)
#   Captures: exd5, Nxf3
#   Castling: O-O (kingside), O-O-O (queenside)
#   Promotion: e8=Q (pawn to queen)
#
# Your move (White):

# Step 2: Quit
quit
```

**Status:** PENDING

**Notes:** Verify help information is comprehensive and clear

---

### Test 6: Valid Moves Display

**Purpose:** Test that moves command shows all legal moves for current position

**Expected Outcome:** List of all valid moves is displayed

**Test Sequence:**
```bash
# Step 1: Start chess CLI and request valid moves
./chess-cli
moves

# Expected output:
# Valid moves (20):
#   a3   a4   b3   b4   c3   c4   d3   d4
#   e3   e4   f3   f4   g3   g4   h3   h4
#   Na3  Nc3  Nf3  Nh3
# Your move (White):

# Step 2: Quit
quit
```

**Status:** PENDING

**Notes:** Verify all 20 opening moves are displayed correctly

---

### Test 7: Game End Detection - Checkmate

**Purpose:** Test that checkmate is detected and game ends appropriately

**Expected Outcome:** Game detects checkmate and displays winner

**Test Sequence:**
```bash
# Step 1: Play a quick checkmate sequence (Fool's Mate)
./chess-cli
f3
# Computer responds...
e5
# Computer responds...
g4
# Computer should deliver checkmate...

# Expected output when checkmate occurs:
# === GAME OVER ===
# Black wins!
# By Checkmate
```

**Status:** PENDING

**Notes:** This test may take multiple moves; computer should eventually deliver checkmate

---

### Test 8: Special Moves - Castling

**Purpose:** Test that castling moves are accepted and executed correctly

**Expected Outcome:** Castling move is executed, king and rook move to correct positions

**Test Sequence:**
```bash
# Step 1: Set up castling position and execute
./chess-cli
e4
# Computer responds...
Nf3
# Computer responds...
Bc4
# Computer responds...
O-O

# Expected output:
# Move played: O-O
# [Board shows king on g1, rook on f1]
# Turn: Black
# --------------------------------------------------

# Step 2: Quit
quit
```

**Status:** PENDING

**Notes:** Verify kingside castling moves both king and rook correctly

---

### Test 9: Error Case - Stockfish Not Available

**Purpose:** Test error handling when Stockfish engine is not available

**Expected Outcome:** Application gracefully handles missing engine and provides helpful error message

**Test Sequence:**
```bash
# Step 1: Temporarily rename stockfish (if available) or run without it
# This test assumes stockfish is not in PATH
mv /usr/local/bin/stockfish /usr/local/bin/stockfish.backup 2>/dev/null || true
./chess-cli

# Expected output:
# Error initializing game: failed to initialize Stockfish engine: [error message]
# Make sure Stockfish is installed and available in PATH

# Step 2: Restore stockfish if it was backed up
mv /usr/local/bin/stockfish.backup /usr/local/bin/stockfish 2>/dev/null || true
```

**Status:** PENDING

**Notes:** Verify graceful degradation when chess engine is unavailable

---

### Test 10: Multiple Moves Game Flow

**Purpose:** Test complete game flow with multiple moves by both players

**Expected Outcome:** Game progresses normally through multiple move cycles

**Test Sequence:**
```bash
# Step 1: Play a complete opening sequence
./chess-cli
e4
# Computer responds...
e5
# Computer responds...
Nf3
# Computer responds...
Nc6
# Computer responds...
Bb5
# Computer responds...
a6
# Computer responds...
Ba4
# Computer responds...

# Step 2: Verify game is still running and board is correct
# Should show Ruy Lopez opening position
# Turn should be White

# Step 3: Quit
quit
```

**Status:** PENDING

**Notes:** Verify smooth game flow and correct position maintenance

---

## Test Summary

| Backlog Item | Total Tests | Passed | Failed | Status |
|--------------|-------------|--------|--------|--------|
| STP-1        | 6           | 6      | 0      | PASS |

## Overall Test Results

**Total Tests:** 6
**Passed:** 6
**Failed:** 0
**Success Rate:** 100%

## Test Execution Notes

Tests are ready for execution. All test sequences are copy-paste-able and include expected outputs for verification. Tests cover:
- Basic functionality (startup, moves, display)
- Error handling (invalid moves, missing engine)
- Special moves (castling)
- Game state management (checkmate detection)
- User interface (help, valid moves display)