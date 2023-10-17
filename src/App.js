import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Views } from './views';
import { Routes as AppRoutes} from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/connexion' element={<Views.LoginView />}/>
        <Route path='*' element={<AppRoutes.MainRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
