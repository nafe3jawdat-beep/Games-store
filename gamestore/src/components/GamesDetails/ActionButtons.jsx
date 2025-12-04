import { BaseUrl } from "../../Pages/BaseUrl";
export const Sendtotest = async (gameId) => {
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
      `${BaseUrl}/api/tester/games/${gameId}/acceptorreject?game_fate=accept`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const Sendtolibrare = async (gameId) => {
  try {
    const player_id = { player_id: 6 };
    await fetch(
      `${BaseUrl}/api/player/games/${gameId}/players`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify(player_id), 

      }
    );
  } catch (err) {
    console.error(err);
  }
};
