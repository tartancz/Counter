import { Fragment, useState, useEffect } from "react";
import {
  Link,
  useLoaderData,
  Form,
  useSearchParams,
  useParams,
  useSubmit,
} from "react-router-dom";
import { loadUsers } from "../../utils/api";
import "./sidebar.css";

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const users = await loadUsers(search);
  return { users, search };
}

export default function Sidebar() {
  const { users, search } = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    document.getElementById("search").value = search;
  }, [search]);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-top-section">
        <UserNavbar />
        <Form action="" id="search-form" role="search">
          <input
            type="search"
            placeholder="Search"
            name="search"
            id="search"
            defaultValue={search}
            onChange={(event) => {
              const isFirstSearch = search == null;
              submit(event.currentTarget.form, { replace: !isFirstSearch });
            }}
          />
        </Form>
      </div>
      <div className="users-scroll">
        {users.length ? (
          users.map((u) => {
            return (
              <div className="user" key={u.id}>
                <Link to={`user/${u.username}`} className="linkToUser">
                  {u.username}
                </Link>
              </div>
            );
          })
        ) : (
          <span>no users</span>
        )}
      </div>
    </div>
  );
}

function UserNavbar() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });
  return (
    <nav className="navbar-links">
      <ul className="link-list">
        <li className="link-item">
          <Link to="/" className="link-button">
            Home
          </Link>
        </li>
        {isAuth ? (
          <Fragment>
            <li className="link-item">
              <Link to={"profile"} className="link-button">
                profile
              </Link>
            </li>
            <li className="link-item">
              <Link to={"logout"} className="link-button">
                Logout
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="link-item">
              <Link to={"login"} className="link-button">
                Login
              </Link>
            </li>
            <li className="link-item">
              <Link to={"signup"} className="link-button">
                Signup
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}
