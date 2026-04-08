import { Link } from "react-router"

function Users() {
  const userData = [
    { id: 1, name: 'Kanish' },
    { id: 2, name: 'Aadersh' },
    { id: 3, name: 'Sahil' },
    { id: 4, name: 'Gagan' },
    { id: 5, name: 'Parth' },
    { id: 6, name: 'Vivek' }
  ]

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>Users List</h1>
      {
        userData.map((item)=>(
            <div>
              <h4><Link to={"/users/"+item.id}>{item.name}</Link></h4>
            </div>
        ))
      }

      <h1>Users List with name in url</h1>
      {
        userData.map((item)=>(
            <div>
              <h4><Link to={"/users/"+item.id+"/"+item.name}>{item.name}</Link></h4>
            </div>
        ))
      }
    </div>
  )
}

export default Users