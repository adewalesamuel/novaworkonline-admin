export function MessageForm(props) {

    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='emaail'>Destinataire</label>
                        <input className='form-control' type='text' id='emaail' name='email' 
                        placeholder='Name' value={props.email ?? ''} readOnly
                        disabled={props.isDisabled} required onChange={ e => 
                        props.setEmail(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='message'>Message</label>
                        <textarea className='form-control' type='text' id='message' name='message' 
                        value={props.message ?? ''} disabled={props.isDisabled} rows={4} 
                        onChange={ e => props.setMessage(e.target.value) ?? null}></textarea>
                    </div>
                </div>
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='button' 
                    className='btn btn-primary' onClick={props.handleFormSubmit}>
                        <span>Envoyer le message</span>
                    </button>
                </div>
            </div>
        </form>
    )
}