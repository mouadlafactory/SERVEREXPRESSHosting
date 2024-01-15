
import mongoose, { Schema, Document } from 'mongoose';

export interface userPage {
    results: { name: string }[],
    next: string | null,
    previous: string | null,
}

interface Coordinates {
  lat: number;
  lng: number;
}



interface Person extends Document {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  university: string;
  UrlWebSiteForUser: string;
}

const PersonSchema = new Schema<Person>({
  // Remove the id property here, as it is now included in the Person interface
  firstName: String,
  lastName: String,
  maidenName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  birthDate: String,
  image: String,
  university: String,
  UrlWebSiteForUser: String
});

// Define and export the model
const PersonModel = mongoose.model<Person>('user', PersonSchema);
export default PersonModel;


// User Actions
export const getUsers = () => PersonModel.find();
export const getUserByEmail = (email: string) => PersonModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => PersonModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => PersonModel.findById(id);
export const deleteUserById = (id: string) => PersonModel.findOneAndDelete({ _id: id });

export const getUserList = async (limit: number, offset: number): Promise<userPage> => {
  try {
    const userListQuery = PersonModel.find().skip(offset).limit(limit);
    const totalCount = await PersonModel.countDocuments();

    const userList = await userListQuery;

    // Transform user data into userPage format
    const results = userList.map(user => ({ name: `${user.lastName}` }));

    const nextOffset = offset + limit;
    const previousOffset = offset - limit < 0 ? null : offset - limit;

    return {
      results,
      next: nextOffset < totalCount ? `/users?limit=${limit}&offset=${nextOffset}` : null,
      previous: previousOffset !== null ? `/users?limit=${limit}&offset=${previousOffset}` : null,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};