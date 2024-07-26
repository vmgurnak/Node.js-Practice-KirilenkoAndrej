import path from 'node:path';
import crypto from 'node:crypto';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('tmp'));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const suffix = crypto.randomUUID();
    const basename = req.params.id;
    const filename = `${basename}_${suffix}${extname}`;
    cb(null, filename);
    console.log(file);
  },
});

export default multer({ storage: storage });
