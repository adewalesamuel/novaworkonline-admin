import { Link } from 'react-router-dom';
import { Components } from '../components';
import { useCallback, useEffect, useState } from 'react';
import { Services } from '../services';

import candidatIcon from '../assets/img/candidat.png';
import candidatQualifieIcon from '../assets/img/candidat-qualifie.png';
import recruteurIcon from '../assets/img/recruteur.png';

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
          <div className='row align-items-stretch'>
            <div className='col-lg-2 col-sm-6 col-12 pr-0'>
              <div className='card h-100 rounded' style={{border: "1px solid #2f1b66"}}>
                <div className='card-body d-flex p-2 flex-row align-items-start rounded'>
                  <img src={candidatIcon} width={"50px"} className="img-fluid mr-0" 
                  alt="" style={{
                    marginLeft: '-10px'
                    }}/>
                  <div className="dash-content">
                    <strong className="text-primary">Candidats</strong>
                    <h1 className='text-center text-primary'>{analytics.user_count ?? "--"}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-sm-6 col-12 pr-0'>
              <div className='card h-100 rounded' style={{border: "1px solid #2f1b66 "}}>
                <div className='card-body d-flex p-2 flex-row align-items-start rounded'>
                  <img src={candidatQualifieIcon} width={"50px"} className="img-fluid mr-0" 
                  alt="" style={{
                    marginLeft: '-10px'
                    }}/>
                  <div className="dash-content">
                    <strong className="" style={{color: "lime"}}>Candidats qualifiés</strong>
                    <h1 className='text-center text-primary'>{analytics.user_qualified_count ?? "--"}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-sm-6 col-12 pr-0'>
              <div className='card h-100 rounded' style={{border: "1px solid #2f1b66 "}}>
                <div className='card-body d-flex p-2 flex-row align-items-start rounded'>
                  <img src={candidatQualifieIcon} width={"50px"} className="img-fluid mr-0" 
                  alt="" style={{
                    marginLeft: '-10px'
                    }}/>
                  <div className="dash-content">
                    <strong style={{
                      color: "lime"
                    }}>Candidats en production</strong>
                    <h1 className='text-center text-primary'>{analytics.employee_count ?? "--"}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-sm-6 col-12 pr-0'>
              <div className='card h-100 rounded' style={{border: "1px solid #2f1b66 "}}>
                <div className='card-body d-flex p-2 flex-row align-items-start rounded'>
                  <img src={recruteurIcon} width={"50px"} className="img-fluid mr-0" 
                  alt="" style={{marginLeft:'-12px'}}/>
                  <div className="dash-content">
                    <strong className="text-primary">Recruteurs</strong>
                    <h1 className='text-center text-primary'>{analytics.recruiter_count ?? '--'}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-sm-6 col-12 pr-0'>
              <div className='card h-100 rounded' style={{border: "1px solid #2f1b66 "}}>
                <div className='card-body d-flex p-2 flex-row align-items-start rounded'>
                  <img src={candidatIcon} width={"50px"} className="img-fluid mr-0" 
                  alt="" style={{marginLeft: '-12px'}}/>
                  <div className="dash-content">
                    <strong className="text-primary">Paiements</strong>
                    <h1 className='text-center text-primary'>{"--"}</h1>
                  </div>
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