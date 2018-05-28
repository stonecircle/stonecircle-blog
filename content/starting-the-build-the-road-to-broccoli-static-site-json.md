---
title: Starting the Build - the Road to broccoli-static-site-json
image:
imageMeta:
  attribution:
  attributionLink:
featured: true
meta_title: null
meta_description: null
author: chris
date: Mon May 28 2018 21:16:32 GMT+0100 (IST)
tags:
  - guides-app
  - ember
  - broccoli
  - new
---

This is the second part of a 6 part series on how we built the new Ember Guides as a 6-month project to convert it into an Ember app. If you want to see the first part in this series check it out [here](/the-right-way-to-build-the-ember-guides/) and you can keep track of the posts by following this RSS.

## Initial experiments
In the very early stages of the conversations about upgrading the Ember Guides to be a fully-fledged Ember app, Ryan Tablada pointed me towards an experiment that he had started to get the ball rolling. It was called [broccoli-blog-api](https://github.com/rtablada/broccoli-blog-api) and was designed to:

> translate a directory (or set of directories) of Markdown documents into a static JSONAPI

Having worked extensively with Broccoli many years ago (before ember-cli was the official build system for Ember) I thought to myself "what's the worse that could happen" and jumped straight into the code. The thing about broccoli is that it's almost the opposite of "riding a bike", you very quickly forget everything about it if you haven't been using it for a while 😣

## Why Broccoli - Static JSON:API
Anyone who has been following Ember for any reasonable amount of time knows that Ember Data likes to speak JSON:API natively. If you have ever needed to translate your API's endpoints to speak natively with Ember Data you know that it is essentially a process of translating things into JSON:API before it goes into Ember Data. This is why it made sense to use this upfront.

Broccoli is an `asset pipeline` that deals very effectively with the file system. It is all Just Javascript™️ so it is in theory quite easy to work with. One of the issues that makes Broccoli a tiny bit difficult to work with is the lack of documentation, or at least that used to be the case. Recenltly [Oli Griffiths](http://www.oligriffiths.com/) has been very active in the Broccoli community and has recently finished a [Broccoli Tutorial](https://github.com/oligriffiths/broccolijs-tutorial).

Since the early days of broccoli-static-site-json things have gotten a tiny bit more complicated (more flexibility usually means more complexity) but to really understand the basics of what this is doing you can go back and look at the files at the very fist commit on the 7 Nov 2017.

## The main plugin

The simple early experiment of the broccoli-static-site-json had an index.js file (the only active file at the time) with a total of 119 lines of code, the main active lines making up the `build()` of the Broccoli plugin just adding up to 50 lines of code, which is definitely small enough for us to deep dive into today 💪

### Structure of a Broccoli plugin
Here is a basic example of a plugin

```js
const Plugin = require('broccoli-plugin');

class BroccoliStaticSiteJson extends Plugin {
  constructor(folder, options) {
    // tell broccoli which "nodes" we're watching
    super([folder], options);
    this.options = {
      folder,
      contentFolder: 'content',
      ...options,
    };
    // don't know what this does
    Plugin.call(this, [folder], {
      annotation: options.annotation,
    });
  }

  build() {}
}

module.exports = BroccoliStaticSiteJson;
```

This isn't exactly the most basic example of a plugin, it has some of the business logic and API of broccoli-static-site-json exposed. This is telling us that if we wanted to use this plugin we would do something like this:

```js
const jsonTree = new StaticSiteJson('input', {
  contentFolder: 'output-jsons',
})
```

This is just setting the local folder and the contentFolder options for now but it will eventually be how we tell the plugin to look for Markdown files in `input` and put the output JSON:API files in `output-jsons`. The contentFolder is optional and will default to `content`.

What happens when the app is built is that the `build()` function is called and this is where the actual work happens.

### The build() function

Let's show the whole build function and then break it down piece by piece

```
build() {
  // build content folder if it doesnt exist
  if (!existsSync(join(this.outputPath, this.options.contentFolder))) {
    mkdirSync(join(this.outputPath, this.options.contentFolder));
  }

  // build pages file
  let pages;

  if (existsSync(join(this.options.folder, 'pages.yml'))) {
    pages = yaml.safeLoad(readFileSync(join(this.options.folder, 'pages.yml'), 'utf8'));
  } else if (existsSync(join(this.options.folder, 'pages.json'))) {
    // eslint-disable-next-line
    pages = require(join(this.options.folder, 'pages.json'));
  }

  if (pages) {
    // add the parent id to each subpage
    subpageUrls(null, null, pages);

    writeFileSync(join(this.outputPath, this.options.contentFolder, 'pages.json'), JSON.stringify(TableOfContentsSerializer.serialize(pages)));
  }

  // build the tree of MD files
  const paths = walkSync(this.inputPaths);

  const mdFiles = paths.filter(path => extname(path) === '.md');

  const fileData = mdFiles.map(path => ({
    path,
    content: readFileSync(join(this.options.folder, path)),
  })).map(file => ({
    path: file.path,
    ...yamlFront.loadFront(file.content),
  }));

  if (!existsSync(join(this.outputPath, this.options.contentFolder))) {
    mkdirSync(join(this.outputPath, this.options.contentFolder));
  }

  fileData.forEach((file) => {
    const directory = dirname(join(this.outputPath, this.options.contentFolder, file.path));
    if (!existsSync(directory)) {
      mkdirSync(dirname(join(this.outputPath, this.options.contentFolder, file.path)));
    }

    const serialized = ContentSerializer.serialize(file);

    writeFileSync(join(this.outputPath, this.options.contentFolder, `${file.path}.json`), JSON.stringify(serialized));
  });
}
```

This may seem a bit scary but don't worry we will break it down


(continue teardown)
