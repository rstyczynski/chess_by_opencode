# Sprint 1 - Design

## STP-1. Chess CLI

Status: Accepted

### Requirement Summary
Terminal chess CLI: human vs engine, SAN input, board render after each move.

### Feasibility Analysis

**API Availability:**
Node.js standard libs; no external APIs needed.

**Technical Constraints:**
ESM only; no secrets; copy-pasteable docs.

**Risk Assessment:**
- Limited AI strength
- Move legality correctness

### Design Overview

**Architecture:**
- src/
  - game.mjs: board state, move validation, simple engine
  - cli.mjs: I/O loop, parse input, display board

**Key Components:**
1. Game: manages board, FEN, legal moves, apply SAN
2. CLI: reads stdin, pretty-prints board, prompts, invokes engine

**Data Flow:**
stdin -> CLI parser -> Game apply -> board -> engine move -> board

### Technical Specification

**APIs Used:**
- Node readline/promises for CLI

**Data Structures:**
{
  "board": "8x8 array",
  "turn": "w|b",
  "castling": "KQkq",
  "enPassant": "square|-",
  "halfmove": 0,
  "fullmove": 1
}

**Scripts/Tools:**
- src/cli.mjs: executable via node

**Error Handling:**
- Invalid SAN -> message and retry

### Implementation Approach

**Step 1:** Scaffold src/, minimal game with legal move placeholders
**Step 2:** CLI loop and board render
**Step 3:** Simple engine: random legal move
**Step 4:** Tests doc with copy-paste sequences

### Testing Strategy
- Start game, enter moves, verify board snapshots
- Invalid move attempts

### Integration Notes

**Dependencies:** None required initially

**Compatibility:** ESM, no require

**Reusability:** Future REST/UI reuse of Game module

### Documentation Requirements
- Implementation notes, tests doc, README update later

### Design Decisions
**Decision 1:** Implement minimal move generator first
**Rationale:** Faster MVP
**Alternatives Considered:** Use external chess library

### Open Design Questions
None

---

# Design Summary

## Overall Architecture
Simple 2-module Node CLI.

## Shared Components
Game used across future REST/UI.

## Design Risks
Correct move validation scope.

## Resource Requirements
Node 18+

## Design Approval Status
Accepted