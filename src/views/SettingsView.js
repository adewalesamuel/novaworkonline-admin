import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Views } from ".";
import { useEffect } from "react";

export function SettingsView(props) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (window.screen.availWidth > 1200)
            navigate('/paramettres/domaines');
    }, [])
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
                        <Route path='/pays/:id/modifier' element={<Views.CountryEditView />}/>
                        <Route path='/pays/creer' element={<Views.CountryCreateView />}/>
                        <Route path='/pays' element={<Views.CountryListView />}/>
                        <Route path='/domaines/:id/modifier' element={<Views.JobTitleEditView />}/>
                        <Route path='/domaines/creer' element={<Views.JobTitleCreateView />}/>
                        <Route path='/domaines' element={<Views.JobTitleListView />}/>
                    </Routes>
                </div>
                <div className="manager-left d-block">
                    <nav className="nav">
                        <NavLink to="/paramettres/domaines" className="nav-link">
                            <span>Domaines</span>
                        </NavLink>
                        <NavLink to="/paramettres/pays" className="nav-link">
                            <span>Pays</span>
                        </NavLink>
                        <NavLink to="/paramettres/roles" className="nav-link">
                            <span>Roles</span>
                        </NavLink>
                        <NavLink to="/paramettres/administrateurs" className="nav-link">
                            <span>Administrateurs</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </>
    )
}