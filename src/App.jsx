import './App.css'
import { Routes, Route } from "react-router"
import CardData from "./API's/Card"
import UserForm from './API\'s/Form'
// import AddUsers from "./API's/Add Users"
// import EditUser from './API\'s/Edit user'

function App() {

  return (
    <div>
      {/* <CardData /> */}
      <Routes>
        <Route path="/" element={<CardData />} />
        <Route path="/addusers" element={<UserForm editForm={false} />} />
        <Route path="/edit/:id" element={<UserForm editForm={true} />} />
      </Routes>
    </div>
  )
}

export default App
