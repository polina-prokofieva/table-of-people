import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  [key: string]: any;
  id?: number;
  name: string;
  age: number;
  about?: string;
}

export interface newPerson {
  name: string;
  age: number;
  about?: string;
}

export type People = {
  people: Person[];
  loading: boolean;
  error: string;
  updatingPeople?: Person[];
  new?: newPerson;
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

export const updatePerson = createAsyncThunk(
  'people/updatePerson',
  async (person: Person) => {
    const { name, age, about } = person;
    return axios
      .put(`${apiURL}/${person.id}`, { name, age, about })
      .then(res => res.data);
  }
);

export const addPerson = createAsyncThunk(
  'people/addPerson',
  async (person: newPerson) => {
    return axios.post(apiURL, person).then(res => res.data);
  }
);

export const peopleSlice = createSlice({
  name: 'table-data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // get
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

    // delete
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

    // update
    builder.addCase(updatePerson.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updatePerson.fulfilled,
      (state, action: PayloadAction<Person>) => {
        state.loading = false;

        const updatedIdx = state.people.findIndex(
          person => person.id === action.payload.id
        );

        const updatedPeople = [...state.people];
        updatedPeople[updatedIdx] = action.payload;

        state.people = updatedPeople;
        state.error = '';
      }
    );
    builder.addCase(updatePerson.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // create
    builder.addCase(addPerson.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      addPerson.fulfilled,
      (state, action: PayloadAction<Person>) => {
        state.loading = false;
        state.people = [...state.people, action.payload];
        state.error = '';
      }
    );
    builder.addCase(addPerson.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default peopleSlice.reducer;
