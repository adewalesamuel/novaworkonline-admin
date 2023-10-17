export function LoginForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className="form-group">
                    <input type='email' className="form-control" placeholder="Email" required
                    value={props.email} disabled={props.isDisabled ?? false} 
                    onChange={e =>props.setEmail(e.target.value)}/>
                </div>
                <div className="form-group mg-b-50">
                    <input type="password" className="form-control" placeholder="Mot de passe" 
                    value={props.password} disabled={props.isDisabled ?? false} required
                    onChange={e =>props.setPassword(e.target.value)}/>
                </div>
                <button className="btn btn-primary btn-block btn-signin" 
                onClick={props.handleFormSubmit ?? null} disabled={props.isDisabled ?? false}>
                    {props.isDisabled ? 'Chargement..' : 'Connexion'}
                </button>
        </form>
    )
}