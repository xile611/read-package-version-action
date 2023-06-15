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

| input name          | required | default value  | description                                            |
| ------------------- | -------- | -------------- | ------------------------------------------------------ |
| path                | false    | './'           | The directory path of target json file                 |
| filename            | false    | 'package.json' | The file name you want to read                         |
| field               | false    | 'version'      | The field which specify the version you want to read   |
| semver_string       | false    |                | The semver string that want to be parsed               |
| semver_pattern      | false    | '^v?(.\*)$'    | The pattern to parse the semver string                 |
| use_current_version | false    | true           | parse current version when semver_string not specified |

### outputs

| output name      | type   | description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| current_version  | string | the current version                                                |
| pre_release_type | string | the pre-release type parsed from semver_string or current version  |
| pre_release_name | string | the pre-release name parsed from semver_string or current version  |
| full             | string | the full version parsed from semver_string or current version      |
| major            | string | the major version parsed from semver_string or current version     |
| minor            | string | the minor version parsed from semver_string or current version     |
| patch            | string | the patch version parsed from semver_string or current version     |
| prerelease       | string | the prerelease string parsed from semver_string or current version |
| build            | string | the build string parsed from semver_string or current version      |

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
