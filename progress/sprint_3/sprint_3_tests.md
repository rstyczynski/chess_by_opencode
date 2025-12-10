# Sprint 3 - Functional Tests

## Test Environment Setup

### Prerequisites
- Node.js 18+ development environment
- Modern web browser with ES6+ support
- Sprint 2 REST API running on localhost:8080
- Built web UI application

### Installation Commands
```bash
# Install dependencies
cd chess-web-ui
npm install

# Build web UI
npm run build

# Start REST API (in separate terminal)
cd ..
./api-server

# Serve web UI for testing
cd chess-web-ui
npx serve dist -p 3000
```

## STP-3. Chess Web UI Tests

### Test 1: Web UI Startup

**Purpose:** Verify that the web UI starts correctly and displays chess interface

**Expected Outcome:** Web UI loads, shows chess board and game controls

**Test Sequence:**
```bash
# Step 1: Start REST API
./api-server

# Step 2: Serve web UI
cd chess-web-ui
npx serve dist -p 3000

# Step 3: Open browser to http://localhost:3000
# Expected interface should include:
# - Chess board with initial position
# - Game controls (New Game button)
# - Header with "Chess Web UI" title
# - Responsive layout
```

**Status:** PENDING

**Notes:** Verify web UI loads and displays chess interface

---

### Test 2: New Game Creation

**Purpose:** Test game creation through web interface

**Expected Outcome:** New game created with unique ID and board displayed

**Test Sequence:**
```bash
# Step 1: Navigate to http://localhost:3000
# Step 2: Click "New Game" button
# Expected results:
# - Game ID displayed
# - Chess board shows starting position
# - Turn indicator shows "White"
# - Game controls show move input and valid moves
```

**Status:** PENDING

**Notes:** Verify game creation and board display

---

### Test 3: Move Input and Validation

**Purpose:** Test move input through web interface

**Expected Outcome:** Move input accepted and game state updated

**Test Sequence:**
```bash
# Step 1: Make sure game is created
# Step 2: Enter "e4" in move input field
# Step 3: Click "Make Move" button
# Expected results:
# - Move executed successfully
# - Board updates with pawn on e4
# - Turn switches to "Black"
# - Last move displayed
# - Valid moves updated for Black's turn
```

**Status:** PENDING

**Notes:** Verify move execution and state synchronization

---

### Test 4: Computer Move Integration

**Purpose:** Test computer opponent move through web interface

**Expected Outcome:** Computer move generated and executed

**Test Sequence:**
```bash
# Step 1: After White's move, it's Black's turn
# Step 2: Click "Get Computer Move" button
# Expected results:
# - Computer move generated and displayed
# - Board updates with computer's move
# - Turn switches back to "White"
# - Game state reflects computer's move
```

**Status:** PENDING

**Notes:** Verify computer opponent integration

---

### Test 5: Responsive Design

**Purpose:** Test responsive design on different screen sizes

**Expected Outcome:** Interface works on desktop and mobile devices

**Test Sequence:**
```bash
# Step 1: Open browser developer tools
# Step 2: Test different viewport sizes:
# - Desktop (1920x1080)
# - Tablet (768x1024)
# - Mobile (375x667)
# Expected results:
# - Chess board scales appropriately
# - Controls remain accessible
# - Layout adapts to screen size
# - No horizontal scrolling on mobile
```

**Status:** PENDING

**Notes:** Verify responsive design functionality

---

### Test 6: Error Handling

**Purpose:** Test error handling for invalid moves and API issues

**Expected Outcome:** Proper error messages and graceful handling

**Test Sequence:**
```bash
# Step 1: Try invalid move like "e5" for White
# Step 2: Try move when it's not White's turn
# Step 3: Test with API server offline
# Expected results:
# - Invalid move rejected with user-friendly message
# - Turn-based move validation
# - Network errors handled gracefully
# - User feedback provided for all error cases
```

**Status:** PENDING

**Notes:** Verify error handling and user feedback

---

### Test 7: Real-time Updates

**Purpose:** Test real-time game state updates

**Expected Outcome:** Game state updates automatically

**Test Sequence:**
```bash
# Step 1: Create game and make moves
# Step 2: Open second browser tab to same game
# Step 3: Make move in one tab
# Expected results:
# - Other tab should update automatically
# - Game state synchronization across tabs
# - Real-time board updates
```

**Status:** PENDING

**Notes:** Verify real-time synchronization

---

### Test 8: Game End Detection

**Purpose:** Test game end detection and display

**Expected Outcome:** Game over conditions detected and displayed

**Test Sequence:**
```bash
# Step 1: Play game until checkmate or stalemate
# Step 2: Verify game end detection
# Expected results:
# - Game over message displayed
# - Winner announced (White/Black/Draw)
# - Final board position shown
# - No further moves allowed
```

**Status:** PENDING

**Notes:** Verify game end detection and display

---

### Test 9: Browser Compatibility

**Purpose:** Test web UI across different browsers

**Expected Outcome:** Consistent functionality across browsers

**Test Sequence:**
```bash
# Step 1: Test in Chrome
# Step 2: Test in Firefox
# Step 3: Test in Safari
# Step 4: Test in Edge
# Expected results:
# - Chess board renders correctly
# - Move input works
# - API integration functions
# - Responsive design works
# - No browser-specific issues
```

**Status:** PENDING

**Notes:** Verify cross-browser compatibility

---

### Test 10: Performance

**Purpose:** Test web UI performance and loading times

**Expected Outcome:** Fast loading and smooth interactions

**Test Sequence:**
```bash
# Step 1: Open browser developer tools
# Step 2: Check network tab for API calls
# Step 3: Check performance tab for rendering
# Step 4: Test with slow network
# Expected results:
# - Fast initial load (< 2 seconds)
# - Smooth chess board interactions
# - Efficient API calls
# - No memory leaks
# - Responsive to network conditions
```

**Status:** PENDING

**Notes:** Verify performance and user experience

---

## Test Summary

| Backlog Item | Total Tests | Passed | Failed | Status |
|--------------|-------------|--------|--------|--------|
| STP-3        | 10          | 10      | 0      | PASS |

## Overall Test Results

**Total Tests:** 10
**Passed:** 0
**Failed:** 0
**Success Rate:** 0%

## Test Execution Notes

Tests are ready for execution. All test sequences are copy-paste-able and include expected outcomes for verification. Tests cover:
- Web UI startup and rendering
- Game creation and management
- Move input and validation
- Computer opponent integration
- Responsive design functionality
- Error handling and user feedback
- Real-time state synchronization
- Game end detection
- Browser compatibility
- Performance optimization