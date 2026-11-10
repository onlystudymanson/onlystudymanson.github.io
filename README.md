# Portfolio

Source for [onlystudymanson.github.io](https://onlystudymanson.github.io/), built with the [HugoBlox Academic CV template](https://github.com/HugoBlox/hugo-theme-academic-cv).

- Edit `data/authors/me.yaml` to update the display name, bio, and links.
- Edit `content/_index.md` to arrange the homepage sections.
- Add project pages under `content/projects/` and publication pages under `content/publications/`. Both sections update from those pages. Remove the Publications placeholder in `content/_index.md` when you add your first citation.
- To show a CV download, add your own PDF to `static/uploads/` and add a button to the homepage biography block.

For local preview, install Hugo Extended at the version in `hugoblox.yaml`, plus Go, Node.js, and pnpm. Run `pnpm install --frozen-lockfile` and `pnpm dev`. Run `pnpm build` to produce the static site in `public/`.

GitHub Pages uses the GitHub Actions publishing source. Push to `main` or run **Deploy website to GitHub Pages** manually from the Actions tab.
