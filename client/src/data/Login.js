import store from "../store";
import { userSignIn, setLoginLoading, setLoginFinished } from "../actions";

export default function login(username, password, history) {
  store.dispatch(setLoginLoading());
  fetch("/login-service/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then(response => {
    if (response.status === 200) {
      setJWT(response);
      store.dispatch(userSignIn(username));
      setTimeout(() => {
        store.dispatch(setLoginFinished());
        history.push("/home");
      }, 2000);
    } else {
      store.dispatch(setLoginFinished());
    }
  });
}

function setJWT(response) {
  var jwt = response.headers.get("Authorization");
  var jwtArr = jwt.split(" ");
  jwt = jwtArr[1];
  localStorage.setItem("JWT", jwt);
}
