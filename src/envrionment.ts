declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_APP_TOKEN: string;
      VUE_APP_PASSWORD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
