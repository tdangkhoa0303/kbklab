import 'winston-mongodb';
import initMongoose from './mongoose';
import rescheduleInstance from './instance';

export default () => {
  initMongoose();
  rescheduleInstance();
};
