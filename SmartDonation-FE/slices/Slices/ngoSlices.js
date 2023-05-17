import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  ngoDetails: {},
};

export const ngoSlices = createSlice({
  name: "ngo",
  initialState,
  reducers: {
    SET_NGO: (ngo, action) => {
      ngo.ngoDetails = action?.payload?.data;
    },
  },
});

export const { SET_NGO } = ngoSlices.actions;
export default ngoSlices.reducer;
