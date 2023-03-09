import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>oppps error occurred in pretty bad way</h1>
      <p>{error.data}</p>
      <p>{error.status}</p>
    </div>
  );
}
