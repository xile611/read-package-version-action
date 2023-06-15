# Read package version from package.json

## useage

### examples

- Case 1: read the version from './package.json'

```
name: your workflow

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1

      - name: Read version of package.json
        uses: xile611/read-package-version-action@v1
        id: package-version

      - name: Show version number
        run: echo "Version is ${{ steps.package-version.outputs.version }}"
```

- Case 2: read other field from a json file

```
name: your workflow

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1

      - name: Read version of package.json
        uses: xile611/read-package-version-action@v1
        id: package-version
        with:
          path: './test'
          filename: 'test.json'
          field: 'tag'

      - name: Show version number
        run: echo "Version is ${{ steps.package-version.outputs.version }}"
```

### inputs

| input name | required | default value  | description                                          |
| ---------- | -------- | -------------- | ---------------------------------------------------- |
| path       | false    | './'           | The directory path of target json file               |
| filename   | false    | 'package.json' | The file name you want to read                       |
| field      | false    | 'version'      | The field which specify the version you want to read |

### outputs

| output name | type   |
| ----------- | ------ |
| version     | string |

## develop

Install the dependencies

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  path: ''./
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:
