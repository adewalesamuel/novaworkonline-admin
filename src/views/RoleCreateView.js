import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Services } from "../services";

export function RoleCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useRole = Hooks.useRole();

    const [permissions, setPermissions] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRole.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRole.createRole(abortController.signal);
            navigate('/paramettres/roles');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useRole.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        useRole.setIsDisabled(true);

        try {
            const { permissions } = await Services.PermissionService.getAll(
                abortController.signal);
            const permissionsData = permissions.map( permission => {
                    return {
                        value: permission.slug,
                        label: permission.name
                    }
                });

            setPermissions(permissionsData);
        } catch (error) {
            console.log(error);
        }finally {
            useRole.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                </ol>
                <h6 className="slim-pagetitle">Créer un role</h6>
            </div> 
            <div className="row" style={{maxWidth: "600px"}}>
                <div className="col-12">
                    <div className="card card-table mb-4 p-3 rounded">
                        <Components.ErrorMessages>
                            {errorMessages}
                        </Components.ErrorMessages>
                        <Components.RoleForm useRole={useRole} permissions={permissions}
                        isDisabled={useRole.isDisabled} handleFormSubmit={handleFormSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}