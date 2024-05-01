export interface Config {
  app?: {
    recommendations: {
      recommendationsapi: string;
      /**
       * Endpoint host URL
       * @visibility frontend
       */
      feedbackapi: string;
      /**
       * Endpoint host URL
       * @visibility frontend
       */
    };
  };
}
