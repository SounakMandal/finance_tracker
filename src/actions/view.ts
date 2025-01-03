'use server';

import { database, user_id } from '@/data/connect';
import { View } from '@/interface/view';

export async function getViews() {
  const views = await database
    .collection('view')
    .find<View>({ user_id })
    .toArray();
  return views.map(view => {
    view._id = view._id.toString();
    return view;
  });
};

export async function updateView(document: Partial<View>) {
  document.user_id = user_id;
  return await database
    .collection('view')
    .updateOne(
      { user_id: document.user_id, name: document.name },
      { $set: document },
      { upsert: true }
    );
};
