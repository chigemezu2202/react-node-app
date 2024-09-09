//Hack: function block of handling an error object in axios
export const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        return `Error: ${error.response.status} - ${error.response.data.message}`;
    } else if (error.request) {
        // No response received
        return "Error: No response received from server";
    } else {
        // Error setting up the request
        return `Error: ${error.message}`;
    }
};



//Hack: function block of filtering error object
export const getErrorMessage = (error) => {
    return error.response?.data?.message || "An unknown error occurred";
};