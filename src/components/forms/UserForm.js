import { Components } from "..";
import { Services } from "../../services";

export function UserForm(props) {
    const abortController = new AbortController(); 

    const handleFileUpload = async file => {
        props.useUser.setIsDisabled(true);
        
        try {
            const formData = new FormData();

            formData.append('img', file);
            
            const {img_url} = await Services.FileService.store(
                formData, abortController.signal);

            props.useUser.setProfil_img_url(img_url);
        } catch (error) {
            
        }finally {props.useUser.setIsDisabled(false)}
    }

    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='profil_img_url'>Photo de profil</label>
                        <Components.ImageFileInput handleFileChange={handleFileUpload} 
                        img_url={props.useUser.profil_img_url}/>
                    </div>
                </div>
                <div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='lastname'>Nom de famille</label>
                        <input className='form-control' type='text' id='lastname' name='lastname' 
                        placeholder='Nom de famille' value={props.useUser.lastname ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setLastname(e.target.value) ?? null} required/>
                    </div>
                </div>
                <div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='firstname'>Prénom</label>
                        <input className='form-control' type='text' id='firstname' name='firstname' 
                        placeholder='Prénom' value={props.useUser.firstname ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setFirstname(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='email'>Adresse e-mail</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder='Adresse e-mail' value={props.useUser.email ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
                <div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='phone_number'>Numéro de téléphone</label>
                        <input className='form-control' type='text' id='phone_number' name='phone_number' 
                        placeholder='Numéro de téléphone' value={props.useUser.phone_number ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setPhone_number(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='birth_date'>Date de naissance</label>
                        <input className='form-control' type='date' id='birth_date' name='birth_date' 
                        placeholder='Date de naissance' value={props.useUser.birth_date ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setBirth_date(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='gender'>Genre</label>
                        <select className='form-control' type='text' id='gender' name='gender' 
                        disabled={props.isDisabled} value={props.useUser.gender} onChange={ e => 
                        props.useUser.setGender(e.target.value) ?? null} required>
                            <option value={"M"}>Homme</option>
                            <option value={"F"}>Femme</option>
                            <option value={"O"}>Autre</option>
                        </select>
                    </div>
                </div>
				<div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='city'>Ville</label>
                        <input className='form-control' type='text' id='city' name='city' 
                        placeholder='Ville' value={props.useUser.city ?? ''}disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setCity(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12 col-sm-6'>
                    <div className='form-group'>
                        <label htmlFor='country_id'>Pays</label>
                        <select className='select2 form-control' id='country_id' name='country_id' 
                        value={props.useUser.country_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setCountry_id(e.target.value) ?? null} required>
                            {
                                props.countries.map(country => {
                                    return (<option key={Math.random()} value={country.id ?? ''}>
                                        {country.name}</option>)
                                })
                            } 
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='job_title_id'>Domaine</label>
                        <select className='select2 form-control' id='job_title_id' name='job_title_id'
                        value={props.useUser.job_title_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setJobtitle_id(e.target.value) ?? null} required>
                            {
                                props.job_titles.map(job_title => {
                                    return (<option key={Math.random()} value={job_title.id ?? ''}>
                                        {job_title.name}</option>)
                                })
                            } 
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder='Mot de passe' value={props.useUser.password ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='button' 
                    className='btn btn-primary px-5 rounded' onClick={props.handleFormSubmit}>
                        <span>{props.isDisabled ? "Chargement..." : "Enregister"}</span>
                    </button>
                </div>
            </div>
        </form>
    )
}