# Visual Decisions

This plugin provides a simple framework for creating and embedding visual decision trees within WordPress. Each diagram is stored as its own custom post type so you can manage them from a dedicated **Visual Decisions** menu in the admin area.

## Features

- **Custom Post Type** `vd_diagram` for storing diagrams.
- **D3 Powered Editor** inside the post edit screen to drag and drop nodes.
- **Shortcode** `[vd_diagram id="123"]` renders the saved diagram using D3 on the front‑end.

This plugin now enqueues the D3 library in both the admin and the front‑end. Basic JavaScript files (`vd-editor.js` and `vd-frontend.js`) demonstrate how D3 can be used to build and view diagrams.
