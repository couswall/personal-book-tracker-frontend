import axios, { AxiosError, AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEnvVariables } from "@helpers/getEnvVariables";
import { urlWeb } from "@constants/apiEndpoints";
import { IGetBookByIdFetchRes } from "@store/books/getBookById/interfaces";

const apiUrl = getEnvVariables().api_url;

export const getBookById = createAsyncThunk(
  "getBookById/fetch",
  async ({ token, id }: { token: string; id: string }, thunkAPI) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const { data }: AxiosResponse<IGetBookByIdFetchRes> = await axios.get(
        `${apiUrl}${urlWeb.getBookById}/${id}`,
        { headers }
      );
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(
          error.response?.data.error?.message || "Unknwon error"
        );
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);
