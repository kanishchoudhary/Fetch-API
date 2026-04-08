import { Link, NavLink, Outlet } from "react-router"

function College() {

  return (
    <div className="college" style={{textAlign:'center'}}>
      <h1>College Page</h1>
      <h3><Link to="/">Go Back to Home</Link></h3>
      <NavLink className="link" to="">Students</NavLink>
      <NavLink className="link" to="Departments">Departments</NavLink>
      <NavLink className="link" to="CollegeDetails">College Details</NavLink>
      <Outlet />
    </div>
  )
}

export default College