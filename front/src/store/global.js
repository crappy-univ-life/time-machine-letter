import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'global',
  initialState: { detailModal: false, previewModal: false },
  reducers: {
    openDetailModal: (
      state,
    ) => {
      state.detailModal = true;
    },
    closeDetailModal: (
      state,
    ) => {
      state.detailModal = false;
    },
    openPreviewModal: (
      state,
    ) => {
      state.previewModal = true;
    },
    closePreviewModal: (
      state,
    ) => {
      state.previewModal = false;
    },
  },
});

export const { openDetailModal, closeDetailModal, openPreviewModal, closePreviewModal } = slice.actions;

export default slice.reducer;
