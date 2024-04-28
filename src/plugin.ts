import {
  createPlugin,
  createRoutableExtension,
} from "@backstage/core-plugin-api";

import { rootRouteRef } from "./routes";

export const recommendationsPlugin = createPlugin({
  id: "recommendations",
  routes: {
    root: rootRouteRef,
  },
});

export const RecommendationsPage = recommendationsPlugin.provide(
  createRoutableExtension({
    name: "RecommendationsPage",
    component: () =>
      import("./components/RecommendationsComponent").then(
        (m) => m.RecommendationsComponent
      ),
    mountPoint: rootRouteRef,
  })
);
