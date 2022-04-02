import 'winston-mongodb';
import initMongoose from './mongoose';

export default () => {
  initMongoose();
}
