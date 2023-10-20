import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function JobTitleListView(props) {
    let abortController = new AbortController();

    const { JobTitleService } = Services;

    const tableAttributes = {
        'nom': {},
        'date de creation': {}
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [job_titles, setJob_titles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/paramettres/domaines/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, job_title) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce domaine');

        if (isConfirmed) {
            const job_titlesCopy = [...job_titles];
            const index = job_titlesCopy.findIndex(job_titleitem => 
                job_titleitem.id === job_title.id);

            job_titlesCopy.splice(index, 1);
            setJob_titles(job_titlesCopy);

            await Services.JobTitleService.destroy(job_title.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {job_titles} = await JobTitleService.getAll(
                abortController.signal);
            const job_titlesData = job_titles.map(job_title => {
                return {
                    'id': job_title.id,
                    'nom': job_title.name,
                    'date de creation': job_title.created_at,
                }
            });

            setJob_titles(job_titlesData);
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
                    <Link className="btn btn-info" to='/paramettres/domaines/creer'>
                        <i className="con ion-plus"></i> Ajouter un domaine
                    </Link>
                </ol>
                <h6 className="slim-pagetitle">Domaines</h6>
            </div> 
            <Components.Loader isLoading={isLoading}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4">
                            <div className="card-header">
                                <h6 className="slim-card-title">Liste des domaines</h6>
                            </div>
                            <div className="table-responsive">
                                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                                tableAttributes={tableAttributes} tableActions={tableActions} 
                                tableData={job_titles}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}