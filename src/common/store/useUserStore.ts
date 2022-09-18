import create from "zustand";

type userDetails = {
  isAuthenticated: boolean;
  firstName: string;
  lastName: string;
  email: string;
};

interface store {
  userDetails?: userDetails;
  clearUserDetails: () => void;
  setUserDetails: (details: userDetails) => void;
}

const useUserStore = create<store>((set) => ({
  userDetails: {
    isAuthenticated: false,
    firstName: "Thanveer",
    lastName: "Gopalan",
    email: "Thanveer@hilite.com",
  },
  setUserDetails: (userDetails: userDetails) =>
    set((state) => ({ ...state, ...userDetails })),
  clearUserDetails: () =>
    set((state) => ({ ...state, userDetails: undefined })),
}));

export default useUserStore;
