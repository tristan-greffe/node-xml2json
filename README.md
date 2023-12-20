<div align="center">
  <h1>Simple XML2JSON Parser</h1>

  ![Project Banner](./readme_assets/readme_banner.png)

  <p>
    <a href="https://github.com/tristan-greffe/node-xml2json/stargazers">
      <img src="https://img.shields.io/github/stars/tristan-greffe/node-xml2json" alt="stars" />
    </a>
    <a href="https://github.com/tristan-greffe/node-xml2json/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/tristan-greffe/node-xml2json.svg" alt="license" />
    </a>
  </p>
  <h4>
    <a href="https://github.com/tristan-greffe/node-xml2json/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/tristan-greffe/node-xml2json/issues/">Request Feature</a>
  </h4>

</div>

## About the Project

### Features

1. Transforms data in XML format into JSON

2. Convert JSON objects into XML documents

### Tech Stack

[![My Skills](https://skillicons.dev/icons?i=js)](https://skillicons.dev)

## Usage

### Installation

```sh
npm install @codask/xml2json --save
```

or

```sh
yarn add @codask/xml2json
```

### Example

```sh
import { xmlToJson } from '@codask/weacast'

xmlToJson('<root><name>John Doe</name><age>30</age></root>')
```

```sh
import { json2xml } from '@codask/weacast'

json2xml({
  "root": {
    "name": "John Doe",
    "age": 30
  }
})
```

## Contributing

Contributions are always welcome!

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork it! 🤙

2. Create your feature branch: `git checkout -b my-new-feature`

3. Commit your changes: `git commit -m "Add some feature"`

4. Push to the branch: `git push origin my-new-feature`

5. Submit a pull request 👍

## License

This project is licensed under the MIT License - see the [license file](./LICENSE) for details