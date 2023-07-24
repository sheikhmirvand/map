import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
   <nav>
    <ul>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/product'>product</NavLink>
        </li>
        <li>
            <NavLink to='/pricing'>pricing</NavLink>
        </li>
    </ul>
   </nav>
  )
}

export default NavBar