# Essay, Like Lim

A static personal essay website designed for GitHub Pages.

## Preview locally

Run a local static-file server from this directory, then open its HTTP address in a browser. Opening the HTML as a direct `file://` URL prevents YouTube from receiving the referring website and causes player error 153.

For example, with Python installed:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a public repository named `<your-username>.github.io`.
2. Push these files to the repository's `main` branch.
3. Open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then save.

The site will appear at `https://<your-username>.github.io` after GitHub finishes publishing it.

## Before publishing

- Replace the sample biography, essay titles, dates, and text.
- Connect the newsletter form to a mailing-list service; it currently shows an on-page confirmation only.

## Checklist email

The checklist is available at `checklist.html`. It sends checked items to `ye3031@gmail.com` in the background through Google Apps Script; visitors do not need to log in or open an email application.

### Connect automatic email delivery

Never share your Google password or account recovery information.

1. Sign in to your Google account and open [script.google.com](https://script.google.com).
2. Select **New project** and name it `Essay Like Lim Checklist`.
3. Replace the editor's sample code with the contents of `google-apps-script/Code.gs`.
4. Open **Project Settings**, enable **Show "appsscript.json" manifest file in editor**, and replace that file with `google-apps-script/appsscript.json`.
5. Select **Deploy → New deployment**.
6. Choose **Web app** as the deployment type.
7. Set **Execute as** to **Me** and **Who has access** to **Anyone**. Do not choose “Anyone with Google account,” because that would require visitors to sign in.
8. Select **Deploy**, approve the requested mail permission, and copy the Web app URL ending in `/exec`.
9. In `checklist.html`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE` with that `/exec` URL.
10. Push the updated files to GitHub Pages and test one checked item.

If you modify `Code.gs` later, create a new deployment version from **Deploy → Manage deployments → Edit**. Keep the same deployment URL.
