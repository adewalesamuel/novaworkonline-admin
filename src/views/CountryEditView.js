import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useParams } from "react-router-dom";

export function CountryEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useCountry = Hooks.useCountry();

    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCountry.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCountry.updateCountry(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useCountry.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        useCountry.setIsDisabled(true);

        try {
            await useCountry.getCountry(id, abortController.signal);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useCountry.setIsDisabled(false);
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
                <h6 className="slim-pagetitle">Modifier le pays</h6>
            </div> 
            <div className="row" style={{maxWidth: "600px"}}>
                <div className="col-12">
                    <div className="card card-table mb-4 p-3 rounded">
                        <Components.ErrorMessages>
                            {errorMessages}
                        </Components.ErrorMessages>
                        <Components.CountryForm useCountry={useCountry}
                        isDisabled={useCountry.isDisabled} handleFormSubmit={handleFormSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}