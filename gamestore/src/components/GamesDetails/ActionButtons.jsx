import { BaseUrl } from "../../Pages/BaseUrl";
export const SendToStore = async (gameId) => {
  try {
    await fetch(
      `${BaseUrl}/api/braintester/games/${gameId}/chnagestatus`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const Reject = async (gameId) => {
  try {
    await fetch(
      `${BaseUrl}/api/braintester/games/${gameId}/changestatus`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const Accept = async (gameId) => {
  try {
    await fetch(
      `${BaseUrl}/api/braintester/games/${gameId}/acceptorreject?game_fate=accept`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
