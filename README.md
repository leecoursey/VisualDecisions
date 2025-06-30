# Visual Decisions

This plugin provides a simple framework for creating and embedding visual decision trees within WordPress. Each diagram is stored as its own custom post type so you can manage them from a dedicated **Visual Decisions** menu in the admin area.

## Features

- **Custom Post Type** `vd_diagram` for storing diagrams.
- **D3 Powered Editor** inside the post edit screen. Double-click the canvas to add nodes, click one node then another to create a connection, and drag nodes around.
- When connecting nodes you will be prompted for a branch label (e.g., "Yes" or "No").
- **Shortcode** `[vd_diagram id="123"]` renders the saved diagram using D3 on the front‑end.

The plugin bundles the D3 library locally so it works without relying on a CDN. Both the admin and the front‑end load this script along with `vd-editor.js` and `vd-frontend.js` for basic editing and rendering of diagrams.

## Usage

1. Activate the plugin in WordPress.
2. Navigate to **Visual Decisions → Add New** and build your diagram with the D3 editor.
3. Publish the diagram and embed it in any post or page with `[vd_diagram id="123"]`, replacing `123` with the diagram ID.
