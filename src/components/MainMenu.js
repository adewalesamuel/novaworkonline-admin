import { Link, NavLink } from "react-router-dom";

export function Mainmenu(props){
    return (
        <div className="slim-sidebar">
            <label className="sidebar-label">Navigation</label>

            <ul className="nav nav-sidebar">
                <li className="sidebar-nav-item">
                    <NavLink to="/" className="sidebar-nav-link">
                        <i className="icon ion-ios-home-outline"></i> Tableau de blord
                    </NavLink>
                </li>
                <li className="sidebar-nav-item with-sub">
                    <NavLink to="/candidats" className="sidebar-nav-link">
                        <i className="icon ion-ios-person-outline"></i> Candidats
                    </NavLink>
                    <ul className="nav sidebar-nav-sub">
                        <li className="nav-sub-item">
                            <Link to="/candidats/creer" className="nav-sub-link">Ajouter</Link>
                        </li>
                        <li className="nav-sub-item">
                            <Link to="/candidats" className="nav-sub-link">Liste</Link>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-nav-item with-sub">
                    <NavLink to='/recruteurs' className="sidebar-nav-link">
                        <i className="icon ion-ios-people-outline"></i> Recruteurs
                    </NavLink>
                    <ul className="nav sidebar-nav-sub">
                        <li className="nav-sub-item">
                            <Link to="/recruteurs/creer" className="nav-sub-link">Ajouter</Link>
                        </li>
                        <li className="nav-sub-item">
                            <Link to="/recruteurs" className="nav-sub-link">Liste</Link>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink to="/candidats-qualifies" className="sidebar-nav-link">
                        <i className="icon ion-ios-personadd-outline"></i> Candidats qualifiés
                    </NavLink>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink to="/demandes-entretien" className="sidebar-nav-link">
                        <i className="icon ion-ios-briefcase-outline"></i> Demande d'entretien
                    </NavLink>
                </li>
                <li className="sidebar-nav-item with-sub">
                    <NavLink to="/recrutements" className="sidebar-nav-link">
                        <i className="icon ion-ios-briefcase-outline"></i> Candidats recrutés
                    </NavLink>
                    <ul className="nav sidebar-nav-sub">
                        <li className="nav-sub-item">
                            <Link to="" className="nav-sub-link">
                                Condidats avec un contrat en cours
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-nav-item with-sub">
                    <NavLink to='/formations' className="sidebar-nav-link">
                        <i className="icon ion-ios-book-outline"></i> Formations
                    </NavLink>
                    <ul className="nav sidebar-nav-sub">
                        <li className="nav-sub-item">
                            <Link to="/formations/creer" className="nav-sub-link">Ajouter</Link>
                        </li>
                        <li className="nav-sub-item">
                            <Link to="/formations" className="nav-sub-link">Liste</Link>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-nav-item with-sub">
                    <NavLink to="/paiements" className="sidebar-nav-link">
                        <i className="icon ion-card"></i> Paiements
                    </NavLink>
                    <ul className="nav sidebar-nav-sub">
                        <li className="nav-sub-item">
                            <Link to="" className="nav-sub-link">Recettes formations</Link>
                        </li>
                        <li className="nav-sub-item">
                            <Link to="" className="nav-sub-link">Abonnements recruteur</Link>
                        </li>
                        <li className="nav-sub-item">
                            <Link to="" className="nav-sub-link">Paiement candidat</Link>
                        </li>
                        <li className="nav-sub-item">
                            <Link to="" className="nav-sub-link">Commission de retrait sur salaire</Link>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink to="/paramettres" className="sidebar-nav-link">
                        <i className="icon ion-ios-gear-outline"></i> Paramettres
                    </NavLink>
                </li>
            </ul>
      </div>
    )
}