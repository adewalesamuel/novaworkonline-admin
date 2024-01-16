import { useState } from 'react';
import { Services } from '../services';

export const useJobTitle = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
    const [course_link_url, setCourse_link_url] = useState('');
	const [icon_url, setIcon_url] = useState('');
	

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getJobTitle = (job_titleId, signal) => {        
        return Services.JobTitleService.getById(job_titleId, signal)
        .then(response => {
            fillJobTitle(response.job_title);
            setIsDisabled(false);
        });
    }

    const createJobTitle = signal => {
        const payload = {
            name,
		description,
		course_link_url,
		icon_url,
		
        };

        return Services.JobTitleService.create(JSON.stringify(payload), signal);
    }
    const updateJobTitle = (job_titleId, signal) => {
        const payload = {
            name,
		description,
		course_link_url,
		icon_url,
		
        };

        return Services.JobTitleService.update(job_titleId, JSON.stringify(payload), signal);
    }
    const deleteJobTitle = (job_titleId, signal) => {
        return Services.JobTitleService.destroy(job_titleId, signal);
    }
    const fillJobTitle = (job_title) => {
        setId(job_title.id);
        setName(job_title.name ?? '');
		setDescription(job_title.description ?? '');
		setCourse_link_url(job_title.course_link_url ?? '');
		setIcon_url(job_title.icon_url ?? '');
		
    }
    const emptyJobTitle = () => {
        setId('');
        setName('');
		setSlug('');
		setDescription('');
        setCourse_link_url('');
		setIcon_url('');
		
    }

    return {
        id,
        name,
		slug,
		description,
        course_link_url,
		icon_url,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setDescription,
        setCourse_link_url,
		setIcon_url,
		
        setId,
        setErrors,
        setIsDisabled,
        getJobTitle,
        createJobTitle,
        updateJobTitle,
        deleteJobTitle,
        fillJobTitle,
        emptyJobTitle
    };
}