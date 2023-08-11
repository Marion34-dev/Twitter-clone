import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import Footer from './Components/Footer';
import RoutedMain from './Components/RoutedMain';
import Authentication from './Components/authentication/Authentication';
import { checkLogin } from './Components/authentication/authHelper';
import AllPeeps from './Components/AllPeeps';
import samplePeepsData from './Components/utils/sampleData';

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
      <div className="container">
        <Header/>
 
      
         
        <AllPeeps data={samplePeepsData} className="ViewAll" />
        
                        
        {loggedIn ? (
          // Render RoutedMain if logged in
          <RoutedMain />
        ) : (
          // Render Authentication if not logged in
            <Authentication handleLogin={handleLogin} />
        )}

        <Footer />
        </div>
    </>
  );
}

export default App
