import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useParams } from "react-router-dom";
import { Services } from "../services";

export function AdminEditView(props) {
    let abortController = new AbortController();

    const { RoleService, CountryService } = Services;

    const {id} = useParams();

    const useAdmin = Hooks.useAdmin();

    const [roles, setRoles] = useState([]);
    const [countries, setCountries] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useAdmin.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useAdmin.updateAdmin(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useAdmin.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        useAdmin.setIsDisabled(true);

        try {
            await useAdmin.getAdmin(id, abortController.signal);
            
            const [rolesRes, countriesRes] = await Promise.all([
                RoleService.getAll(abortController.signal),
                CountryService.getAll(abortController.signal)
              ]);
            
            setRoles(rolesRes.roles);
            setCountries(countriesRes.countries);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useAdmin.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                </ol>
                <h6 className="slim-pagetitle">Modifier le membre</h6>
            </div> 
            <div className="row" style={{maxWidth: "600px"}}>
                <div className="col-12">
                    <div className="card card-table mb-4 p-3 rounded">
                        <Components.ErrorMessages>
                            {errorMessages}
                        </Components.ErrorMessages>
                        <Components.AdminForm useAdmin={useAdmin} roles={roles} 
                        countries={countries} isDisabled={useAdmin.isDisabled} 
                        handleFormSubmit={handleFormSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}