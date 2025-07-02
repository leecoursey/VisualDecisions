# Visual Decisions

This plugin provides a simple framework for creating and embedding visual decision trees within WordPress. Each diagram is stored as its own custom post type so you can manage them from a dedicated **Visual Decisions** menu in the admin area.
The editor lets you build a flow of multiple-choice questions and the front-end renders an interactive questionnaire for users.

## Features

- **Custom Post Type** `vd_diagram` for storing diagrams.

- **GoJS Powered Editor** inside the post edit screen. Double‑click the canvas to add nodes, drag to connect them and move nodes around.
- **Shortcode** `[vd_diagram id="123"]` renders the saved diagram using GoJS on the front‑end.

The plugin enqueues a bundled copy of the GoJS library in both the admin and the front‑end. The accompanying JavaScript files (`vd-editor.js` and `vd-frontend.js`) handle basic editing and rendering of diagrams.

The admin editor (`#vd-editor`) defaults to a height of **400px** defined in `css/admin.css`. Adjust this value in the stylesheet if you need a taller or shorter editor area.

