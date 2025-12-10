// API client service for chess REST API integration
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const apiClient = {
  // Create new game
  createGame: async () => {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  },

  // Get game state
  getGame: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`);
    return await response.json();
  },

  // Make move
  makeMove: async (gameId, move) => {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/moves`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ move }),
    });
    return await response.json();
  },

  // Get valid moves
  getValidMoves: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/valid-moves`);
    return await response.json();
  },

  // Get computer move
  getComputerMove: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/computer-move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  },

  // Delete game
  deleteGame: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};