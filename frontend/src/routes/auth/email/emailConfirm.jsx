import { redirect } from "react-router-dom";
import { verifyEmail } from "../../../utils/api";

export async function loader({ params }) {
  const { key } = params;
  const status = await verifyEmail(key)
  return redirect("/login?confirm=true");
}