import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function EmployeeListView(props) {
    let abortController = new AbortController();
    const { EmployeeService } = Services;

    const [searchParams, setSearchParams] = useSearchParams();

    const tableAttributes = {
        'candidat': {},
        'recruteur': {},
        'date de recrutement': {}
    }
    const tableActions = ['delete'];

    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleDeleteClick = async (e, employee) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce recrutement');

        if (isConfirmed) {
            const employeesCopy = [...employees];
            const index = employeesCopy.findIndex(employeeitem => 
                employeeitem.id === employee.id);

            employeesCopy.splice(index, 1);
            setEmployees(employeesCopy);

            await EmployeeService.destroy(employee.id, 
                abortController.signal);
        }
    }

    const parseEmployeeData = employeeData => {
        return (employeeData.map(employee => {
            return {
                'id': employee.id,
                'candidat': (<Link to={`/candidats/${employee.user.id}`}>
                    {employee.user.lastname} {employee.user.firstname}</Link>),
                'recruteur': (<Link to={`/recruteurs/${employee.recruiter.id}`}>
                    {employee.recruiter.company_name}</Link>),
                'date de recrutement': employee.created_at
            }
        } ));
    }

    const init = useCallback(async () => {
        try {
            const {employees} = await EmployeeService.getAll(
                {page: page}, abortController.signal);
            const employeeData = parseEmployeeData(employees.data);

            setEmployees(employeeData);
            setPageLength(employees.last_page)
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
                <h6 className="slim-pagetitle">Recrutements</h6>
            </div> 
            <Components.Loader isLoading={isLoading}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4">
                            <div className="card-header">
                                <h6 className="slim-card-title">Liste des recrutement</h6>
                            </div>
                            <div className="table-responsive">
                                <Components.Table controllers={{handleDeleteClick}} 
                                tableAttributes={tableAttributes} tableActions={tableActions} 
                                tableData={employees}/>
                            </div>
                            <Components.Pagination page={page} pageLength={pageLength} />
                        </div>
                    </div>
                </div>
            </Components.Loader>
        </>
    )
}