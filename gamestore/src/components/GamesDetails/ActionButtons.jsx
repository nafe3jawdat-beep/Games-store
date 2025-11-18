export const SendToStore = async (gameId) => {
  try {
    await fetch(`http://10.31.42.133:8000/api/braintester/games/${gameId}/changestatus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};

export const Reject = async (gameId) => {
  try {
    await fetch(`http://10.31.42.133:8000/api/braintester/games/${gameId}/changestatus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};
