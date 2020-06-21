import server from './server';
import { port } from './env';

server.listen(port || '3333', () => {
  console.log('Server is on! Good luck!');
});