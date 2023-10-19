import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function RoleListView(props) {
    let abortController = new AbortController();

    const { RoleService } = Services;

    const tableAttributes = {
        'nom': {},
        'slug': {},
        'date de creation': {}
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [roles, setJob_titles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/paramettres/roles/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, country) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce role');

        if (isConfirmed) {
            const rolesCopy = [...roles];
            const index = rolesCopy.findIndex(countryitem => 
                countryitem.id === country.id);

            rolesCopy.splice(index, 1);
            setJob_titles(rolesCopy);

            await Services.RoleService.destroy(country.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {roles} = await RoleService.getAll(
                abortController.signal);
            const rolesData = roles.map(role => {
                return {
                    'id': role.id,
                    'nom': role.name,
                    'slug': role.slug,
                    'date de creation': role.created_at,
                }
            });

            setJob_titles(rolesData);
        } catch (error) {
            console.log(error);
        } finally {setIsLoading(false)};
    }, []);

    useEffect(() => {
      init();

      return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    return (
        <>
            <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                    <Link className="btn btn-info" to='/paramettres/roles/creer'>
                        <i className="con ion-plus"></i> Ajouter un role
                    </Link>
                </ol>
                <h6 className="slim-pagetitle">Role</h6>
            </div> 
            <div className="row">
                <div className="col-12">
                    <div className="card card-table mb-4">
                        <div className="card-header">
                            <h6 className="slim-card-title">Liste des role</h6>
                        </div>
                        <div className="table-responsive">
                            <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                            tableAttributes={tableAttributes} tableActions={tableActions} 
                            tableData={roles}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}