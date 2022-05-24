import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_PAGE = 1;

export type LS = {
  query: string;
  page: number;
};

const initialState: LS = {
  query: '',
  page: INITIAL_PAGE
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialState,
  reducers: {
    searchLocations: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    previousLocations: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    nextLocations: (state) => {
      state.page += 1;
    }
  }
});
export const { searchLocations, previousLocations, nextLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
