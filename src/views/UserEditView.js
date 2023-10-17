import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useParams } from "react-router-dom";
import { Services } from "../services";

export function UserEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useUser = Hooks.useUser();

    const [countries, setCountries] = useState([]);
    const [job_titles, setJob_titles] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useUser.updateUser(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useUser.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            await useUser.getUser(id, abortController.signal);
            
            const {JobTitleService, CountryService} = Services;

            const [job_titlesRes, countriesRes] = await Promise.allSettled([
                JobTitleService.getAll(abortController.signal),
                CountryService.getAll(abortController.signal)
            ]);

            setJob_titles(job_titlesRes.value.job_titles);
            setCountries(countriesRes.value.countries);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useUser.setIsDisabled(false);
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
                <h6 className="slim-pagetitle">Modifier les infos candidats</h6>
            </div> 
            <Components.Container>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4 p-3 rounded">
                            <Components.ErrorMessages>
                                {errorMessages}
                            </Components.ErrorMessages>
                            <Components.UserForm useUser={useUser} countries={countries} job_titles={job_titles}
                            isDisabled={useUser.isDisabled} handleFormSubmit={handleFormSubmit}/>
                        </div>
                    </div>
                </div>
            </Components.Container>
        </>
    )
}