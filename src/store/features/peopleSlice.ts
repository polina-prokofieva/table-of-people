import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  [key: string]: any;
  id: number;
  name: string;
  age: number;
  about?: string;
}

export type People = {
  people: Person[];
  loading: boolean;
  error: string;
};

const initialState: People = {
  people: [],
  loading: false,
  error: '',
};

const apiURL = 'https://64181df175be53f451d65c69.mockapi.io/api/v1/people';

export const fetchPeople = createAsyncThunk('people/getPeople', async () => {
  return axios.get(apiURL).then(res => res.data);
});

export const deletePerson = createAsyncThunk(
  'people/deletePerson',
  async (id: number) => {
    return axios.delete(`${apiURL}/${id}`).then(res => res.data);
  }
);

export const peopleSlice = createSlice({
  name: 'table-data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPeople.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchPeople.fulfilled,
      (state, action: PayloadAction<Person[]>) => {
        state.loading = false;
        state.people = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchPeople.rejected, (state, action) => {
      state.loading = false;
      state.people = [];
      state.error = action.error.message || 'Something went wrong';
    });

    builder.addCase(deletePerson.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      deletePerson.fulfilled,
      (state, action: PayloadAction<Person>) => {
        state.loading = false;
        state.people = state.people.filter(
          person => person.id !== action.payload.id
        );
        state.error = '';
      }
    );
    builder.addCase(deletePerson.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default peopleSlice.reducer;
