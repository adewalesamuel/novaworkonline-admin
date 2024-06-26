import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";
import Select from "react-select";

export function AdminListView(props) {
    let abortController = new AbortController();

    const { AdminService } = Services;

    const tableAttributes = {
        'nom': {},
        'role': {},
        'date de creation': {}
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [admins, setJob_titles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/paramettres/admins/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, country) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce admin');

        if (isConfirmed) {
            const adminsCopy = [...admins];
            const index = adminsCopy.findIndex(countryitem => 
                countryitem.id === country.id);

            adminsCopy.splice(index, 1);
            setJob_titles(adminsCopy);

            await Services.AdminService.destroy(country.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {admins} = await AdminService.getAll(
                abortController.signal);
            const adminsData = admins.map(admin => {
                return {
                    'id': admin.id,
                    'nom': `${admin.lastname ?? ""} ${admin.firstname ?? ""}`,
                    'role': admin.role?.name,
                    'date de creation': admin.created_at,
                }
            });

            setJob_titles(adminsData);
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
                    <Link className="btn btn-info" to='/paramettres/admins/creer'>
                        <i className="con ion-plus"></i> Ajouter un membre
                    </Link>
                </ol>
                <h6 className="slim-pagetitle">Membres d'equipe</h6>
            </div> 
            <Components.Loader isLoading={isLoading}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4">
                            <div className="card-header">
                                <h6 className="slim-card-title">Liste des membres</h6>
                            </div>
                            <div className="table-responsive">
                                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                                tableAttributes={tableAttributes} tableActions={tableActions} 
                                tableData={admins}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}