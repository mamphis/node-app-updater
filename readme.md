# node-app-updater

This packages is able to update a nodejs application automatically.

## Installation

Add the registry [Verdaccio](https://npm.j-stuckstaette.de) to your project via a `.npmrc`-File.

To do so create a `.npmrc`-File in your root directory of your project.
Add the following content to the file:

```properties
# The registry must be the current registry.
@pcsmw:registry=https://npm.j-stuckstaette.de
```

You can install the package now with

```cmd
npm i node-app-updater
```

## Usage

This module is used update and restart a nodejs application.

The updater can be configured how to determine if an update is availabe, what the newest version is and how to download the version.

Subsequently the dependencies are installed, the application is transpiled and then restarted.

### Example

```typescript
import Updater, { UpdateProgress } from "@pcsmw/node-app-updater";

const updater = new Updater();

if (await updater.isNewerVersionAvailable("0.0.0")) {
  const version = await updater.getLatestVersion();
  const iterator = updater.update(version);

  while (true) {
    const { done } = iterator.next();

    if (done) {
      break;
    }
  }
}
```

To change a strategy you can alter the initialization of the updater.

```typescript
const updater = new Updater().setDownloadStrategy({
  downloadVersion: async (version: string): Promise<string> => {
    const response = await fetch(`${baseuri}/${version}`);
    const data = await response.arrayBuffer();

    fs.writeFile("./app.data", new Uint8Array(data));
    return version;
  },
});
```

## Future Improvements

- [ ] Disable Transpiling by making the builder optional
- [ ] Make a strategy for all actions

```

```
