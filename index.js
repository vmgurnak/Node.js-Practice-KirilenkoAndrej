import { ChildProcess } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';

const targetPath = path.resolve('downloads');

const dirDict = {
  documents: [
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.odt',
    '.ods',
    '.odp',
    '.odg',
    '.rtf',
    '.wps',
    '.txt',
  ],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
  videos: ['.mp4', '.avi', '.mkv', '.mov'],
  audios: ['.mp3', '.wav', '.ogg', '.aac'],
  arhives: ['.zip', '.rar', '.7z', '.iso'],
  others: [],
};

const isExisDir = {};

async function dirHandler(dirPath) {
  const data = await fs.readdir(dirPath);
  const pathList = data.map((item) => path.join(dirPath, item));
  const promisesList = pathList.map(async (itemPath) => {
    return {
      isDir: (await fs.stat(itemPath)).isDirectory(),
      itemPath,
    };
  });
  const result = await Promise.allSettled(promisesList);
  const dirStat = result.map(({ value }) => value);

  const finallResult = dirStat.map(async (item) => {
    if (item.isDir) {
      await dirHandler(item.itemPath);
    } else {
      await fileHandler(item.itemPath);
    }
  });
  await Promise.allSettled(finallResult);
}

async function fileHandler(filePath) {
  const { ext, base } = path.parse(filePath);
  for (const key in dirDict) {
    if (dirDict[key].includes(ext)) {
      const sortedDir = path.join(targetPath, key);
      if (!isExisDir[key]) {
        isExisDir[key] = true;
        await fs.mkdir(sortedDir);
      }
      // write to dir 'key'
      // await fs.cp(filePath, path.join(sortedDir, base));
      await fs.rename(filePath, path.join(sortedDir, base));
      return;
    }
  }
  //write to dir 'others'
  const otherDir = path.join(targetPath, 'others');
  if (!isExisDir.others) {
    isExisDir.others = true;
    await fs.mkdir(otherDir);
  }
  await fs.rename(filePath, path.join(otherDir, base));
}

dirHandler(targetPath);
