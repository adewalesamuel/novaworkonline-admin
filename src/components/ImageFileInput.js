export function ImageFileInput(props) {

    return (
        <span>
            <div className="mg-t-20 mg-sm-t-0" style={{position: 'relative', maxWidth: "80px"}}>
                <input type='file' onChange={e => props.handleFileChange(e.target.files[0])} 
                accept='image/*'style={{position: "absolute", top: 0, left: 0, width: '100%', 
                height: "100%", opacity: 0}} role='button'/>
                <img src={props.img_url !== '' ? props.img_url : "http://via.placeholder.com/500x500"} 
                className="img-fluid rounded" alt=""/>
            </div>
        </span>
    )
}