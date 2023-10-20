import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function RecruiterListView(props) {
    let abortController = new AbortController();
    const { RecruiterService } = Services;

    const [searchParams, setSearchParams] = useSearchParams();

    const tableAttributes = {
        'companie': {},
        'responsable': {},
        'date d\'inscription': {}
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [recruiters, setRecruiters] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/recruteurs/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, recruiter) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce recruteur');

        if (isConfirmed) {
            const recruitersCopy = [...recruiters];
            const index = recruitersCopy.findIndex(recruiteritem => 
                recruiteritem.id === recruiter.id);

            recruitersCopy.splice(index, 1);
            setRecruiters(recruitersCopy);

            await Services.RecruiterService.destroy(recruiter.id, 
                abortController.signal);
        }
    }

    const parseRecruiterData = recruiterData => {
        return (recruiterData.map(recruiter => {
            return {
                'id': recruiter.id,
                'companie': recruiter.company_name,
                'responsable': `${recruiter.lastname} ${recruiter.firstname}`,
                'date d\'inscription': recruiter.created_at
            }
        } ));
    }

    const init = useCallback(async () => {
        try {
            const {recruiters} = await RecruiterService.getAll(
                {page: page}, abortController.signal);
            const recruiterData = parseRecruiterData(recruiters.data);

            setRecruiters(recruiterData);
            setPageLength(recruiters.last_page)
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
                    <Link className="btn btn-info" to='/recruteurs/creer'>
                        <i className="con ion-plus"></i> Ajouter un recruteur
                    </Link>
                </ol>
                <h6 className="slim-pagetitle">Recruteurs</h6>
            </div> 
            <Components.Loader isLoading={isLoading}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4">
                            <div className="card-header">
                                <h6 className="slim-card-title">Liste des recruteurs</h6>
                            </div>
                            <div className="table-responsive">
                                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                                tableAttributes={tableAttributes} tableActions={tableActions} 
                                tableData={recruiters}/>
                            </div>
                            <Components.Pagination page={page} pageLength={pageLength} />
                        </div>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}