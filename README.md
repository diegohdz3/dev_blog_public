# Diego's dev blog

A static portfolio and dev blog built with HTML, CSS and JavaScript.

## Project structure

```text
index.html          Home page / site entry point
html/               About, thoughts, projects, contact and certifications
css/                Shared styles
js/                 Navigation, animations and certificate collection
images/             Photos and background images
videos/             Video assets
package.json        Project metadata
```

Open `index.html` directly, or serve the project root with your editor's local web server.
Keep `index.html` at the root so static hosting can use it as the home page.

## Editing pages

- Edit the home page in `index.html` and the other pages in `html/`.
- Edit the shared design in `css/styles.css`.
- Put new images in `images/` and videos in `videos/`.
- From `index.html`, use paths such as `images/photo.png` or `html/about.html`.
- From pages in `html/`, use `../images/photo.png`, `../css/styles.css`,
  `../js/nav.js` and `../index.html`. Links to sibling pages use `about.html`, etc.

## Adding certifications

Add entries to the `certifications` array in `js/certifications.js`.
The collection appears on `html/certifications.html`, linked from About.
An example entry is included as a comment in the script.

Credential URLs can link to a provider's website or to a local file. For a local
PDF, create a `certificates/` folder at the project root and use a URL such as
`../certificates/course.pdf`. These paths are relative to the HTML page.
