import initMongoose from './mongoose';
import 'winston-mongodb';

export default () => {
  initMongoose();
}
