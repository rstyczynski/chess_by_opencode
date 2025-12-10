# Sprint 1 - Design

## STP-1. Chess CLI

Status: Proposed

### Requirement Summary
Build Chess CLI to enable user to play with computer side expert chess player. CLI should use regular chess position interface language to perform movement and display chess board in terminal mode after each move.

### Feasibility Analysis

**API Availability:**
- github.com/corentings/chess/v2 - Complete chess engine with move validation, board display, and UCI engine support
- chess.NewGame() - Game initialization
- game.ValidMoves() - Move generation
- game.PushNotationMove() - Move parsing and execution
- game.Position().Board().Draw() - Board visualization
- uci.New() - Computer opponent integration

**Technical Constraints:**
- Terminal-only interface (no GUI)
- Standard algebraic notation for moves
- Single-threaded game loop
- ANSI escape codes for board display

**Risk Assessment:**
- Chess engine integration: Low - Well-documented API available
- Terminal display: Low - ANSI codes widely supported
- Move parsing: Low - Standard notation supported
- Computer opponent: Low - UCI engine integration available

### Design Overview

**Architecture:**
Single-file CLI application with game loop managing human-computer interaction through chess engine library.

**Key Components:**
1. **Game Manager**: Main game loop and state management
2. **Board Renderer**: Terminal board display using ANSI codes
3. **Move Parser**: User input validation and notation parsing
4. **Computer Player**: UCI engine integration for AI moves
5. **CLI Interface**: User input/output handling

**Data Flow:**
1. Display board → 2. Get user move → 3. Validate and execute → 4. Computer move → 5. Repeat

### Technical Specification

**APIs Used:**
- Library: github.com/corentings/chess/v2
  - chess.NewGame(): Initialize new game
  - game.PushNotationMove(move, notation, nil): Execute user moves
  - game.ValidMoves(): Get legal moves
  - game.Position().Board().Draw(): Display board
  - game.Outcome(): Check game end conditions
- UCI Engine: github.com/corentings/chess/v2/uci
  - uci.New("stockfish"): Initialize AI engine
  - eng.Run(cmdPos, cmdGo): Get computer moves

**Data Structures:**
```go
type Game struct {
    chessGame *chess.Game
    engine    *uci.Engine
    isHumanTurn bool
}
```

**Scripts/Tools:**
- File: main.go
  - Purpose: Complete chess CLI application
  - Interface: Command line execution
  - Dependencies: chess/v2 library, stockfish engine

**Error Handling:**
- Invalid move input: Prompt user to retry
- Chess engine errors: Fallback to random valid move
- Game end conditions: Display result and exit

### Implementation Approach

**Step 1:** Initialize game and UCI engine
**Step 2:** Display initial board state
**Step 3:** Main game loop:
  - Get user input (algebraic notation)
  - Validate and execute move
  - Check for game end
  - Get computer move via UCI
  - Update and display board
**Step 4:** Handle game end conditions

### Testing Strategy

**Functional Tests:**
1. Game initialization and board display
2. Valid move execution and board updates
3. Invalid move rejection and error handling
4. Computer opponent move generation
5. Game end detection (checkmate, stalemate, resignation)

**Edge Cases:**
1. Invalid notation input handling
2. Engine connection failures
3. Interrupted games (Ctrl+C handling)
4. Terminal size limitations

**Success Criteria:**
- Complete games playable from start to finish
- All chess rules enforced correctly
- Computer opponent provides challenging gameplay
- Clear board display and move feedback

### Integration Notes

**Dependencies:**
- External stockfish engine installation
- Go 1.21+ development environment

**Compatibility:**
- Standalone CLI application
- Cross-platform compatibility (Linux, macOS, Windows)
- Terminal-only interface

**Reusability:**
- Chess engine logic reusable for REST API (Sprint 2)
- Game state management foundation for Web UI (Sprint 3)

### Documentation Requirements

**User Documentation:**
- Installation instructions
- Basic usage and move notation
- Available commands and options

**Technical Documentation:**
- Code structure and component interaction
- Chess engine integration details

### Design Decisions

**Decision 1:** Use github.com/corentings/chess/v2 library
**Rationale:** Actively maintained fork with comprehensive chess functionality and UCI support
**Alternatives Considered:** Original notnil/chess (archived), custom chess implementation

**Decision 2:** Stockfish as computer opponent
**Rationale:** Widely available, strong chess engine, UCI compatible
**Alternatives Considered:** Built-in AI, other UCI engines

**Decision 3:** Standard algebraic notation
**Rationale:** Universal chess notation, user-friendly, well-supported by library
**Alternatives Considered:** Coordinate notation, figurine notation

### Open Design Questions
None - YOLO mode auto-approval of design decisions

---

# Design Summary

## Overall Architecture
Single-file CLI application using chess engine library for game logic and UCI engine for computer opponent. Terminal-based interface with ANSI board rendering.

## Shared Components
- Chess engine (reusable in Sprint 2/3)
- Game state management (reusable across all sprints)
- Move validation logic (shared foundation)

## Design Risks
- Stockfish installation dependency (mitigation: provide installation instructions)
- Terminal compatibility (mitigation: use standard ANSI codes)

## Resource Requirements
- Go 1.21+ development environment
- Stockfish chess engine
- Terminal with ANSI support

## Design Approval Status
Accepted (YOLO mode auto-approval)