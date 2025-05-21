# How to Write Articles in Markdown

Welcome to the guide on writing Markdown articles for the Fisher’s Fishes website! This short tutorial will teach you enough to write informative articles in our articles section.

---

## Markdown Formatting

The website supports articles in markdown format. An overview of markdown and what can be done with it can be seen here at [markdownguide.org](https://www.markdownguide.org/getting-started/).

A quick cheat-sheet for markdown formatting is given below:

<details>
<summary><strong>Basic Syntax</strong></summary>

| Element | Markdown Syntax |
|---------|----------------|
| Heading | `# H1`<br>`## H2`<br>`### H3` |
| Bold | `**bold text**` |
| Italic | `*italicized text*` |
| Blockquote | `> blockquote` |
| Ordered List | `1. First item`<br>`2. Second item`<br>`3. Third item` |
| Unordered List | `- First item`<br>`- Second item`<br>`- Third item` |
| Code | `` `code` `` |
| Horizontal Rule | `---` |
| Link | `[title](https://www.example.com)` |
| Image | `![alt text](image.jpg)` |

</details>

<details>
<summary><strong>Extended Syntax</strong></summary>

| Element | Markdown Syntax |
|---------|----------------|
| Table | ```\| Syntax \| Description \|```<br>```\| ----------- \| ----------- \|```<br>```\| Header \| Title \|```<br>```\| Paragraph \| Text \|``` |
| Fenced Code Block | ``````` ```{   "firstName": "John",   "lastName": "Smith",   "age": 25 } ``` ``````|
| Footnote | `Here's a sentence with a footnote. [^1]`<br>`[^1]: This is the footnote.` |
| Heading ID | `### My Great Heading {#custom-id}` |
| Definition List | `term : definition` |
| Strikethrough | `~~The world is flat.~~` |
| Task List | `- [x] Write the press release`<br>`- [ ] Update the website`<br>`- [ ] Contact the media` |
| Emoji | `That is so funny! :joy:` |
| Highlight | `I need to highlight these ==very important words==.` |
| Subscript | `H~2~O` |
| Superscript | `X^2^` |

</details>

---

## Adding Assets

If you want to add some extra files other than the markdown (say images, pdfs, etc.) you can add them to the `articles/assets` folder. Make sure to rename the file to add prefix of `<Your article number>_`. 

For example, this is article number 1. Thus all the assets uploaded as a part of this article will have a `1_` prefix. You can find the image used in the next section at the path `articles/assets/1_Kinesin.gif`.

---

## Images and GIFs

You can add images and gifs directly from the internet (by providing the url) or upload it to the `articles/assets` folder. You can then add the images on the websites using the syntax mentioned above and specifying the path. It will look kind of like this:

![Kinesin](/articles/assets/1_Kinesin.gif)

---

## HTML Inclusions

You can write html tags along with markdown syntax to extend the functionality. For instance, see how `<div>` tags from html is used to create the following "two-columns" design. 

<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0;">
  <div style="flex: 1; min-width: 250px;">
    <p>Column One<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies, nunc at tincidunt malesuada.</p>
  </div>
  <div style="flex: 1; min-width: 250px;">
    <p>Column Two<br/>Suspendisse potenti. Donec quis bibendum neque. Praesent lacinia nisl sit amet eros vestibulum. </p>
  </div>
</div>

---

### iFrames

Website embeddings can be copied from other websites that can displayed on your article. One use case for this will be for attaching youtube videos. Instead of just attaching the link, you can copy the embed after clicking the share button from youtube. You can directly paste it here, and it will look somewhat like this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/fXW-QjBsruE?si=2TS_muHgrGTrQqa3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Similarly, you can do with other websites, like google maps:

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.0936016853852!2d85.68355561095348!3d20.171827881193533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19aea7a433ea4b%3A0x455d13f7d6284a15!2sNational%20Institute%20of%20Science%20Education%20and%20Research!5e0!3m2!1sen!2sin!4v1747838759724!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>