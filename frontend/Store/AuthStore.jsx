import { create } from "zustand";

const useAuthStore = create((set) => {
  const storedUser = localStorage.getItem("user");
  const initialState = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialState,
    setUser: (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user)); 
      } else {
        localStorage.removeItem("user");
      }
      set({ user });
    },
  };
});

export default useAuthStore;
