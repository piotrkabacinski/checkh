# Checkh

Log list of unique branches you were on and easily switch between them.

## Usage

Make sure you have [Node](https://nodejs.org/) installed (`node -v`) with preferred version (latest recommended).

For basic, non development usage download build script to selected directory.

```Bash
curl https://raw.githubusercontent.com/piotrkabacinski/checkh/master/build/checkh.js --output /bin/checkh.js
```

...and being in a project directory with initiated git repository run script using:

```Bash
node -e 'require("/bin/checkh.js").default()' [reflog checkouts amount]
```

For more convenient usage, consider applying script to some shell alias. `bash` + `.bash_profile` example:

```Bash
echo "alias checkh=\"node -e 'require(\\\"/bin/checkh.js\\\").default()'\"" >> ~/.bash_profile

checkh 20
```

## Commands

```Bash
npm i # Script contain only dev dependencies
npm test
npm run build
```
