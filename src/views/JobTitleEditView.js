import { useCallback, useEffect, useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useParams } from "react-router-dom";

export function JobTitleEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useJobTitle = Hooks.useJobTitle();

    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useJobTitle.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useJobTitle.updateJobTitle(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useJobTitle.setIsDisabled(false)}
    }

    const init = useCallback(async () => {
        useJobTitle.setIsDisabled(true);

        try {
            await useJobTitle.getJobTitle(id, abortController.signal);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useJobTitle.setIsDisabled(false);
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
                <h6 className="slim-pagetitle">Modifier le domaine</h6>
            </div> 
            <div className="row" style={{maxWidth: "600px"}}>
                <div className="col-12">
                    <div className="card card-table mb-4 p-3 rounded">
                        <Components.ErrorMessages>
                            {errorMessages}
                        </Components.ErrorMessages>
                        <Components.JobTitleForm useJobTitle={useJobTitle}
                        isDisabled={useJobTitle.isDisabled} handleFormSubmit={handleFormSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}