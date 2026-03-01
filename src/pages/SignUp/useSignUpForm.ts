import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {yupResolver} from '@hookform/resolvers/yup';
import {AppDispatch, RootState} from '@store/store';
import {cleanErrorMessages, registerUser} from '@store/index';
import {schemaSignUpValidations} from '@pages/SignUp/schemaSignUpValidations';
import {ISignUpForm} from '@pages/SignUp/interfaces';

export const useSignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ISignUpForm>({
        resolver: yupResolver(schemaSignUpValidations),
    });

    const dispatch: AppDispatch = useDispatch();
    const {errors: errorsMsg, loadings} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSubmit = (data: ISignUpForm) => {
        dispatch(registerUser({newUser: data, navigate}));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (errorsMsg.registerUserErrorMsg) {
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
