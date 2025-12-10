# Chess by Ollama

A chess application project built incrementally through sprints, featuring a CLI, REST API, and Web UI.

## Project Overview

This project develops a complete chess application using Go and the Ollama development framework. The implementation follows Rational Unified Process (RUP) methodology with agile delivery.

### Current Status

**Active Sprint:** None  
**Sprint Status:** All Sprints Complete  
**Overall Progress:** 100% complete (3/3 sprints)

## Recent Updates

### Sprint 1 - Chess CLI ✅

**Status:** implemented

**Backlog Items Implemented:**
- **STP-1**: Chess CLI - tested

**Key Features Added:**
- Complete chess game with rule enforcement
- ANSI-based chess board visualization with Unicode pieces
- Standard algebraic notation move parsing and validation
- Stockfish engine integration for computer opponent
- Command-line interface with help and move display commands
- Game end detection (checkmate, stalemate, draws)

**Documentation:**
- Implementation: `progress/sprint_1/sprint_1_implementation.md`
- Tests: `progress/sprint_1/sprint_1_tests.md`
- Design: `progress/sprint_1/sprint_1_design.md`
- Analysis: `progress/sprint_1/sprint_1_analysis.md`

**Usage Examples:**
See implementation documentation for complete usage examples.

---

## Getting Started

### Prerequisites

- Go 1.21+ development environment
- Stockfish chess engine installed and available in PATH
- Terminal with ANSI/Unicode support

### Installation

```bash
# Install Stockfish (macOS)
brew install stockfish

# Install Stockfish (Ubuntu/Debian)
sudo apt-get install stockfish

# Clone and build the project
git clone <repository-url>
cd chess_by_ollama
go build -o chess-cli main.go
```

### Quick Start

```bash
# Run the chess CLI
./chess-cli

# Make moves in algebraic notation
e4
Nf3
help
moves
quit
```

## Project Structure

```
chess_by_ollama/
├── main.go                    # Chess CLI application
├── go.mod                     # Go module definition
├── progress/                  # Sprint documentation
│   ├── sprint_1/             # Sprint 1 artifacts
│   └── backlog/              # Backlog traceability
├── RUPStrikesBack/          # RUP process framework
└── PLAN.md                   # Sprint planning
```

## Development Roadmap

### Sprint 1 - Chess CLI ✅ (implemented)
- [x] Terminal-based chess game
- [x] Computer opponent (Stockfish)
- [x] Standard move notation
- [x] Game state management
- [x] EOF input handling
- [x] Complete test coverage

### Sprint 2 - Chess REST API ✅ (implemented)
- [x] RESTful API endpoints
- [x] Game session management
- [x] Move validation API
- [x] Computer opponent API
- [x] CLI_REST client
- [x] CORS support
- [x] Error handling

**Documentation:**
- Implementation: `progress/sprint_2/sprint_2_implementation.md`
- Tests: `progress/sprint_2/sprint_2_tests.md`
- Design: `progress/sprint_2/sprint_2_design.md`
- Analysis: `progress/sprint_2/sprint_2_analysis.md`

**Usage Examples:**
See implementation documentation for complete API and CLI_REST usage examples.

### Sprint 3 - Chess Web UI ✅ (implemented)
- [x] Web-based chess interface
- [x] Real-time game updates
- [x] Mobile-responsive design
- [x] Integration with REST API
- [x] React SPA with Vite build system
- [x] Tailwind CSS responsive design
- [x] Component-based architecture

## Documentation

- **Sprint Documentation**: `progress/sprint_*/`
- **Process Framework**: `RUPStrikesBack/`
- **Project Planning**: `PLAN.md`
- **Progress Tracking**: `PROGRESS_BOARD.md`

## Contributing

This project follows the RUP Strikes Back development framework. See `RUPStrikesBack/.claude/commands/agents/` for agent-specific guidelines.

## License

[Add license information here]

---

**Last Updated:** December 10, 2025  
**Framework Version:** RUP Strikes Back v1.0