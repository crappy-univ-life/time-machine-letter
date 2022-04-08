import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'global',
  initialState: { detailModal: false, previewModal: false, writeModal: false, updateModal: false, LetterHash: null },
  reducers: {
    openDetailModal: (state, action) => {
      state.detailModal = true;
      state.LetterHash = action.payload;
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
    openUpdateModal: (
      state,
    ) => {
      state.updateModal = true;
    },
    closeUpdateModal: (
      state,
    ) => {
      state.updateModal = false;
    },
  },
});

export const { openDetailModal, closeDetailModal, openPreviewModal, closePreviewModal, openWriteModal, closeWriteModal, openUpdateModal, closeUpdateModal } = slice.actions;

export default slice.reducer;
