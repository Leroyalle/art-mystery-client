import { revalidatePath } from 'next/cache';

export function updateDataPath(path: string) {
  if (!path.startsWith('/')) {
    console.log('The path must start at /');
  }
  revalidatePath(path);
}
