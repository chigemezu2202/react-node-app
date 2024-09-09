import axios from "axios";
import { create } from "zustand";

// Hack: Auth URL Variable

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

// Hack: Credentials
// Hack: At every request axios put cookies at request header, making cookie to be included
axios.defaults.withCredentials = true;


// Hack: Global useState with "zustand", use instead of react useContext & contextProvider
export const useAuthStore = create((set) => ({
    
    user: null,
    isAuthenticated: false, // Hack: keeping track of if user is authenticated
    status: null, // Hack: track status
    success: null, // Hack: track success
    error: null, // Hack: track errors
    isLoading: false, // Hack: track when there is processing / loading
    isCheckingAuth: true, // Hack: checking isAuthenticated state

    // Hack: signup function
    signup: async (email, password, name) => {
        // Hack: set state
        set({ isLoading: true, status: null, success: null, error: null });
        // Hack: code block for signup
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            // Successful signup
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                status: response.status,
                success: response.data.message,
            });
        } catch (error) {
            // Error handling
            let errorMessage = "Error signing up";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data.message || errorMessage;
                set({ status: error.response.status });
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No server response";
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    // Hack: verifyEmail function
    verifyEmail: async (code) => {
        // Hack: set state
        set({ isLoading: true, status: null, success: null, error: null });
        // Hack: code block for signup
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            // Successful signup
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                status: response.status,
                success: response.data.message,
            });

            return response.data
        } catch (error) {
            // Error handling
            let errorMessage = "Error verifying email";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data.message || errorMessage;
                set({ status: error.response.status });
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No server response";
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    // Hack: login function
    login: async (email, password) => {
        // Hack: set state
        set({ isLoading: true, status: null, success: null, error: null });
        // Hack: code block for login
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            // Successful signup
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                status: response.status,
                success: response.data.message,
            });

        } catch (error) {
            // Error handling
            let errorMessage = "Error loggin in";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data.message || errorMessage;
                set({ status: error.response.status });
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No response from server";
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    // Hack: logout function
    logout: async () => {
        // Hack: set state
        set({ isLoading: true,  success: null,  });
        // Hack: code block for login

            const response = await axios.post(`${API_URL}/logout`);
            // Successful signup
            set({
                isLoading: false,
                success: response.data.message,
                isAuthenticated: false,
                error: null,
                user: null,
            });  
    },
    // Hack: checkAuth function
    checkAuth: async () => {
        //Hack: set delay for loading
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        // Hack: set state
        set({ isCheckingAuth: true, error: null });
        // Hack: code block for checkAuth
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            // Successfully authenticated
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false
            });
        } catch (error) {
            // Error handling
            let errorMessage = "checkAuth Error";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data.message || errorMessage;
                set({ status: error.response.status });
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No server response";
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            set({ error: errorMessage, isCheckingAuth: false, isAuthenticated: false });
            throw error;
        }
    },
    // Hack: forgotPassword function
    forgotPassword: async (email) => {
        // Hack: set state
        set({ isLoading: true, status: null, success: null, error: null });
        // Hack: code block for forgotPassword
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            // Successful forgotPassword mail sent
            set({
                user: response.data.user,
                isAuthenticated: false,
                isLoading: false,
                status: response.status,
                success: response.data.message,
            });

        } catch (error) {
            // Error handling
            let errorMessage = "forgotPassword Error";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data.message || errorMessage;
                set({ status: error.response.status });
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No server response";
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    // Hack: resetPassword function
    resetPassword: async (token, password) => {
        // Hack: set state
        set({ isLoading: true, status: null, success: null, error: null });
        // Hack: code block for resetPassword
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            // Successful Password Reset
            set({
                user: response.data.user,
                isAuthenticated: false,
                isLoading: false,
                status: response.status,
                success: response.data.message,
            });

        } catch (error) {
            // Error handling
            let errorMessage = "resetPassword Error";
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data.message || errorMessage;
                set({ status: error.response.status });
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No server response";
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    }
}));
