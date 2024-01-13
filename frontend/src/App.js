import bg from './img/bg.png'
import React, {useMemo} from 'react';
import styled from 'styled-components'
import { MainLayout } from './styles/Layout';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Incomes from './Components/Incomes/Incomes';
import Expenses from './Components/Expenses/Expenses';
import Dashboard from './Components/Dashboard/Dashboard';
import { useGlobalContext } from './context/globalContext';
import Register from './Components/Registration/Register';
import { Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login';
import RequireAuth from './context/requireAuth';
import AdminPanel from './Components/AdminPanel/AdminPanel';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const [active, setActive] = React.useState(1);
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])
  const global = useGlobalContext();
  console.log(global)

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard/>
        break;
      case 2:
        return <Dashboard/>
        break;
      case 3:
        return <Incomes/>
        break;
      case 4:
        return <Expenses/>
        break;    
      default:
        return <Dashboard/>
        break;
    }
  }

  const MainTabs = ({ active, setActive }) => {
    return (
      <>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </>
    );
  }
    return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>      
          <Routes> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPanel />} />
              
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<>
                                          <Navigation active={active} setActive={setActive} />
                                            <main>
                                              {displayData()}
                                            </main>
                                        </>} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
          </Routes>
        </MainLayout>
      </AppStyled>
    );
}

const AppStyled = styled.div`
  height: 100vh;
  backgorund-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
