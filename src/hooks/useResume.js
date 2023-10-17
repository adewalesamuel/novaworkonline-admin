import { useState } from 'react';
import { Services } from '../services';

export const useResume = () => {
    const [id, setId] = useState('');
	const [content, setContent] = useState('');
	const [params, setParams] = useState('');
	const [user_id, setUser_id] = useState('');
	

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getResume = (resumeId, signal) => {        
        return Services.ResumeService.getById(resumeId, signal)
        .then(response => {
            fillResume(response.resume);
            setIsDisabled(false);
        });
    }

    const createResume = signal => {
        const payload = {
            content,
		params,
		user_id,
		
        };

        return Services.ResumeService.create(JSON.stringify(payload), signal);
    }
    const updateResume = (resumeId, signal) => {
        const payload = {
            content,
		params,
		user_id,
		
        };

        return Services.ResumeService.update(resumeId, JSON.stringify(payload), signal);
    }
    const deleteResume = (resumeId, signal) => {
        return Services.ResumeService.destroy(resumeId, signal);
    }
    const fillResume = (resume) => {
        setId(resume.id);
        setContent(resume.content ?? '');
		setParams(resume.params ?? '');
		setUser_id(resume.user_id ?? '');
		
    }
    const emptyResume = () => {
        setId('');
        setContent('');
		setParams('');
		setUser_id('');
		
    }

    return {
        id,
        content,
		params,
		user_id,
		
        errors,
        isDisabled,
        setContent,
		setParams,
		setUser_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getResume,
        createResume,
        updateResume,
        deleteResume,
        fillResume,
        emptyResume
    };
}