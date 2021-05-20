import { exec, spawn } from "child_process";
import { GitTagDownload } from "../download/gittagdownload";
import { IDownload } from "../download/idownload";
import { GitTagVersion } from "../version/gittagversion";
import { IVersion } from "../version/iversion";

export enum UpdateProgress {
    GotLatestVersion = 0,
    DownloadedLatestVersion = 1,
    InstalledDependecies = 2,
    InstalledApplication = 3,
    RestartApplication = 4,
}

export class Updater {
    private version: IVersion;
    private download: IDownload;
    constructor() {
        this.version = new GitTagVersion();
        this.download = new GitTagDownload();
    }

    setVersionStrategy(version: IVersion): this {
        this.version = version;
        return this;
    }

    setDownloadStrategy(download: IDownload): this {
        this.download = download;
        return this;
    }

    async *update(currentVersion?: string): AsyncGenerator<UpdateProgress, UpdateProgress, void> {
        const version = currentVersion ?? await this.getLatestVersion();
        yield UpdateProgress.GotLatestVersion;
        const downloadedVersion = await this.downloadVersion(version);
        yield UpdateProgress.DownloadedLatestVersion;
        await this.installDependencies();
        yield UpdateProgress.InstalledDependecies;
        await this.installApplication();
        yield UpdateProgress.InstalledApplication;
        this.restartApplication();
        return UpdateProgress.RestartApplication;
    }

    async isNewerVersionAvailable(currentVersion: string): Promise<boolean> {
        return this.version.isNewerVersionAvailable(currentVersion);
    }

    async getLatestVersion(): Promise<string> {
        return this.version.getLatestVersion();
    }

    async downloadVersion(version: string): Promise<string> {
        return this.download.downloadVersion(version);
    }

    async installDependencies(): Promise<void> {
        return new Promise<void>((res) => {
            exec('npm i', (err, stdout, stderr) => {
                res();
            });
        })
    }

    async installApplication(): Promise<void> {
        return new Promise<void>((res) => {
            exec('npm run build', (err, stdout, stderr) => {
                res();
            });
        })
    }

    restartApplication() {
        setTimeout(function () {
            // When NodeJS exits
            process.once("exit", function () {
                const child = spawn(process.argv.shift() ?? '', process.argv, {
                    cwd: process.cwd(),
                    detached: true,
                    stdio: "inherit"
                });
            });
            process.exit();
        }, 1000);
    }
}