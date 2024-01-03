import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'https://petstore.swagger.io/#/user/loginUser';
  const params = {
    headers: {
      'Content-Type': 'application/JSON',
    },
  };

  const data = {
    "client_id": "teste",
    "client_secret": "123",
  };

  const res = http.post(url, JSON.stringify(data), params);

  let token = res.json("access_token");
  check(token, { 'Authorization successfully': () => token !== '' });
  sleep(1);
  return token;
}