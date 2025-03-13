import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormSchema } from '../../utils/FormSchema.zod';

export type StoredForm = Omit<TFormSchema, 'picture'> & {
  picture: string;
};

const initialState: StoredForm[] = [];

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<StoredForm>) => {
      state.unshift(action.payload);
    },
  },
});

export const { saveForm } = formsSlice.actions;
export default formsSlice.reducer;
