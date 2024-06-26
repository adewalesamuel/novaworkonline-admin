import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Services } from "../services";
import { Hooks } from "../hooks";
import { Components } from "../components";

export function InterviewRequestShowView(props) {
    let abortController = new AbortController();

    const { InterviewRequestService } = Services;

    const { id } = useParams()

    const resume = Hooks.useResume();
    const useInterviewRequest = Hooks.useInterviewRequest();

    const [interview_request, setInterviewRequest] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
            <Components.Loader isLoading={isLoading}>
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
                            {interview_request.user?.lastname} {interview_request.user?.firstname}
                          </h3>
                          <p className="card-profile-position">
                            {interview_request.user?.job_title?.name ?? ""}
                          </p>
                          <p className="mg-b-0">{resume.profil ?? ''}</p>
                          <div className="row">
                            <div className="col-6">
                              <strong className="d-block">Mail :</strong>
                              <span>{interview_request.user?.email ?? ""}</span>
                            </div>
                            <div className="col-6">
                              <strong className="d-block">Numéro :</strong>
                              <span>{interview_request.user?.phone_number ?? ""}</span>
                            </div>
                            <div className="col-6">
                              <strong className="d-block">Date de naissance :</strong>
                              <span>{interview_request.user?.birth_date ?? ""}</span>
                            </div>
                            <div className="col-6">
                              <strong className="d-block">Ville :</strong>
                              <span>{interview_request.user?.city ?? ""}</span>
                            </div>
                          </div>
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
                          <div className="row">
                            <div className="col-6">
                              <strong className="d-block">Mail :</strong>
                              <span>{interview_request.recruiter?.email ?? ""}</span>
                            </div>
                            <div className="col-6">
                              <strong className="d-block">Numéro :</strong>
                              <span>{interview_request.recruiter?.phone_number ?? ""}</span>
                            </div>
                            <div className="col-6">
                              <strong className="d-block">Date de naissance :</strong>
                              <span>{interview_request.recruiter?.birth_date ?? ""}</span>
                            </div>
                            <div className="col-6">
                              <strong className="d-block">Lieu :</strong>
                              <span>{interview_request.recruiter?.location ?? ""}</span>
                            </div>
                          </div>
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
            </Components.Loader> 
        </>
    )
}