import { Components } from '..'

export function JobTitleForm(props) {

    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Nom</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Nom' value={props.useJobTitle.name ?? ''}
                        disabled={props.isDisabled} required onChange={ e => 
                        props.useJobTitle.setName(e.target.value) ?? null}/>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='course_link_url'>Lien de le formation</label>
                        <input className='form-control' type='url' id='course_link_url' name='course_link_url' 
                        placeholder='Lien' value={props.useJobTitle.course_link_url ?? ''}
                        disabled={props.isDisabled} required onChange={ e => 
                        props.useJobTitle.setCourse_link_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea className='form-control' type='text' id='description' name='description' 
                        placeholder='Description' value={props.useJobTitle.description ?? ''}
                        disabled={props.isDisabled} rows={3} required onChange={ e => 
                        props.useJobTitle.setDescription(e.target.value) ?? null}></textarea>
                    </div>
                </div>
				{/* <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='icon_url'>Icon_url</label>
                        <input className='form-control' type='text' id='icon_url' name='icon_url' 
                        placeholder='Icon_url' value={props.useJobTitle.icon_url ?? ''}
                        disabled={props.isDisabled} 
                        onChange={ e => props.useJobTitle.setIcon_url(e.target.value) ?? null} required/>
                    </div>
                </div> */}
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='button' 
                    className='btn btn-primary' onClick={props.handleFormSubmit}>
                        <span>Enregistrer</span>
                    </button>
                </div>
            </div>
        </form>
    )
}