import { store } from "../../store";
import { setRegisterLoading, setRegisterFinished } from "../../actions";

export default async function createUser({ username, password }) {
  store.dispatch(setRegisterLoading());
  let response = null;
  try {
    response = await fetch("/login-service/users/register", {
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
  } catch (err) {
    return err;
  }
  store.dispatch(setRegisterFinished());
  if (!response) return 400;
  return response.status;
}
