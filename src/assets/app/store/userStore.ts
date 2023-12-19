import{ create }from 'zustand';

type UserState = {
  accessToken: string | null;
  requestToken: string | null;
  userEmail: string | null;
};

type UserActions = {
  updateUser: (accessToken: string, requestToken: string, userEmail: string) => void;
};

const useUserStore = create<UserState & UserActions>((set, get) => {
  const storedState = localStorage.getItem('userState');
  const initialState = storedState ? JSON.parse(storedState) : {
    accessToken: null,
    requestToken: null,
    userEmail: null,
  };

  set(initialState);

  return {
    accessToken: initialState.accessToken,
    requestToken: initialState.requestToken,
    userEmail: initialState.userEmail,
    updateUser: (accessToken, requestToken, userEmail) => {
      set({
        accessToken,
        requestToken,
        userEmail,
      });

      const state = get();
      localStorage.setItem('userState', JSON.stringify(state));
    },
  };
});

export default useUserStore;
