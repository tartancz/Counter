import { Form, useActionData, useSearchParams, redirect,} from "react-router-dom";
import { login } from "../../../utils/api";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await login(data);
  if (res.status === 400) return res;
  const value = await res.json()
  localStorage.setItem("token", value.key)
  return redirect("/");
}

export function loader(){
    if (localStorage.getItem('token') !== null){
        return redirect('/')
    }
    return null
}

export default function Login() {

  let [searchParams, setSearchParams] = useSearchParams();
  const data = useActionData();
  searchParams.get("confirm") === "1";
  return (
    <>
      {searchParams.get("confirm") === "1" && (
        <h1>Your email was confirmed succesfully.</h1>
      )}

      <Form method="post">
        <div>
          <label htmlFor="email">Email </label>
          <input type="email" name="email" id="email" />
        </div>
        {writeError(data, "email")}
        <div>
          <label htmlFor="password">Password </label>
          <input type="password" name="password" id="password" />
        </div>
        {writeError(data, "password")}
        {writeError(data, "non_field_errors")}
        <input type="submit" value="asdas" />
      </Form>
    </>
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
