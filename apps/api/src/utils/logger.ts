import {environment} from 'environments/environment';
import {createLogger, format} from 'winston';
import {MongoDB} from 'winston-mongodb'

const {dbURI, dbLogName} = environment

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new MongoDB({
      db: `${dbURI}${dbLogName}`,
      collection: 'logs',
    }),
  ],
});
