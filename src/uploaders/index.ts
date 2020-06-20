import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

export default multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const hash = uuid().replace(new RegExp('-', 'g'), '');
      const fileName = `${hash}-${file.filename}`;
      callback(null, fileName);
    },
  }),
});
