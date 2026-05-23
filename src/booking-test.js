import http from "k6/http";
import { check } from "k6";

const BASE_URL =
  __ENV.BASE_URL || "http://localhost:3000";

const SHOW_ID =
  __ENV.SHOW_ID || "692d7691ae05257605b9659b";

// IMPORTANT:
// This must be the USER'S clerkId
// Example: user_2abcXYZ123...
const CURRENT_USER_ID =
  __ENV.CURRENT_USER_ID || "user_33KCwu2n1XJSk4Ci4I35khHdCOw";

const SEAT_IDS = (
  __ENV.SEAT_IDS || "690444b78c3aa5dd8626ad6d"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const options = {
  vus: Number(__ENV.VUS || 100),
  iterations: Number(__ENV.ITERATIONS || 100),

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<3000"],
  },
};

export default function () {
  const payload = {
    showId: SHOW_ID,
    seats: SEAT_IDS,
    currentUserId: CURRENT_USER_ID,
  };

  const response = http.post(
    `${BASE_URL}/api/checkout`,
    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let body = {};

  try {
    body = response.json();
  } catch (_) {}

  console.log(
    JSON.stringify({
      status: response.status,
      response: body,
    })
  );

  check(response, {
    "status is 200": (r) => r.status === 200,
    "checkout ok": () => body?.ok === true,
  });
}