export interface IDownload {
    downloadVersion(version: string): Promise<string>
}