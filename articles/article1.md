# How to Write Articles in Markdown

Welcome to the guide on writing Markdown articles for the Fisher's Fishes website! This short tutorial will teach you enough to write informative articles in our articles section.

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
| Fenced Code Block | ```` ```js\nconst x = 5;\n``` ```` |
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

## Embedding Media

Website embeddings can be copied from other websites that allow them. For example, you can embed a YouTube video using the share > embed option, like this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/fXW-QjBsruE?si=2TS_muHgrGTrQqa3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Similarly, you can embed Google Maps or other iframe-based widgets.

---

## Including Javascript

This article shows a range of formatting options and capabilities you can use when writing your articles. While we support images, tables, formatting, and even HTML for layout, keep in mind that advanced JavaScript features may not always work as expected inside Markdown (yet). However, if you would still like to have some javascript components in your article, you can directly write html code. You can take the [Lotka-Volterra Model](/articles/lv_model.html) simulation page as a reference.

---

With the presentation freedom provided by the setup almost anything is possible. Try to make things fun, not just functional.

Happy Writing.
