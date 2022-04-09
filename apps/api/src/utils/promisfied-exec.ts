import child_process from 'child_process';
import {promisify} from 'util';

export const promisified_exec = promisify(child_process.exec);
