---
title: The "Right Way" to Build the Ember Guides
image:
imageMeta:
  attribution:
  attributionLink:
featured: true
meta_title: null
meta_description: null
author: chris
date: Mon May 28 2018 16:53:21 GMT+0100 (IST)
tags:
  - guides-app
  - new
  - ember
---

A lot of the time in the Ember community we see a joke about the Right Way™️ to build something. At Stone Circle we happen to believe that there is a right way to do something, even if we can never achieve it.

## Platonic Ideal

To understand what we mean when we say the "Right Way" we have to dig into the philosophy of it, and I really mean pilosophy because we're going all the way back to Plato. I first came across this when I heard about the idea of the _Ideal Triange_ as an abstract concept that, try as we might, we could never reproduce as mere mortals:

> Platonic form can be illustrated by contrasting a material triangle with an ideal triangle. The Platonic form is the ideal triangle — a figure with perfectly drawn lines whose angles add to 180 degrees. Any form of triangle that we experience will be an imperfect representation of the ideal triangle. Regardless of how precise your measuring and drawing tools you will never be able to recreate this perfect shape. Even drawn to the point where our senses cannot perceive a defect, in its essence the shape will still be imperfect; forever unable to match the ideal triangle.

Oftentimes we hear the words "it depends" when we are asked what the right way to do something is in software. What I'm tring to get at with the _Platonic Ideal_ or the _Perfect Abstract_ way of doing something is not completely at ods with "it depends", when we're dealing with practicality we have to live within the constraints of the now.

The only difference is that if we think that there is an _Ideal_ way to achieve something it gives us a place to point our ships.

> Diagram of a maze-like journey towards the right way

this is the real reason for plato to think of the ideal Triangle. to know that it is impossible to make it in the real world. my thesis is that it is important to always keep this platonic ideal of the right way to build a piece of software in your head and make small steps towards it as best you can.

## Serendipity

Early in November last year I was in the process of writing the first documentation for [Authmaker](https://authmaker.com) and we decided to go for something that followed a similar structure to the Ember Guides. At the time I had hired Julia Donaldson to write the documentation and I gave her a task to check out whatever technology the Ember Guides were using because they were probably using something amazing.

After a few confused conversations back and forth we realised that actually this was very much **not** the case. I happened to join the Learning Team slack channel just when there was a conversation starting to revamp the infrastructure and I jumped in to help.

With the innovations in static site generation etc. the Right Way™️ seemed to be for this to be an Ember app.

## The Details

I am going to go into the details of the whole project in a series of posts, as it was a really large scoped project that took many months there is a lot to cover. This is my current plan of what I want to tackle but please let us know if you have any requests! I will update this post with links as they are available but you can subscribe for updates or follow the rss feed for this topic

* Strict requirements - how we used Percy to change the entire infrastructure without it changing at all
* Starting to Build - using [pre-existing experiments](https://github.com/rtablada/broccoli-blog-api) to ultimately build broccoli-static-site-json
* The build - the main process and the methodical work to get it working
* The Chalanges - some of the issues we faced along the way
* Tech Highlights - prember etc.
* The Launch - aka. the long tail - aka. the last mile
