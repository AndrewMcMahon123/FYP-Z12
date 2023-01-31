// import useAuth0 hook
//import { Auth } from './Auth';
import {LoginComponent} from './Auth';

const DashbboardComponent = () => {

if (LoginComponent.isAuthenticated && !localStorage.getItem('token')) {
    return (
        alert('You are not logged in')
    );
}

  return (
    <div>
      <h1>User verified. This is Mr.Dashboard</h1>
    </div>
  );
}

export default DashbboardComponent;