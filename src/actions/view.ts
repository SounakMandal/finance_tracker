'use server';

import { database } from '@/data/connect';
import { Document } from 'mongodb';

export const executePipeline = async (pipeline: Document[]) => {
  const documents = await database
    .collection('expenses')
    .aggregate(pipeline)
    .toArray();
  console.log(documents);
};
