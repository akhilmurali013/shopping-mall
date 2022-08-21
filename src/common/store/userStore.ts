import create from "zustand";

type userDetails = {
  isAuthenticated: boolean;
  firstName: string;
  lastName: string;
};

interface store {
  userDetails?: userDetails;
}

const userStore = create<store>((set) => ({
  userDetails: {
    isAuthenticated: false,
    firstName: "",
    lastName: "",
  },
  setUserDetails: (userDetails: userDetails) =>
    set((state) => ({ ...state, ...userDetails })),
  clearUserDetails: () =>
    set((state) => ({ ...state, userDetails: undefined })),
}));

export default userStore;
