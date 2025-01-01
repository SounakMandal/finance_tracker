'use server';

import { ObjectId } from 'mongodb';
import { User } from '@/interface/user';
import { database, user_id } from '../data/connect';
import document from '../data/user_example.json';

export async function getUser(): Promise<User> {
  try {
    const user = await database
      .collection('user')
      .findOne<User>({ _id: new ObjectId(user_id) });
    if (user === null) throw Error('User was not found');
    user._id = user._id.toString();
    return user;
  } catch (error) {
    console.error(error);
    console.log('Unable to connect to client. Falling back to standards');
    return document as unknown as User;
  }
}

export async function updateUserDetails(updateDetails: object) {
  const result = await database
    .collection('user')
    .updateOne(
      { _id: new ObjectId(user_id) },
      { $set: updateDetails }
    );
  if (result.modifiedCount === 0) throw Error('Invalid query');
}
