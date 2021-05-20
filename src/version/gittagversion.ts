import semver from "semver";
import simpleGit from "simple-git";
import { IVersion } from "./iversion";

export class GitTagVersion implements IVersion {
    async isNewerVersionAvailable(currentVersion: string): Promise<boolean> {
        const newestVersion = await this.getLatestVersion();
        return semver.gt(newestVersion, currentVersion);
    }

    async getLatestVersion(): Promise<string> {
        const git = simpleGit()

        await git.fetch()
        const tags = await git.tags();
        if (tags.all.length === 0) {
            return '0.0.0';
        }

        const [latestTag] = tags.all.sort((a, b) => semver.gt(a, b) ? -1 : 1);
        return latestTag;
    }
}
