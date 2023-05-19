import React from 'react';

type User = {
  firstname: string;
  lastname: string;
  email: string;
};

type ContextProps = {
  user: User;
  updateUser: (user: User) => void;
};

export const UserContext = React.createContext<ContextProps>({
  user: { firstname: '', lastname: '', email: '' },
  updateUser: () => {}
});
