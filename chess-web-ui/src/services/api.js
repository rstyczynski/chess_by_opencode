const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export async function createGame() {
  const response = await fetch(`${API_URL}/games`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to create game');
  return response.json();
}

export async function getGameState(gameId) {
  const response = await fetch(`${API_URL}/games/${gameId}`);
  if (!response.ok) throw new Error('Failed to get game state');
  return response.json();
}

export async function makeMove(gameId, move) {
  const response = await fetch(`${API_URL}/games/${gameId}/moves`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ move }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Invalid move');
  }
  return response.json();
}

export async function getComputerMove(gameId) {
  const response = await fetch(`${API_URL}/games/${gameId}/computer-move`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to get computer move');
  return response.json();
}

export async function getValidMoves(gameId) {
  const response = await fetch(`${API_URL}/games/${gameId}/valid-moves`);
  if (!response.ok) throw new Error('Failed to get valid moves');
  return response.json();
}

export async function deleteGame(gameId) {
  const response = await fetch(`${API_URL}/games/${gameId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete game');
  return response.json();
}
