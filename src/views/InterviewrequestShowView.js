import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Services } from "../services";
import { Hooks } from "../hooks";

export function InterviewRequestShowView(props) {
    let abortController = new AbortController();

    const { InterviewRequestService } = Services;

    const { id } = useParams()

    const resume = Hooks.useResume();
    const useInterviewRequest = Hooks.useInterviewRequest();

    const [interview_request, setInterviewRequest] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const init = useCallback(async () => {
        try {
            const {interview_request} = await InterviewRequestService.getById(id, 
              abortController.signal);

            setInterviewRequest(interview_request);
            resume.fillResume(interview_request.user?.resume ?? {});
            useInterviewRequest.setId(interview_request.id);
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
                </ol>
                <h6 className="slim-pagetitle">Detail de la demande</h6>
            </div> 
            <div className="row row-sm">
              <div className="col-lg-6 mb-3">
                <div className="card card-profile">
                <div className="card-header">
                    <h5>Candidat</h5>
                  </div>
                  <div className="card-body">
                    <div className="media">
                      <img src={interview_request.user?.profil_img_url ?? 
                      "http://via.placeholder.com/500x500"} 
                      alt="" height={"120px"} style={{objectFit: 'cover'}}/>
                      <div className="media-body">
                        <h3 className="card-profile-name">
                          {interview_request.user?.lastname} {interview_request.user?.firstname
                        }</h3>
                        <p className="card-profile-position">
                          {interview_request.user?.job_title?.name ?? ""}
                        </p>

                        <p className="mg-b-0">{resume.profil ?? ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="card card-profile">
                  <div className="card-header">
                    <h5>Recruteur</h5>
                  </div>
                  <div className="card-body">
                    <div className="media">
                      <img src={interview_request.recruiter?.profil_img_url ?? 
                      "http://via.placeholder.com/500x500"} 
                      alt="" height={"120px"} style={{objectFit: 'cover'}}/>
                      <div className="media-body">
                        <h3 className="card-profile-name">
                          {interview_request.recruiter?.lastname} {interview_request.recruiter?.firstname}
                        </h3>
                        <p className="card-profile-position">
                          {interview_request.recruiter?.company_name ?? ""}
                        </p>
                        <p className="mg-b-0"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <ul className="nav nav-activity-profile mg-t-20">
                  <li className="nav-item">
                    <span className="nav-link" role="button">
                      <i className="icon ion-document-text tx-success"></i> Valider
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" role="button">
                      <i className="icon ion-ios-trash tx-danger"></i> Supprimer
                    </span>
                  </li>
                </ul>

              </div>
            </div>
        </>
    )
}