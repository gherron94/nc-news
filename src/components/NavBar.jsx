import { NavLink } from "react-router-dom"

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <div className='divider'></div>
        <li>
          <NavLink to='/articles'>Articles</NavLink>
        </li>
        <div className='divider'></div>
      </ul>
    </nav>
  )
}