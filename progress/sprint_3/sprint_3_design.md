# Sprint 3 - Design

## STP-3. Chess Web UI

Status: Accepted

### Requirement Summary

Create a beautiful, responsive web UI for chess gameplay on desktop and mobile devices. The UI integrates with Sprint 2 REST API and provides excellent user experience expressing the value of the game.

### Feasibility Analysis

**API Availability:**
✓ Sprint 2 REST API fully available (tested in Sprint 2):
- `POST /api/v1/games` - Create game
- `GET /api/v1/games/{id}` - Get state
- `POST /api/v1/games/{id}/moves` - Player move
- `POST /api/v1/games/{id}/computer-move` - AI move
- `GET /api/v1/games/{id}/valid-moves` - Legal moves
- `DELETE /api/v1/games/{id}` - Delete game

**Technical Constraints:**
- Modern browser required (ES6+, Fetch API)
- API server must be running on localhost:8080
- CORS configured in Sprint 2 Gin server
- No authentication/authorization in current scope

**Risk Assessment:**
- **Low Risk:** Standard web stack (React + Vite + Tailwind)
- **Low Risk:** API well-tested in Sprint 2
- **Medium Risk:** Custom chessboard UI complexity
  - Mitigation: Use CSS Grid, keep it simple
- **Low Risk:** Responsive design
  - Mitigation: Tailwind responsive utilities

### Design Overview

**Architecture:**
```
┌─────────────┐      HTTP/JSON     ┌──────────────┐
│   Web UI    │ ←─────────────────→│  REST API    │
│  (React)    │                     │  (Sprint 2)  │
└─────────────┘                     └──────────────┘
      │
      ├─ App (root)
      ├─ ChessBoard (game display)
      └─ GameControls (actions)
```

**Key Components:**
1. **App.jsx** - Root component, API integration, game state
2. **ChessBoard.jsx** - Board rendering, piece display, move interaction
3. **GameControls.jsx** - New game, AI move, game info display
4. **api.js** - API service wrapper (Fetch API)
5. **index.css** - Tailwind setup + custom board styles

**Data Flow:**
1. User clicks "New Game" → API POST /games → Store game ID in state
2. User clicks square → App validates → API POST /moves → Update board
3. User clicks "AI Move" → API POST /computer-move → Update board
4. Board updates → Re-render with new position

### Technical Specification

**Technology Stack:**
- **Framework:** React 18 (component-based UI)
- **Build Tool:** Vite 5 (fast dev server, HMR)
- **Styling:** Tailwind CSS 3 (utility-first, responsive)
- **HTTP Client:** Native Fetch API (no dependencies)
- **Package Manager:** npm

**APIs Used:**

| Endpoint | Method | Purpose | Request | Response |
|----------|--------|---------|---------|----------|
| /api/v1/games | POST | Create game | - | {id, board, turn} |
| /api/v1/games/{id} | GET | Get state | - | {id, board, turn, outcome} |
| /api/v1/games/{id}/moves | POST | Make move | {move: "e2e4"} | {board, turn, valid} |
| /api/v1/games/{id}/computer-move | POST | AI move | - | {board, turn, move} |
| /api/v1/games/{id}/valid-moves | GET | Legal moves | - | {moves: ["e2e4", ...]} |
| /api/v1/games/{id} | DELETE | Delete game | - | {success: true} |

**Data Structures:**

React State:
```javascript
{
  gameId: string | null,
  board: string,          // ASCII board from API
  turn: "White" | "Black",
  outcome: string | null,
  selectedSquare: string | null,
  validMoves: string[],
  loading: boolean,
  error: string | null
}
```

API Response (GameState):
```javascript
{
  id: "abc123",
  board: "♜ ♞ ♝ ♛...",  // Visual board
  turn: "White",
  last_move: "e2e4",
  outcome: "White wins" | null,
  valid_moves: ["e2e4", "d2d4", ...]
}
```

