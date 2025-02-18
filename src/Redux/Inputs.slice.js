import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  nameOfAlgo: "",
  arrivalTime: [],
  burstTime: [],
  timeQuantum: 0,
  priority: [],
  error: null,
};

const InputsSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    inputsRequest: (state) => {
      state.loading = true;
    },
    inputsSuccess: (state, action) => {
      state.loading = false;
      state.nameOfAlgo = action.payload.nameOfAlgo;
      state.arrivalTime = action.payload.arrivalTime;
      state.burstTime = action.payload.burstTime;
      state.timeQuantum = action.payload.timeQuantum;
      state.priority = action.payload.priority;
      state.error = null;
    },
    inputsFail: (state, action) => {
      state.loading = false;
      state.nameOfAlgo = "";
      state.arrivalTime = [];
      state.burstTime = [];
      state.timeQuantum = 0;
      state.priority = [];
      state.error = action.payload;
    },
  },
});

// Export actions
export const { inputsRequest, inputsSuccess, inputsFail } = InputsSlice.actions;

// Export reducer
export default InputsSlice.reducer;
