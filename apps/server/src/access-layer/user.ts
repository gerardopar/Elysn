import { User } from "../models/user";

export const getUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const createUser = async ({
  firebaseUid,
  email,
  name,
  picture,
}: {
  firebaseUid: string;
  email: string;
  name?: string;
  picture?: string;
}) => {
  const newUser = await User.create({
    firebaseUid,
    email,
    name,
    picture,
  });
  return newUser;
};

export const updateUser = async (
  id: string,
  {
    name,
    picture,
  }: {
    name?: string;
    picture?: string;
  }
) => {
  const updatedUser = await User.findByIdAndUpdate(id, {
    name,
    picture,
  });
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};
