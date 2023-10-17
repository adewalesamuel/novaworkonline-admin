import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks"
import { Services } from "../services";
import { Utils } from "../utils";

export function ProfileView(props) {
    let abortController = new AbortController();
    const {CountryService, RoleService} = Services;

    const useAdmin = Hooks.useAdmin();

    const [countries, setCountries] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]); 

    const handleProfileSubmit = async e => {
        e.preventDefault();
        useAdmin.setIsDisabled(true);
        setErrorMessages([]);

        try {
            const {admin} = await useAdmin.updateProfile(abortController.signal);
            
            Utils.Auth.setUser(admin);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally {useAdmin.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        try {
            await useAdmin.getProfile(abortController.signal);

            const [countriesRes, rolesRes] = await Promise.all([
                CountryService.getAll(abortController.signal),
                RoleService.getAll(abortController.signal)
              ]);

            setCountries(countriesRes.countries);
            setRoles(rolesRes.roles);
        } catch (error) {
            console.log(error);
        } finally {useAdmin.setIsDisabled(false)};
    }, [])

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
                <h6 className="slim-pagetitle">Mon profil</h6>
            </div>
            <Components.Container>
                <Components.ErrorMessages>
                    {errorMessages}
                </Components.ErrorMessages>
                <Components.AdminForm useAdmin={useAdmin} isDisabled={useAdmin.isDisabled} 
                handleFormSubmit={handleProfileSubmit} countries={countries} roles={roles}
                setErrorMessages={setErrorMessages}/>
            </Components.Container>
        </>
    )
}