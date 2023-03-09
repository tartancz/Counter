import Sidebar from "../../components/sidebar/sidebar";
import { Outlet, useLoaderData } from "react-router-dom";
import "./root.css";
import { loadUsers } from "../../utils/api";



export default function Root() {
  
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}
