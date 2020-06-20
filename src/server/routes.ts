import { Router, Express } from 'express';
import TilesController from '../controllers/TilesController';
import UsersController from '../controllers/UsersController';
import uploader from '../uploaders';
import { auth } from './auth';

const tilesController = new TilesController();
const usersController = new UsersController();

export default (server: Express) => {
  const oapi = Router();
  const api = Router();
  api.use(auth);

  // Tiles Api
  oapi.get('/tiles', tilesController.index);
  api.post('/tiles', uploader.single('img'), tilesController.create);

  // Users APi
  oapi.post('/users/signUp', usersController.create);
  oapi.post('/users/signIn', usersController.signIn);


  server.use('/oapi', oapi);

};