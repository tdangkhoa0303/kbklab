import {environment} from '../environments/environment';

export const buildLabLocationPath = (location: string) => `${environment.rootPath}/${location}`;
