import { Outlet } from 'react-router-dom';
import Forgot from './authentication/Forgot';
import Login from './authentication/Login';
import Register from './authentication/Register';

function Container() {

  return (
    <div>
      <div className="super_container">
          <Outlet/>
          <Login />
          <Register />
          <Forgot />
      </div>
    </div>
  );
}

export default Container;
