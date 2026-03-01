
export const getEnvVariables = () => {
    return{
        mode: import.meta.env.VITE_MODE,
        api_url: import.meta.env.VITE_API_URL
    }
};