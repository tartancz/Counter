import { Form, useActionData, useRouteError, redirect } from "react-router-dom";
import { signup } from "../../../utils/api";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await signup(data);
  if (res.status === 400) return res;
  return redirect("/email");
}

export function loader() {
  if (localStorage.getItem("token") !== null) {
    return redirect("/");
  }
  return null;
}

export default function Signup() {
  // TODO: check if user is not loged

  const data = useActionData();
  return (
    <Form method="post">
      <div>
        <label htmlFor="username">Username </label>
        <input type="text" name="username" id="username" />
      </div>
      {writeError(data, "username")}
      <div>
        <label htmlFor="email">Email </label>
        <input type="email" name="email" id="email" />
      </div>
      {writeError(data, "email")}
      <div>
        <label htmlFor="password">Password </label>
        <input type="password" name="password1" id="password" />
      </div>
      {writeError(data, "password1")}
      <div>
        <label htmlFor="passwordConf">Password confirmation </label>
        <input type="password" name="password2" id="passwordConf" />
      </div>
      {writeError(data, "non_field_errors")}
      <input type="submit" value="asdas" />
    </Form>
  );
}

function writeError(errors, field) {
  if (!errors) {
    return;
  }
  if (errors[field] === undefined) {
    return;
  }

  return (
    <ul>
      {errors[field].map((e, index) => (
        <li key={index}>{e}</li>
      ))}
    </ul>
  );
}
