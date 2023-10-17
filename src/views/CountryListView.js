import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Services } from "../services";
import { Components } from "../components";
import { Utils } from "../utils";

export function CountryListView(props) {
    let abortController = new AbortController();

    const { CountryService } = Services;

    const tableAttributes = {
        'nom': {},
        'code': {},
        'indicatif': {}
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [countries, setJob_titles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/paramettres/pays/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, country) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce pays');

        if (isConfirmed) {
            const countriesCopy = [...countries];
            const index = countriesCopy.findIndex(countryitem => 
                countryitem.id === country.id);

            countriesCopy.splice(index, 1);
            setJob_titles(countriesCopy);

            await Services.CountryService.destroy(country.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {countries} = await CountryService.getAll(
                abortController.signal);
            const countriesData = countries.map(country => {
                return {
                    'id': country.id,
                    'nom': country.name,
                    'code': country.code,
                    'indicatif': country.phone_code,
                }
            });

            setJob_titles(countriesData);
        } catch (error) {
            console.log(error);
        } finally {setIsLoading(false)};
    }, []);

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
                    <Link className="btn btn-info" to='/paramettres/pays/creer'>
                        <i className="con ion-plus"></i> Ajouter un pays
                    </Link>
                </ol>
                <h6 className="slim-pagetitle">Pays</h6>
            </div> 
            <div className="row">
                <div className="col-12">
                    <div className="card card-table mb-4">
                        <div className="card-header">
                            <h6 className="slim-card-title">Liste des pays</h6>
                        </div>
                        <div className="table-responsive">
                            <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                            tableAttributes={tableAttributes} tableActions={tableActions} 
                            tableData={countries}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}