# Tem Arcade

A static browser-game shelf designed for GitHub Pages.

## Add your own game

1. Put a browser game's exported web files in a folder under `games/`, for example `games/my-game/`.
2. Open `games.json` and add an item:

```json
{
  "name": "My Game",
  "description": "A short description",
  "url": "games/my-game/index.html",
  "icon": "🎮"
}
```

3. Commit and push. The game will appear on your shelf.

You can also add a hosted game with the form on the page. Those additions are saved in that browser only; edit `games.json` to publish them for everyone.

## Publish with GitHub Pages

1. Create a new GitHub repository and upload all files in this folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose `main` and `/(root)`, then save.
5. Wait for GitHub Pages to publish the site.

## Important notes

- This runs browser-ready games (HTML/CSS/JavaScript or web exports from engines such as Godot, Unity WebGL, or GDevelop).
- It cannot run Windows `.exe` files directly.
- Some third-party sites block iframe embedding, so those URLs may not load.
- The game player uses a restricted iframe sandbox. This is safer than giving embedded games unrestricted access, but only add games and links you trust.
- This is a static site: no server or database is required.
