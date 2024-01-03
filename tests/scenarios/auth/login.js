import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";


export let LoginDuration = new Trend('login_duration');
export let LoginFailRate = new Rate('login_fail_rate');
export let LoginSuccessRate = new Rate('login_success_rate');
export let LoginReqs = new Rate('login_reqs');

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

  //const res = http.post(url, JSON.stringify(data), params);
  let res = http.get('https://petstore.swagger.io/#/user/loginUser');

  LoginDuration.add(res.timings.duration);
  LoginReqs.add(1);
  LoginFailRate.add(res.status == 0 || res.status > 399);
  LoginSuccessRate.add(res.status < 399);

  let durationMsg = 'Max Duration ${1000/1000}s'
  if (!check(res, {
    'max duration': (r) => r.timings.duration < 1000,
  })) {
    fail(durationMsg);
  }

  sleep(1);
}

// let token = res.json("access_token");
// check(token, { 'Authorization successfully': () => token !== '' });
// sleep(1);
// return token;