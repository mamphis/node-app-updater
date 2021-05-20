export interface IVersion {
    isNewerVersionAvailable(currentVersion: string): Promise<boolean>;
    getLatestVersion(): Promise<string>;
}