# Checkh

Log list of unique branches you were on and easily switch between them.

<img src="https://studio363-assets-file.s3.eu-central-1.amazonaws.com/checkh.gif" width="500" alt="Screen captured usage" />

## Usage

Make sure you have [Node](https://nodejs.org/) installed (`node -v`) with preferred version (latest recommended).

For basic, non development usage download built script to selected directory.

```Bash
curl https://raw.githubusercontent.com/piotrkabacinski/checkh/master/build/checkh.js --output /usr/local/bin/checkh.js
```

...and being in a project directory with initiated git repository run script using:

```Bash
node -e 'require("/bin/checkh.js").default()' [reflog checkouts amount]
```

For more convenient usage, consider applying script to some shell alias. `.bash_profile` example:

```Bash
echo "alias checkh=\"node -e 'require(\\\"/usr/local/bin/checkh.js\\\").default()'\"" >> ~/.bash_profile

checkh 20
```

## Development commands

For adjusting the script to own purposes I recommend cloning the repository. `package.json` contain only dev dependencies.

```Bash
npm test
npm run build
```
