# Overview

This project is a companion for [open-iframe-resizer](https://github.com/Lemick/open-iframe-resizer). It can be utilized to make open-iframe-resizer gracefully handle server-side navigation within your iframe(s).

This library sets an event listener that restarts the open-iframe-resizer observer. You can utilize it in conjunction with the postMessage API to restart the listener when needed.

If you need to clean up, the controller object exposes a `stop()` method.

# Usage

In the parent iframe:

```html
<iframe id="my-iframe" src="CHILD_IFRAME_SRC"></iframe>

<script type="module">
  import { initialize } from "https://cdn.jsdelivr.net/npm/@open-iframe-resizer/core@v2.3.1/dist/index.min.js";
  import Controller from "WHERE_EVER_YOU_HOST_THIS";

  const controller = new Controller(window, initialize, {}, "#my-iframe");
</script>
```

In the child iframe(s):

```html
<script type="module">
  import { initialize } from "https://cdn.jsdelivr.net/npm/@open-iframe-resizer/core@v2.3.1/dist/index.min.js";

  addEventListener("DOMContentLoaded", (event) => {
    window.parent.postMessage("reset-iframe-resizer", YOUR_ORIGIN);
  });
</script>
```