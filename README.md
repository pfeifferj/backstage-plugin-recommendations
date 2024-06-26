# recommendations

Welcome to the recommendations plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/recommendations](http://localhost:3000/recommendations).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

1. Configure the plugin in your `app-config.yaml`:

The following is the minimum configuration required:

```yaml
# app-config.yaml
app:
  recommendations:
    recommendationsapi: https://example.com/recs
    feedbackapi: https://example.com/feedback
```
