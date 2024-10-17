# Installation instructions
1. Install dependencies: `npm i`
2. Start the server: `npm run dev`
3. Format the code: `npm run format` or `ctrl+s` to format the file

# Setting up the local database
* In your folder, create a `.env` file. 
* In your code setup the following environment variable(s)
```env
MONGO_DB_PASSWORD=YOUR_MONGO_DB_PASSWORD
```
## API (unstable)
* `readDrafts`: Reads the entire database without any filters
* `writeDraft`: Writes a new entry

## Pre-equisite
* [nodejs](https://nodejs.org/en)
* [npm](https://www.npmjs.com/)
* [vscode](https://www.npmjs.com/)
* [eslint](https://eslint.org/)
* [prettier](https://prettier.io/)
## Optional plugins for vscode
* [yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for yaml schemas
* [pretty typescript errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) avoid reading a blob of errors
* [tailwind intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) use ctrl+space (windows) to trigger intellisense under `className`
* [jest testing](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) QOL features for jest (if we are even going to use it)
* [charemd icons](https://marketplace.visualstudio.com/items?itemName=littensy.charmed-icons) very cute icons
---
# Warning
* Do no touch .gitignore unless you know what you are doing
* keep `.gitkeep` files *if* you don't have anything commited inside the folder
---
# Installation instructions
1. Install dependencies: `npm i`
2. Start the server: `npm run dev`
3. Format the code: `npm run format` or `ctrl+space` to format the file
---
## Pre-equisite
* [nodejs](https://nodejs.org/en)
* [npm](https://www.npmjs.com/)
* [vscode](https://www.npmjs.com/)
* [eslint](https://eslint.org/)
* [prettier](https://prettier.io/)
## Optional plugins for vscode
* [yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for yaml schemas
* [pretty typescript errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) avoid reading a blob of errors
* [tailwind intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) use ctrl+space (windows) to trigger intellisense under `className`
* [jest testing](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) QOL features for jest (if we are even going to use it)
* [charemd icons](https://marketplace.visualstudio.com/items?itemName=littensy.charmed-icons) very cute icons
# Warning
* Do no touch .gitignore unless you know what you are doing
* keep `.gitkeep` files *if* you don't have anything commited inside the folder