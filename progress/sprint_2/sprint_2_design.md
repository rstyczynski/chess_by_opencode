# Sprint 2 - Design

## STP-2. Chess REST API

Status: Accepted

### Requirement Summary
Build REST API for chess players. API supports all features available in CLI version, and provides CLI_REST that is functional copy of CLI but utilizing REST API.

### Feasibility Analysis

**API Availability:**
- github.com/gin-gonic/gin - Fast HTTP web framework with middleware and routing
- github.com/corentings/chess/v2 - Reuse chess engine from Sprint 1
- Go net/http package - Standard HTTP server implementation
- JSON encoding/decoding - Built-in Go JSON support

**Technical Constraints:**
- RESTful API design with JSON payloads
- Concurrent game session management
- HTTP status codes and error handling
- State management between requests

**Risk Assessment:**
- REST API development: Low - Well-established patterns in Go
- Session management: Low - In-memory storage sufficient for current scope
- Chess engine integration: Low - Reuse from Sprint 1
- CLI_REST client: Low - Mirror existing CLI functionality

### Design Overview

**Architecture:**
- **API Server**: Gin-based HTTP server with REST endpoints
- **Game Manager**: Session management and chess engine coordination
- **Shared Package**: Extracted chess logic from Sprint 1
- **CLI_REST Client**: HTTP client mirroring original CLI

**Key Components:**
1. **API Layer**: HTTP handlers and routing
2. **Service Layer**: Game logic and session management
3. **Data Layer**: In-memory game storage
4. **Client Layer**: CLI_REST with HTTP calls
5. **Shared Chess**: Reusable chess engine wrapper

**Data Flow:**
1. Client → HTTP Request → API Handler → Service → Chess Engine → Response
2. CLI_REST → HTTP Request → API → JSON Response → Display

### Technical Specification

**APIs Used:**
- Framework: github.com/gin-gonic/gin
  - gin.Default(): Create router with default middleware
  - router.POST/GET/DELETE: HTTP method handlers
  - c.JSON(): JSON response generation
  - c.ShouldBindJSON(): Request parsing
- Chess Engine: github.com/corentings/chess/v2 (reused from Sprint 1)
  - chess.NewGame(): Game initialization
  - game.PushNotationMove(): Move execution
  - game.ValidMoves(): Legal move generation
  - game.Position().Board().Draw(): Board state

**Data Structures:**
```go
type GameSession struct {
    ID       string    `json:"id"`
    Game     *chess.Game `json:"-"`
    Created  time.Time `json:"created"`
    Updated  time.Time `json:"updated"`
}

type MoveRequest struct {
    Move string `json:"move" binding:"required"`
}

type GameState struct {
    ID         string `json:"id"`
    Board      string `json:"board"`
    Turn       string `json:"turn"`
    LastMove   string `json:"last_move,omitempty"`
    Outcome    string `json:"outcome,omitempty"`
    ValidMoves []string `json:"valid_moves,omitempty"`
}
```

**Scripts/Tools:**
- File: main.go (API server)
  - Purpose: REST API server with chess endpoints
  - Interface: HTTP endpoints
  - Dependencies: Gin framework, chess engine
- File: cmd/cli-rest/main.go
  - Purpose: CLI client using REST API
  - Interface: Command line (mirrors original CLI)
  - Dependencies: HTTP client, same UI as original CLI

**Error Handling:**
- Invalid moves: HTTP 400 with error details
- Game not found: HTTP 404
- Server errors: HTTP 500 with error message
- JSON validation errors: HTTP 400

### Implementation Approach

**Step 1:** Extract shared chess logic from Sprint 1
**Step 2:** Create API server with Gin framework
**Step 3:** Implement REST endpoints for game management
**Step 4:** Create CLI_REST client with HTTP calls
**Step 5:** Add comprehensive error handling and validation

### Testing Strategy

**Functional Tests:**
1. API endpoint testing (create game, make moves, get state)
2. CLI_REST functionality testing (mirrors original CLI tests)
3. Concurrent game session testing
4. Error handling and validation testing
5. Integration testing between API and CLI_REST

**Edge Cases:**
1. Invalid game IDs
2. Malformed JSON requests
3. Concurrent access to same game
4. Network timeout handling
5. Server shutdown scenarios

**Success Criteria:**
- Complete REST API with all chess functionality
- CLI_REST client fully functional
- All original CLI features available via API
- Proper error handling and validation
- Concurrent game support

### Integration Notes

**Dependencies:**
- Go 1.21+ development environment
- Gin web framework
- Existing chess engine from Sprint 1

**Compatibility:**
- Reuses chess engine logic from Sprint 1
- Maintains same user experience as original CLI
- RESTful design follows industry standards
- JSON format for easy client integration

**Reusability:**
- Shared chess package for future sprints
- REST API foundation for Web UI (Sprint 3)
- Session management patterns for multiplayer features

### Documentation Requirements

**API Documentation:**
- Endpoint documentation with request/response examples
- Error code reference
- Authentication/authorization notes (if applicable)

**Technical Documentation:**
- API architecture and data flow
- Session management approach
- Integration guidelines for Web UI

### Design Decisions

**Decision 1:** Use Gin web framework
**Rationale:** Lightweight, fast, excellent documentation, good middleware support
**Alternatives Considered:** Echo, Fiber, standard net/http

**Decision 2:** In-memory session storage
**Rationale:** Simple, fast, sufficient for current requirements
**Alternatives Considered:** Database, Redis, file-based storage

**Decision 3:** Extract shared chess package
**Rationale:** Code reuse between CLI and API, maintainability
**Alternatives Considered:** Duplicate code, embed in API only

**Decision 4:** RESTful JSON API design
**Rationale:** Standard, well-supported, easy client integration
**Alternatives Considered:** GraphQL, gRPC, WebSocket-only

### Open Design Questions
None - YOLO mode auto-approval of design decisions

---

# Design Summary

## Overall Architecture
REST API server with Gin framework, in-memory session management, and CLI_REST client. Shared chess package enables code reuse between Sprint 1 and current implementation.

## Shared Components
- Chess engine logic (reused from Sprint 1)
- Game state management
- Move validation and execution
- Board representation

## Design Risks
- Session storage scalability (mitigation: can be extended to database later)
- Concurrent access complexity (mitigation: simple locking mechanisms)

## Resource Requirements
- Go 1.21+ development environment
- Gin web framework
- Existing chess engine from Sprint 1

## Design Approval Status
Accepted (YOLO mode auto-approval)