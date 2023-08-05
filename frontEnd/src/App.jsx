import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import Footer from './Components/Footer';
import RoutedMain from './Components/RoutedMain';
import Authentication from './Components/authentification/Authentication';
import { checkLogin } from './Components/authentification/authHelper';
import AllPeeps from './Components/AllPeeps';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoggedIn(await checkLogin({email, password}));
  }  

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      {/* <div className="header">
        <Header loggedIn={loggedIn} logout={logout} />
        {!loggedIn && <Authentication handleLogin={handleLogin} />}
        {loggedIn && <RoutedMain />}
        
      </div>

      <div>
        <AllPeeps className="ViewAll"/>
        <p>It works and you found me!</p>
      </div>
      
      <div>
        <Footer className="footer" />
      </div> */}
      <div className="container">
  
        <Header loggedIn={loggedIn} logout={logout} />
        {!loggedIn && <Authentication handleLogin={handleLogin} />}
        {loggedIn && <RoutedMain />}
        
        <p>It works and you found me!</p>
         {/* <AllPeeps className="ViewAll"/> */}
        <Footer />
        </div>
    </>
  );
}

export default App
