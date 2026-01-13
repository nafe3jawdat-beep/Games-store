import { BaseUrl } from "../../Pages/BaseUrl";
const token = localStorage.getItem("token");

export const Sendtotest = async (gameId) => {
  try {
  const res =   await fetch(`${BaseUrl}/api/games/${gameId}/chnagestatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
        console.log("res", res.status);
    const text = await res.text();
    console.log("Response Body:", text);
  } catch (err) {
    console.error(err);
  }
};

export const Reject = async (triage_record_id) => {

  try {
    const res = await fetch(
      `${BaseUrl}/api/triage/${triage_record_id}/midacceptorreject?fate=rejected`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res", res.status);
    const text = await res.text();
    console.log("Response Body:", text);
  } catch (err) {
    console.error(err);
  }
};

export const Accept = async (gameId) => {
  console.log(gameId);
  try {
    const res = await fetch(
      `${BaseUrl}/api/games/${gameId}/acceptorreject?game_fate=accept`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res", res.status);
    const text = await res.text();
    console.log("Response Body:", text);
  } catch (err) {
    console.error(err);
  }
};

export const Sendtolibrare = async (gameId, couponId) => {
  const token = localStorage.getItem("token");

  console.log({ gameId, couponId });

  try {
    const res = await fetch(`${BaseUrl}/api/games/${gameId}/players`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        coupon_id: couponId ? couponId : null, 
      }),
    });


    if (!res.ok) {
      const error = await res.text();
      console.error( error);
      return;
    }

    const data = await res.json();
    console.log( data);
    return data;

  } catch (err) {
    console.error(err);
  }
};

export const Check = async (gameId) => {
  try {
    const res = await fetch(
      `${BaseUrl}/api/games/${gameId}/players/sync-tasks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    console.log("Tasks Synced Successfully:", data);
    return data.tasks ?? data;

  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};
