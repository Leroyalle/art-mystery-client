'use server';

import { revalidatePath } from 'next/cache';

export async function updateDataPath(path: string) {
  if (!path.startsWith('/')) {
    console.log('The path must start at /');
  }
  revalidatePath(path);
}
