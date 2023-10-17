import { useState } from "react";
import { Components } from "../components";
import { Hooks } from "../hooks";
import { useNavigate } from "react-router-dom";

export function JobTitleCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useJobTitle = Hooks.useJobTitle();

    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useJobTitle.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useJobTitle.createJobTitle(abortController.signal);
            navigate('/paramettres/domaines');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{useJobTitle.setIsDisabled(false)}
    }

    return (
        <>
            <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                </ol>
                <h6 className="slim-pagetitle">Créer un domaine</h6>
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