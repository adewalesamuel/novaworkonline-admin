import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useParams } from "react-router-dom";
import { Services } from "../services";

export function RecruiterEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useRecruiter = Hooks.useRecruiter();

    const [countries, setCountries] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRecruiter.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRecruiter.updateRecruiter(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useRecruiter.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        useRecruiter.setIsDisabled(true);

        try {
            await useRecruiter.getRecruiter(id, abortController.signal);
            
            const { countries } = await Services.CountryService.getAll(
                abortController.signal);

            setCountries(countries);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useRecruiter.setIsDisabled(false);
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
                <h6 className="slim-pagetitle">Modifier les infos du recruteur</h6>
            </div> 
            <Components.Container>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-table mb-4 p-3 rounded">
                            <Components.ErrorMessages>
                                {errorMessages}
                            </Components.ErrorMessages>
                            <Components.RecruiterForm useRecruiter={useRecruiter} countries={countries}
                            isDisabled={useRecruiter.isDisabled} handleFormSubmit={handleFormSubmit}/>
                        </div>
                    </div>
                </div>
            </Components.Container>
        </>
    )
}