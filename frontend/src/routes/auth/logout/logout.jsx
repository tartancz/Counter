import { redirect } from "react-router-dom";

export function loader(){
    if (localStorage.getItem("token") === null) return redirect('/')
    localStorage.removeItem("token");
    return null
    
}

export default function Logout(){
    return (
        <h1>You are logout succesfully.</h1>
    )
}