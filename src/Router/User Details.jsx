import { useParams, Link } from "react-router"

function UserDetail() {
    const paramsData=useParams();
    console.log(paramsData.id);
    

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>User Detail Page</h1>
      <h2>User id is:{paramsData.id}</h2>
      <h3><Link to="/users">Back</Link></h3>
    </div>
  )
}

export default UserDetail