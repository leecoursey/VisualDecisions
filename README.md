# Visual Decisions

This plugin provides a simple framework for creating and embedding visual decision trees within WordPress. Each diagram is stored as its own custom post type so you can manage them from a dedicated **Visual Decisions** menu in the admin area.

## Features

- **Custom Post Type** `vd_diagram` for storing diagrams.
k1jzk5-codex/design-wordpress-plugin-for-decision-tree
- **D3 Powered Editor** inside the post edit screen. Double‑click the canvas to add nodes, click one node then another to create a connection and drag nodes around.
- **Shortcode** `[vd_diagram id="123"]` renders the saved diagram using D3 on the front‑end.

The plugin enqueues the D3 library in both the admin and the front‑end. The accompanying JavaScript files (`vd-editor.js` and `vd-frontend.js`) handle basic editing and rendering of diagrams.
