import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function UserQualifiedListView(props) {
    let abortController = new AbortController();
    const { UserService } = Services;

    const [searchParams, setSearchParams] = useSearchParams();

    const tableAttributes = {
        'nom et prenoms': {},
        'domaine': {},
        'date d\'inscription': {}
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/candidats/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, user) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce candidat');

        if (isConfirmed) {
            const usersCopy = [...users];
            const index = usersCopy.findIndex(useritem => useritem.id === user.id);

            usersCopy.splice(index, 1);
            setUsers(usersCopy);

            await Services.UserService.destroy(user.id, abortController.signal);
        }
    }

    const parseUserData = userData => {
        return (userData.map(user => {
            return {
                'id': user.id,
                'nom et prenoms': (<Link to={`/candidats/${user.id}`}>
                    {user.lastname} {user.firstname}</Link>),
                'domaine': user.job_title?.name ?? "",
                'date d\'inscription': user.created_at
            }
        } ));
    }

    const init = useCallback(async () => {
        try {
            const {users} = await UserService.getQualified(
                {page: page}, abortController.signal);
            const userData = parseUserData(users.data);

            setUsers(userData);
            setPageLength(users.last_page)
        } catch (error) {
            console.log(error);
        } finally {setIsLoading(false)};
    }, [page]);

    useEffect(() => {
      init();

      return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    useEffect(() => {
        setPage(parseInt(searchParams.get('page') ?? 1));
    },[searchParams.get('page')]);

    return (
        <>
            <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                    <Link className="btn btn-info" to='/candidats/creer'>
                        <i className="con ion-plus"></i> Ajouter un candidat
                    </Link>
                </ol>
                <h6 className="slim-pagetitle">Candidats qualifiés</h6>
            </div>
            <Components.Loader isLoading={isLoading}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4">
                            <div className="card-header">
                                <h6 className="slim-card-title">Liste des candidats qualifiés</h6>
                            </div>
                            <div className="table-responsive">
                                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                                tableAttributes={tableAttributes} tableActions={tableActions} 
                                tableData={users}/>
                            </div>
                            <Components.Pagination page={page} pageLength={pageLength} />
                        </div>
                    </div>
                </div>
            </Components.Loader> 
        </>
    )
}