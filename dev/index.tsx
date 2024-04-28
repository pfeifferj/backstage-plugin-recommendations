import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { recommendationsPlugin, RecommendationsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(recommendationsPlugin)
  .addPage({
    element: <RecommendationsPage />,
    title: 'Root Page',
    path: '/recommendations',
  })
  .render();
