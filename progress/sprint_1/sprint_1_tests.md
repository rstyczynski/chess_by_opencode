# Sprint 1 - Functional Tests

## Test Environment Setup

### Prerequisites
- Node 18+

## STP-1. Chess CLI Tests

### Test 1: Start and make a move

**Purpose:** Verify game starts and accepts a long algebraic move

**Expected Outcome:** Board updates after e2e4

**Test Sequence:**
```bash
node src/cli.mjs << 'EOF'
e2e4
q
EOF
```

**Status:** PENDING

---

### Test 2: Invalid move rejected

**Purpose:** Invalid string should be rejected

**Expected Outcome:** Shows 'Invalid move'

**Test Sequence:**
```bash
node src/cli.mjs << 'EOF'
foo
q
EOF
```

**Status:** PENDING

---

## Test Summary

| Backlog Item | Total Tests | Passed | Failed | Status |
|--------------|-------------|--------|--------|--------|
| STP-1        | 2           | 0      | 0      | PENDING |

## Overall Test Results

**Total Tests:** 2
**Passed:** 0
**Failed:** 0

## Test Execution Notes
Pending implementation completion