export const getEnvVariables = () => {
    // TEMP DEBUG - remove after diagnosing CI e2e failure
    console.log('[getEnvVariables] import.meta.env =', JSON.stringify(import.meta.env));
    return {
        mode: import.meta.env.VITE_MODE,
        api_url: import.meta.env.VITE_API_URL,
    };
};
