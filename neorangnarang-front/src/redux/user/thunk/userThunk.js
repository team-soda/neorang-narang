import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../service/UserService";

const USER = "user";

export const getUserInfo = createAsyncThunk(
    `${USER}/getUserInfo`,
    async (uid) => {
        const response = await userService.getUserByUid(uid);
        console.log(response);
        return response.data.objData;
    }
);