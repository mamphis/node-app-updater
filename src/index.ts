import { UpdateProgress, Updater } from './updater/updater';
import { IVersion } from './version/iversion';
import { GitTagVersion } from './version/gittagversion';
import { IDownload } from './download/idownload';
import { GitTagDownload } from './download/gittagdownload';

export default Updater;
export { IVersion, IDownload, GitTagDownload, GitTagVersion, UpdateProgress };