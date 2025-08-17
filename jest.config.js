module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)",
  ],
  moduleNameMapper: {
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@contexts/(.*)$": "<rootDir>/contexts/$1",
    "^@constants/(.*)$": "<rootDir>/constants/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
