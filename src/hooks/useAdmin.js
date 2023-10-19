import { useState } from 'react';
import { Services } from '../services';

export const useAdmin = () => {
    const [id, setId] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [profil_img_url, setProfil_img_url] = useState('');
	const [api_token, setApi_token] = useState('');
	const [is_active, setIs_active] = useState('');
	const [country_id, setCountry_id] = useState('');
	const [role_id, setRole_id] = useState('');
	

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getAdmin = (id, signal) => {        
        return Services.AdminService.getById(id, signal)
        .then(response => {
            fillAdmin(response.admin);
            setIsDisabled(false);
        });
    }
    
	const getProfile = (signal) => {        
        return Services.AdminService.getProfile(signal)
        .then(response => {
            fillAdmin(response.admin);
            setIsDisabled(false);
        });
    }

    const createAdmin = signal => {
        const payload = {
            firstname,
		lastname,
		email,
		phone_number,
		profil_img_url,
		country_id,
		role_id,
		password
		
        };

        return Services.AdminService.create(JSON.stringify(payload), signal);
    }
    const updateAdmin = (adminId, signal) => {
        const payload = {
            firstname,
		lastname,
		email,
		phone_number,
		profil_img_url,
		country_id,
		role_id,
		password
		
        };

        return Services.AdminService.update(adminId, JSON.stringify(payload), signal);
    }
    
	const updateProfile = (signal) => {
        const payload = {
            firstname,
		lastname,
		email,
		phone_number,
		profil_img_url,
		country_id,
		role_id,
		password
		
        };

        return Services.AdminService.updateProfile(JSON.stringify(payload), signal);
    }
    const deleteAdmin = (adminId, signal) => {
        return Services.AdminService.destroy(adminId, signal);
    }
    const fillAdmin = (admin) => {
        setId(admin.id);
        setFirstname(admin.firstname ?? '');
		setLastname(admin.lastname ?? '');
		setEmail(admin.email ?? '');
		setPhone_number(admin.phone_number ?? '');
		setProfil_img_url(admin.profil_img_url ?? '');
		setCountry_id(admin.country_id ?? '');
		setRole_id(admin.role_id ?? '');
		
    }
    const emptyAdmin = () => {
        setId('');
        setFirstname('');
		setLastname('');
		setEmail('');
		setPassword('');
		setPhone_number('');
		setProfil_img_url('');
		setApi_token('');
		setIs_active('');
		setCountry_id('');
		setRole_id('');
		
    }

    return {
        id,
        firstname,
		lastname,
		email,
		password,
		phone_number,
		profil_img_url,

		country_id,		role_id,
		
        errors,
        isDisabled,
        setFirstname,
		setLastname,
		setEmail,
		setPassword,
		setPhone_number,
		setProfil_img_url,
		setApi_token,
		setIs_active,
		setCountry_id,
		setRole_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getAdmin,
		getProfile,
        createAdmin,
        updateAdmin,
		updateProfile,
        deleteAdmin,
        fillAdmin,
        emptyAdmin
    };
}