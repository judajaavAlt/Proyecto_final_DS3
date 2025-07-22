// test.config.js

const nextJest = require("next/jest")

// Indica la ruta a tu directorio base. Suele ser "./" si el archivo está en la raíz:
const createJestConfig = nextJest({
  dir: "./",
})

/** @type {import('jest').Config} */
const customJestConfig = {
  // Simula un ambiente de navegador (jsdom) para pruebas de componentes React
  testEnvironment: "jest-environment-jsdom",

  // Ignora la carpeta .next y node_modules
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  // Opcional: generar carpeta coverage/ con reporte de cobertura
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage",

  // Si usas TypeScript:
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Si usas alias, por ejemplo @/ -> src/
  // Ajusta a tu estructura
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // (Opcional) Ajustes extra: por ejemplo, si tienes un jest.setup.js
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}

module.exports = createJestConfig(customJestConfig)
