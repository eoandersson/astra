import store from "../../store";
import { setRegisterLoading, setRegisterFinished } from "../../actions";

export default function createUser({ username, password, history }) {
  store.dispatch(setRegisterLoading());
  fetch("/login-service/users/register", {
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
    store.dispatch(setRegisterFinished());
    if (response.status === 200) {
      history.push("/");
    }
  });
}
