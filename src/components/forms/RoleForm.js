import Select from "react-select";

export function RoleForm(props) {

    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useRole.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                        props.useRole.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>Permissions</label>
                        <Select isMulti={true} value={ props.useRole.permissions } 
                        options={props.permissions} isDisabled={props.isDisabled ?? false}
                        placeholder="Selectionnez des permissions" closeMenuOnSelect={false}
                        onChange={props.useRole.setPermissions} styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,padding: "0.1252rem 0.25rem",fontSize: "0.875rem"
                            }),
                          }}/>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='button' 
                    className='btn btn-primary' 
                    onClick={props.handleFormSubmit}>
                        <span>Enregistrer</span>
                    </button>
                </div>
            </div>
        </form>
    )
}