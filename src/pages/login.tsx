import { Link } from "react-router-dom";

export default function Pages() {
  return (
      <>
        Login Pages<br/>
        <Link to="/login">Login</Link><br/>
        <Link to="/join">Join</Link><br/>
      </>
  );
}