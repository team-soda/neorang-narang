import { createAsyncThunk } from "@reduxjs/toolkit";
import { imgAxios } from "../../../config/axios-config";
import { userService } from "../../../service/UserService";

const AUTH = "auth";

export const login = createAsyncThunk(`${AUTH}/login`, async (loginObj) => {
    try {
        const response = await userService.login(loginObj);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getAuthUser = createAsyncThunk(`${AUTH}/getAuthUser`, async () => {
    try {
        const response = await userService.getAuthUserInfo();
        return response.data.user;
    } catch (error) {
        console.log(error);
    }
});

export const getAuthUserImg = createAsyncThunk(
    `${AUTH}/getAuthUserImg`,
    async (fileName) => {
        try {
            const response = await userService.getProfileImg(fileName);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
);

export const uploadProfileImg = createAsyncThunk(
    `${AUTH}/uploadProfileImg`,
    async (imgObj) => {
        try {
            const response = await userService.uploadProfileImg(imgObj);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    `${AUTH}/updateUser`,
    async (userObj) => {
        console.log(userObj);
        try {
            const response = await imgAxios.put(`/user`, userObj);
            console.log(response);
            //return response;
        } catch (error) {
            console.log(error);
        }
    }
);

export const logout = createAsyncThunk(`${AUTH}/logout`, async () => {
    try {
        return await userService.logout();
    } catch (error) {
        console.log(error);
    }
});