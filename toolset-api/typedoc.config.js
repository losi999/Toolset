module.exports = {
    out: "typedoc",
    mode: "file",
    module: "commonjs",
    exclude: [
        "**/*.spec.ts",
        "**/inversify.config.ts",
        "node_modules/**",
    ],
    includeDeclarations: true,
    excludeExternals: true,
    excludeNotExporter: true,
    excludePrivate: true,
    externalPatter: "node_modules/**"
};
