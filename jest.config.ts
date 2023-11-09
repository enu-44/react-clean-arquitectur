export default {
    testEnvironment: 'jest-environment-jsdom',
    //setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "^.+\\.svg$": "jest-svg-transformer",
      //"\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js",
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    moduleDirectories:[
      "node_modules",
      "<rootDir>/src"
    ],
    transform: {
      "^.+\\.(tsx|ts)?$": "ts-jest",
    },
  };
   