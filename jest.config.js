// jest.config.js
export default {
    transform: {}, 
    testEnvironment: 'node', 
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1', // Remapeo opcional para la resolución de módulos
    }
};
