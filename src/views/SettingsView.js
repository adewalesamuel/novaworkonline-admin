import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Views } from ".";
import { useEffect } from "react";

export function SettingsView(props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    useEffect(() => {
        if (pathname !== '/paramettres') return;
        if (window.innerWidth <= 1200) return;
        
        navigate('/paramettres/pays');
    }, [pathname])
    return (
        <>
            <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                </ol>
                <h6 className="slim-pagetitle">Paramettres</h6>
            </div>
            <div className="manager-wrapper">
                <div className="manager-right">
                    <Routes>
                        <Route path='/admins/:id/modifier' element={<Views.AdminEditView />}/>
                        <Route path='/admins/creer' element={<Views.AdminCreateView />}/>
                        <Route path='/admins' element={<Views.AdminListView />}/>
                        <Route path='/roles/:id/modifier' element={<Views.RoleEditView />}/>
                        <Route path='/roles/creer' element={<Views.RoleCreateView />}/>
                        <Route path='/roles' element={<Views.RoleListView />}/>
                        <Route path='/pays/:id/modifier' element={<Views.CountryEditView />}/>
                        <Route path='/pays/creer' element={<Views.CountryCreateView />}/>
                        <Route path='/pays' element={<Views.CountryListView />}/>
                    </Routes>
                </div>
                <div className="manager-left d-block">
                    <nav className="nav">
                        <NavLink to="/paramettres/pays" className="nav-link">
                            <span>Pays</span>
                        </NavLink>
                        <NavLink to="/paramettres/roles" className="nav-link">
                            <span>Roles</span>
                        </NavLink>
                        <NavLink to="/paramettres/admins" className="nav-link">
                            <span>Equipe</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </>
    )
}