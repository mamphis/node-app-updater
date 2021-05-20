import simpleGit from "simple-git";
import { IDownload } from "./idownload";

export class GitTagDownload implements IDownload {
    async downloadVersion(version: string): Promise<string> {
        const git = simpleGit()
        
        await git.fetch();
        await git.reset(['--hard', 'HEAD']);
        await git.checkout(`tags/${version}`, ['-B', 'runtime']);
        await git.pull('origin', `tags/${version}`);

        return version;
    }
}