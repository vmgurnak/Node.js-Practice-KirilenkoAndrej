import { ChildProcess } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';

const targetPath = path.resolve('downloads');

const dirDict = {
  documents: ['pdf', 'doc', 'docx', 'odt', 'rtf', 'wps', 'txt'],
  images: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  videos: ['mp4', 'avi', 'mov', 'mkv'],
  audios: ['mp3', 'wav', 'ogg', 'aac'],
  arhives: ['zip', 'rar', '7z', 'iso'],
  others: [],
};

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
  //   console.log(dirStat);

  dirStat.forEach((item) => {
    if (item.isDir) {
      dirHandler(item.itemPath);
    } else {
      fileHandler(item.itemPath);
    }
  });
}

async function fileHandler(filePath) {
  const { ext } = path.parse(filePath);
  console.log(ext);
  for (const key in dirDict) {
    console.log(dirDict[key]);
    if (dirDict[key].includes(ext)) {
      console.log(key);
      // write to dir 'key'
      return;
    }
  }
  //write to dir 'others'
}

dirHandler(targetPath);
