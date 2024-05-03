export interface Config {
  app?: {
    recommendations: {
      /**
       * Endpoint host URL
       * @visibility frontend
       */
      recommendationsapi: string;
      /**
       * Endpoint host URL
       * @visibility frontend
       */
      feedbackapi: string;
    };
  };
}
