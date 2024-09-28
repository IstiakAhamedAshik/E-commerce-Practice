import Navbars from '../Navbars'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <Navbars />
      <Outlet />
    </div>
  )
}

export default Main
