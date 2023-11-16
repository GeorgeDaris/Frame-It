# How to build the extension

This extension was built with vanilla JavaScript and Vue.js for the browser action. The Vue.js code can be found inside the New SFC folder, and run using the following commands:

- `npm install`
- `npm run dev`

To build it, run `npm run build`

After building the extension, you have to copy the CSS and JS files from the `/dist` into their respective firstExtVer.css/js versions found in the browserAction folder. This isn't the most ideal setup, and any feedback is welcome.

For further help, check out the [Vue.js documentation.](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)
