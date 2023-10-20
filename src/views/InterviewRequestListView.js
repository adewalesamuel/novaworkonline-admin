import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function InterviewRequestListView(props) {
    let abortController = new AbortController();

    const { InterviewRequestService } = Services;

    const [searchParams] = useSearchParams();

    const tableAttributes = {
        'candidat': {},
        'recruteur': {},
        'status': {}
    }
    const tableActions = ['read', 'delete'];
    
    const navigate = useNavigate();

    const [interview_requests, setInterviewRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleReadClick = (e, data) => {
        e.preventDefault();
        navigate(`/demandes-entretien/${data.id}`);
    }
    const handleDeleteClick = async (e, interview_request) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'cette demande d\'entretien');

        if (isConfirmed) {
            const interview_requestsCopy = [...interview_requests];
            const index = interview_requestsCopy.findIndex(
                interview_requestitem => interview_requestitem.id === interview_request.id);

            interview_requestsCopy.splice(index, 1);
            setInterviewRequests(interview_requestsCopy);

            await InterviewRequestService.destroy(interview_request.id, abortController.signal);
        }
    }

    const parseInterviewRequestData = interview_requestData => {
        return (interview_requestData.map(interview_request => {
            return {
                'id': interview_request.id,
                'candidat': (<Link to={`/candidats/${interview_request.user?.id}`}>
                    {interview_request.user?.lastname} {interview_request.user?.firstname}</Link>),
                'recruteur': interview_request.recruiter?.company_name ?? "",
                'status': interview_request.status
            }
        } ));
    }

    const init = useCallback(async () => {
        try {
            const {interview_requests} = await InterviewRequestService.getAll(
                {page: page}, abortController.signal);
            const interview_requestData = parseInterviewRequestData(interview_requests.data);

            setInterviewRequests(interview_requestData);
            setPageLength(interview_requests.last_page)
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
                </ol>
                <h6 className="slim-pagetitle">Demandes d'entretien</h6>
            </div>
            <Components.Loader isLoading={isLoading}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4">
                            <div className="card-header">
                                <h6 className="slim-card-title">Liste des demandes</h6>
                            </div>
                            <div className="table-responsive">
                                <Components.Table controllers={{handleReadClick, handleDeleteClick}} 
                                tableAttributes={tableAttributes} tableActions={tableActions} 
                                tableData={interview_requests}/>
                            </div>
                            <Components.Pagination page={page} pageLength={pageLength} />
                        </div>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}