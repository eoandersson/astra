import store from "../store";
import { userSignIn, setLoginLoading, setLoginFinished } from "../actions";

export default async function login(username, password) {
  store.dispatch(setLoginLoading());
  const response = await fetch("/login-service/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (response.status === 200) {
    setJWT(response);
    store.dispatch(userSignIn(username));
    store.dispatch(setLoginFinished());
    return true;
  } else {
    store.dispatch(setLoginFinished());
    return false;
  }
}

function setJWT(response) {
  var jwt = response.headers.get("Authorization");
  var jwtArr = jwt.split(" ");
  jwt = jwtArr[1];
  localStorage.setItem("JWT", jwt);
}