**Project Structure:**
```
chess-web-ui/
├── src/
│   ├── App.jsx           # Root, state, API calls
│   ├── components/
│   │   ├── ChessBoard.jsx    # Board + pieces
│   │   └── GameControls.jsx  # Buttons + info
│   ├── services/
│   │   └── api.js        # API wrapper
│   ├── index.css         # Tailwind + styles
│   └── main.jsx          # Entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

**Chessboard Design:**
- CSS Grid (8x8) with alternating colors
- Square coordinates (a1-h8) as data attributes
- Piece rendering: Unicode chess symbols (♔ ♕ ♖ ♗ ♘ ♙)
- Click to select square, click destination to move
- Highlight: selected square (blue), valid moves (green), last move (yellow)

**Error Handling:**
- Network errors: Display "API unavailable" message
- Invalid moves: Show error toast, don't update board
- Game not found: Redirect to new game
- Loading states: Show spinner during API calls

### Implementation Approach

**Step 1:** Initialize React + Vite project with Tailwind
**Step 2:** Create API service wrapper (api.js)
**Step 3:** Implement App.jsx with game state management
**Step 4:** Build ChessBoard.jsx with CSS Grid layout
**Step 5:** Create GameControls.jsx for actions
**Step 6:** Add responsive styles (mobile breakpoints)
**Step 7:** Test on desktop and mobile browsers
**Step 8:** Build production bundle

### Testing Strategy

**Functional Tests:**
1. Create new game → Verify board displays
2. Click square → Verify selection highlight
3. Make valid move → Verify board updates
4. Make invalid move → Verify error message
5. Request AI move → Verify computer plays
6. Display game outcome → Verify win/loss/draw message
7. Responsive layout → Test on mobile viewport

**Integration Tests:**
1. API connectivity (server running)
2. All 6 endpoints work correctly
3. Error handling (API down)
4. Session persistence (game ID)

**Browser Compatibility:**
- Chrome 90+ (desktop/mobile)
- Firefox 88+ (desktop/mobile)
- Safari 14+ (desktop/mobile)
- Edge 90+

**Success Criteria:**
- ✓ Board displays correctly on desktop and mobile
- ✓ All moves work via API
- ✓ AI opponent functional
- ✓ Error states handled gracefully
- ✓ Beautiful, responsive design
- ✓ Loading states visible

### Integration Notes

**Dependencies:**
- **Sprint 2:** REST API server must be running
- **Node.js:** v18+ for development
- **Browser:** Modern browser with ES6 support

**Compatibility:**
- API URL configurable (default: http://localhost:8080)
- CORS already configured in Sprint 2
- JSON format matches Sprint 2 exactly
- No changes to API server needed

**Reusability:**
- API service (api.js) → Reusable for future clients
- Board component → Could support multiplayer later
- Tailwind config → Foundation for future UI work

### Documentation Requirements

**User Documentation:**
- How to start API server (reference Sprint 2)
- How to run web UI (`npm install`, `npm run dev`)
- How to play (click squares to move)
- How to request AI moves
- How to start new game

**Technical Documentation:**
- Component architecture
- API integration approach
- State management patterns
- Build/deployment instructions
- Environment configuration (API URL)

### Design Decisions

**Decision 1: React + Vite**
- **Rationale:** Modern, fast dev experience, HMR, small bundle
- **Alternatives:** Vue, Svelte, Vanilla JS
- **Chosen because:** Best ecosystem, component reusability

**Decision 2: Tailwind CSS**
- **Rationale:** Rapid UI development, responsive utilities, small bundle
- **Alternatives:** Bootstrap, Material UI, custom CSS
- **Chosen because:** Fastest path to "beautiful" UI, highly customizable

**Decision 3: Click-to-move (not drag-and-drop)**
- **Rationale:** Simpler implementation, works on mobile
- **Alternatives:** Drag-and-drop, coordinate input
- **Chosen because:** Touch-friendly, easier to implement

**Decision 4: Native Fetch API**
- **Rationale:** No extra dependencies, sufficient for needs
- **Alternatives:** Axios, React Query
- **Chosen because:** Reduces bundle size, built-in

### Open Design Questions

**None** - All design decisions made autonomously (YOLO mode).

## YOLO Mode Decisions

This sprint was designed in YOLO (autonomous) mode. The following design decisions were made:

### Decision 1: React Framework Choice
**Context:** Multiple frontend frameworks available (React, Vue, Svelte, Vanilla JS)
**Decision Made:** React 18 + Vite 5
**Rationale:**
- Most popular, best documentation and ecosystem
- Vite provides fastest dev experience
- Component reusability for future features
**Alternatives Considered:**
- Vue 3: Good, but smaller ecosystem
- Svelte: Fast, but less familiar to most devs
- Vanilla JS: Would work but more code to write
**Risk:** Low - React is industry standard

### Decision 2: Chessboard Implementation
**Context:** Use library (react-chessboard, chessboard.js) or custom?
**Decision Made:** Custom CSS Grid implementation with Unicode pieces
**Rationale:**
- Full design control ("more than beautiful" requirement)
- No external dependencies
- Lighter bundle size
- Simple enough for single sprint
**Alternatives Considered:**
- react-chessboard: Feature-rich but limited customization
- chessboard.js: jQuery dependency (outdated)
**Risk:** Medium - UI complexity, mitigated by simple click-to-move

### Decision 3: Click-to-Move Interaction
**Context:** Move pieces via drag-and-drop, click-to-move, or coordinate input?
**Decision Made:** Click-to-move (select square, click destination)
**Rationale:**
- Works perfectly on mobile (touch-friendly)
- Simpler to implement than drag-and-drop
- Clear visual feedback (highlight valid moves)
**Alternatives Considered:**
- Drag-and-drop: More intuitive but complex on mobile
- Coordinate input: Works but less user-friendly
**Risk:** Low - Proven pattern, mobile-friendly

---

# Design Summary

## Overall Architecture

**Single Page Application (SPA):**
- React frontend with Vite build tool
- Communicates with Sprint 2 REST API via HTTP/JSON
- Client-side state management (no Redux needed)
- Responsive layout (Tailwind breakpoints)

**Component Hierarchy:**
```
App (state, API calls)
├─ ChessBoard (board display, move interaction)
└─ GameControls (new game, AI move, status display)
```

## Shared Components

- **API Service (api.js):** Shared by all components for HTTP calls
- **Tailwind Config:** Shared styling system
- **Game State:** Centralized in App.jsx, passed as props

## Design Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Custom chessboard complexity | Medium | Keep it simple, use CSS Grid, Unicode pieces |
| API server not running | Low | Clear error messages, connection retry |
| Mobile touch gestures | Low | Click-to-move (not drag-and-drop) |
| Browser compatibility | Low | Use standard APIs, test on major browsers |

## Resource Requirements

**Development:**
- Node.js v18+
- npm
- Modern code editor (VS Code recommended)

**Runtime:**
- Sprint 2 API server running (localhost:8080)
- Modern web browser

**Libraries (npm):**
- react ^18.3.1
- react-dom ^18.3.1
- vite ^5.4.10
- tailwindcss ^3.4.14
- @vitejs/plugin-react ^4.3.3

## Design Approval Status

**Status:** Proposed (YOLO mode: auto-approved)

**YOLO Mode:** Design auto-approved - proceeding to implementation without 60-second wait.
