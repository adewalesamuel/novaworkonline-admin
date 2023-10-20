import { Link } from 'react-router-dom';
import { Components } from '../components';
import { useCallback, useEffect, useState } from 'react';
import { Services } from '../services';

import candidatIcon from '../assets/img/candidats-icon.png';
import recruteurIcon from '../assets/img/recruteurs-icon.png';

export function DashboardView(props) {
    let abortController = new AbortController();
    let {AdminService, UserService, RecruiterService} = Services;

    const userTableAttributes = {
      'nom et prenoms': {},
      'domaine': {}
    }
    const recruiterTableAttributes = {
      'companie': {},
      'nom du responsable': {}
    }
    const tableActions = [];

    const [isLoading, setIsLoading] = useState(true);
    const [analytics, setAnalytics] = useState({});
    const [usersQualified, setUsersQualified] = useState([]);
    const [recruiters, setRecruiters] = useState([]);

    const init = useCallback(async () => {
      try {
        const analytics = await AdminService.analytics(abortController.signal);

        setAnalytics(analytics);

        const [userQualifedRes, recruiterRes] = await Promise.all([
          UserService.getQualified(abortController.signal),
          RecruiterService.getAll(abortController.signal)
        ]);

        const usersData = userQualifedRes.users.data.map(user => {
          return {
            'nom et prenoms': `${user.lastname ?? ""} ${user.firstname ?? ""}`,
            'domaine': user.job_title?.name ?? ""
          }
        });
        const recruitersData = recruiterRes.recruiters.data.map(recruiter => {
          return {
            'companie': recruiter.company_name,
            'nom du responsable':`${recruiter.lastname ?? ""} ${recruiter.firstname ?? ""}`
          }
        });

        setUsersQualified(usersData);
        setRecruiters(recruitersData);
       } catch (error) {
        console.log(error);
      }finally{setIsLoading(false)}
    }, [])

    useEffect(() => {
      init()
    }, [init])
    
    return (
        <>
          <div className="slim-pageheader">
            <ol className="breadcrumb slim-breadcrumb">
            </ol>
            <h6 className="slim-pagetitle">Tableau de bord</h6>
          </div>

          <div className="card card-dash-one mg-t-20">
            <div className="row no-gutters">
              <div className="col-lg-3 col-sm-6 col-12">
                <i className="icon ion-ios-personadd-outline"></i>
                <div className="dash-content">
                  <label className="tx-primary">Candidats</label>
                  <h2>{analytics.user_count ?? "--"}</h2>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <img src={candidatIcon} width="70px" alt=""/>
                <div className="dash-content">
                  <label className="tx-success">Candidats qualifiés</label>
                  <h2>{analytics.user_qualified_count ?? "--"}</h2>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <i className="icon ion-ios-briefcase-outline"></i>
                <div className="dash-content">
                  <label className="tx-success">Candidats recrutés</label>
                  <h2>{analytics.employee_count ?? "--"}</h2>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <img src={recruteurIcon} width="70px" alt=""/>
                <div className="dash-content">
                  <label className="tx-purple">Recruteurs</label>
                  <h2>{analytics.recruiter_count ?? '--'}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-dash-one mg-t-20">
            <div className="row no-gutters">
              <div className="col-lg-3 col-sm-6 col-12">
                <i className="icon ion-cash"></i>
                <div className="dash-content">
                  <label className="tx-danger">Paiements</label>
                  <h2>--</h2>
                </div>
              </div>
            </div>
          </div>

          <Components.Loader isLoading={isLoading}>
            <div className="row row-sm mg-t-20">
              <div className="col-xl-6">
                <div className="card card-table">
                  <div className="card-header">
                    <h6 className="slim-card-title">Nouveaux Candidats qualifiés</h6>
                  </div>
                  <div className="table-responsive">
                    <Components.Table tableAttributes={userTableAttributes} controllers={{}}
                    tableActions={tableActions} tableData={usersQualified}/>
                  </div>
                  <div className="card-footer tx-12 pd-y-15 bg-transparent">
                    <Link to="/candidats-qualifies">
                      <i className="fa fa-angle-down mg-r-5"></i>Voir tous les candidats
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 mg-t-20 mg-xl-t-0">
                <div className="card card-table">
                  <div className="card-header">
                    <h6 className="slim-card-title">Nouveaux Recruteurs</h6>
                  </div>
                  <div className="table-responsive">
                    <Components.Table tableAttributes={recruiterTableAttributes} controllers={{}}
                    tableActions={tableActions} tableData={recruiters}/>
                  </div>
                  <div className="card-footer tx-12 pd-y-15 bg-transparent">
                    <Link to="/recruteurs">
                      <i className="fa fa-angle-down mg-r-5"></i>Voir tous les recruteurs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Components.Loader>
        </>
    )
}