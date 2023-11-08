import fs from 'fs/promises';

const listFilesEndsWith = async (dir: string, endsWith: string) => {
  const files = await fs.readdir(dir);

  return files.filter((f) => f.endsWith(endsWith));
};

export default listFilesEndsWith;
