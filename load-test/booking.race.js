import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1000,
  iterations: 1000
};

export default function () {
  const eventId = 4;

  const payload = JSON.stringify({
    customerId: `user-${__VU}`,
    quantity: 1
  });

  const params = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = http.post(
    `http://localhost:3000/api/events/${eventId}/book`,
    payload,
    params
  );
console.log(`VU ${__VU} → status: ${response.status}`);
  check(response, {
    "request completed": (r) =>
      r.status === 201 || r.status === 409
  });
}
