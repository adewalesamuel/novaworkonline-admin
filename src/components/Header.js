import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { Utils } from "../utils";
import { Services } from '../services';

export function Header(props) {
    const user = Utils.Auth.getUser() ?? {};

    const navigate = useNavigate();

    const handleLogoutClick = e => {
        e.preventDefault();
        Services.AuthService.logout();
        Utils.Auth.removeSessionToken();
        navigate('/connexion');
    }
    return (
        <div className="slim-header with-sidebar">
            <div className="container-fluid">
                <div className="slim-header-left">
                    <h2 className="slim-logo">
                        <Link to="/">
                            <img src={logo} width="80" alt="Novaworkonline logo"/>
                        </Link>
                    </h2>
                    <div className="search-box">
                        <input type="text" className="form-control" placeholder="Rechercher" />
                        <button className="btn btn-primary">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="slim-header-right">
                    <div className="dropdown dropdown-c">
                        <span className="logged-user" data-toggle="dropdown" role='button'
                        onClick={e => Utils.Dom.toggleElement('#dropdownMenu')}>
                            <img src={user.profil_img_url ?? "http://via.placeholder.com/500x500"} 
                                alt='' style={{objectFit:'cover'}}/>                            
                                <span>{user.lastname} {user.firstname}</span> <i className="fa fa-angle-down"></i>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right" id='dropdownMenu'>
                            <nav className="nav">
                                <Link to="/profil" className="nav-link">
                                    <i className="icon ion-person"></i> Profil
                                </Link>
                                <Link to="/paramettres" className="nav-link">
                                    <i className="icon ion-ios-gear"></i> Paramettres
                                </Link>
                                <span className="nav-link text-danger" onClick={handleLogoutClick} role='button'>
                                    <i className="icon ion-forward text-danger"></i> Deconnexion
                                </span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}