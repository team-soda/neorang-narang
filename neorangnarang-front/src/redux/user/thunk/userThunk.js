import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../service/UserService";

const USER = "user";

export const getUserInfo = createAsyncThunk(
  `${USER}/getUserInfo`,
  async (uid) => {
    try {
      const response = await userService.getUserByUid(uid);
      console.log(response);
      return response.data.objData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const getUserByIdx = createAsyncThunk(
  `${USER}/getUserByIdx`,
  async (idx) => {
    console.log("getUserByIdx");
    try {
      const response = await userService.getUserByIdx(idx);
      console.log(response);
      return response.data.objData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
