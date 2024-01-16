import { Components } from '..'
import { Services } from '../../services';

export function AdminForm(props) {
    let abortController = new AbortController();

    const handleFileUpload = async file => {
        props.useAdmin.setIsDisabled(true);
        props.setErrorMessages([]);
        
        try {
            const formData = new FormData();

            formData.append('img', file);
            
            const {img_url} = await Services.FileService.store(
                formData, abortController.signal);

            props.useAdmin.setProfil_img_url(img_url);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => props.setErrorMessages(messages));
            console.log(error);
        }finally {props.useAdmin.setIsDisabled(false)}
    }

    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='profil_img_url'>Image de profil</label>
                        <Components.ImageFileInput img_url={props.useAdmin.profil_img_url} 
                        handleFileChange={handleFileUpload}/>
                    </div>
                </div>
				<div className='col-6'>
                    <div className='form-group'>
                        <label htmlFor='lastname'>Nom</label>
                        <input className='form-control' type='text' id='lastname' name='lastname' 
                        placeholder='Nom' value={props.useAdmin.lastname ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setLastname(e.target.value) ?? null} required/>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-group'>
                        <label htmlFor='firstname'>Prénom</label>
                        <input className='form-control' type='text' id='firstname' name='firstname' 
                        placeholder='Prénom' value={props.useAdmin.firstname ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setFirstname(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder='Email' value={props.useAdmin.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                        props.useAdmin.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-6'>
                    <div className='form-group'>
                        <label htmlFor='phone_number'>Numéro de téléphone</label>
                        <input className='form-control' type='text' id='phone_number' name='phone_number' 
                        placeholder='Numéro de téléphone' value={props.useAdmin.phone_number ?? ''}
                        disabled={props.isDisabled}  onChange={ e => 
                        props.useAdmin.setPhone_number(e.target.value) ?? null} required/>
                    </div>
                </div>
				{/* <div className='col-6'>
                    <div className='form-group'>
                        <label htmlFor='country_id'>Pays</label>
                        <select className='select2 form-control' id='country_id' name='country_id' 
                        value={props.useAdmin.country_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setCountry_id(e.target.value) ?? null} required>
                            {
                                props.countries.map(country => {
                                    return (<option key={Math.random()} value={country.id ?? ''}>
                                        {country.name}</option>)
                                })
                            } 
                        </select>
                    </div>
                </div> */}
				<div className='col-6'>
                    <div className='form-group'>
                        <label htmlFor='role_id'>Niveau d'access</label>
                        <select className='select2 form-control' id='role_id' name='role_id' 
                        value={props.useAdmin.role_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setRole_id(e.target.value) ?? null} required>
                            {
                                props.roles.map(role => {
                                    return (<option key={Math.random()} value={role.id ?? ''}>
                                        {role.name}</option>)
                                })
                            } 
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder='Mot de passe' value={props.useAdmin.password ?? ''}
                        disabled={props.isDisabled}  onChange={ e => 
                        props.useAdmin.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='button' className='btn btn-primary' 
                    onClick={props.handleFormSubmit}>
                        <span>Enregistrer</span>
                    </button>
                </div>
            </div>
        </form>
    )
}