# Checkh

Log list of unique branches you were on out based on amount of checkouts. From oldest to newest.

## Usage

For basic, non development usage download script to selected directory:

```
curl https://raw.githubusercontent.com/piotrkabacinski/checkh/master/build/checkh.js --output /bin/checkh.js
```

...and being in a project directory with initiated git repository run script using:

```
node -e 'require("/bin/checkh").default()' [reflog checkouts amount]
```

For more convenient usage, consider applying script to some shell alias, `bash` example:

```
echo "alias checkh=\"node -e 'require("/bin/checkh").default()'\"" >> ~/.bash_profile
```

## Commands

```
npm test
npm run build
```
