# Fisher's Fishes Website

## How to Make a New Activity

1. **Copy the Template:**
	- To create a new activity, start by creating a new html file inside `activities` directory. 

	- You may copy `activities/EvoFinitePop.html` with a new filename for reference. Rename your copy with what you want, say, `MyNewActivity.html`.

    - You may also copy the `activites/assets/EvoFinitePop` folder as a template for your new activity at `activites/assets/MyNewActivity`. (Updating the talk content there is given in the next section)

2. **Edit the Content:**
	- Open your new HTML file and replace the talk details, speaker names, dates, and descriptions as needed.

	- Update any links, images, or assets to point to your new resources. Make sure that the images linked to the websites are in `activites/images` folder and the rest of the files inside the `activites/assets/MyNewActivity`

3. **Link Your Activity:**
	- Add a link to your new activity in the `data/activites.json`.

    - Note that, this time the talk assets will be saved in `assets` folder. (Not `activites/assets`)


## How to Update Talks in an Activity

1. **Edit the HTML File:**
	- Open your activity's HTML file (e.g., `activities/MyNewActivity.html`).
	- Locate the section with talk cards (see `EvoFinitePop.html` for reference).
	- For each talk, update the title, speaker, date, time, and description as needed.
	- To add a new talk, copy an existing `<div class="talk-card" ...>` block and modify its content.

2. **Update Talk Assets:**
	- If your talk has slides, abstracts, or related files, place them in your activity's assets folder (e.g., `activities/assets/MyNewActivity/`).
	- Update the links in your HTML to point to these files.

3. **Images and Icons:**
	- Store images for talks in `activities/images/` and reference them in your HTML as needed.




## How to Update Resources

To add resources, just update `data/resources.json`.

---



