import { User } from "../models/user";

export const getUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
