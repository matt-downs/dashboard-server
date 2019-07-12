# dashboard-server

A simple HTTP server used to generate a dashboard for display on a wall mounted kindle.

## Modules

- Modules must expose a `render()` method that returns a string. The string can contain HTML.
- Modules are loaded from the `modules` array defined in `config.json`. The name property needs to be a local path to the module or the npm package name for the module.
