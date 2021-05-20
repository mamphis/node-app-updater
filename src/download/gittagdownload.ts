import simpleGit from "simple-git";
import { IDownload } from "./idownload";

export class GitTagDownload implements IDownload {
    async downloadVersion(version: string): Promise<string> {
        const git = simpleGit()
        
        await git.fetch();
        await git.stash();
        await git.checkout(`tags/${version}`, ['-B', 'runtime']);
        await git.pull('origin', `tags/${version}`);
        await git.stash(['pop']);

        return version;
    }
}