import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {yupResolver} from '@hookform/resolvers/yup';
import {AppDispatch, RootState} from '@store/store';
import {cleanErrorMessages, loginUser} from '@store/index';
import {schemaLoginValidations} from '@pages/Login/schemaLoginValidations';
import {ILoginForm} from '@pages/Login/interfaces';

export const useLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ILoginForm>({
        resolver: yupResolver(schemaLoginValidations),
    });

    const dispatch: AppDispatch = useDispatch();
    const {errors: errorsMsg, loadings} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSubmit = (data: ILoginForm) => {
        dispatch(loginUser({credentials: data, navigate}));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (errorsMsg.loginErrorMsg) {
            dispatch(cleanErrorMessages());
        }
    }, []);

    return {
        register,
        handleSubmit,
        errors,
        errorsMsg,
        loadings,
        navigate,
        showPassword,
        togglePasswordVisibility,
        onSubmit,
    };
};
