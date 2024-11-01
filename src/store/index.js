import { create } from 'zustand';

export const useStore = create((set) => ({
  messages: [],
  loading: false,
  steamMessage: '',
  setMessageLoading: (value) => set(() => ({ loading: value })),
  updateMessageContext: (message) =>
    set((state) => ({ messages: [...state.messages, message], streamMessage: '' })),
  updateMessageHistory: (messageContext) =>
    set(() => ({ messages: messageContext })),
  setStreamMessage: (message) => set(() => ({ streamMessage: message })),
}));
