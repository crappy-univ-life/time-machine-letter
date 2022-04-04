import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'global',
  initialState: { detailModal: false, previewModal: false, writeModal: false },
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
    openWriteModal: (
      state,
    ) => {
      state.writeModal = true;
    },
    closeWriteModal: (
      state,
    ) => {
      state.writeModal = false;
    },
  },
});

export const { openDetailModal, closeDetailModal, openPreviewModal, closePreviewModal, openWriteModal, closeWriteModal } = slice.actions;

export default slice.reducer;
