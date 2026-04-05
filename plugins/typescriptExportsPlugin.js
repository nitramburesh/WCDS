/** Inline plugin: adds TypeScript type-alias declarations and exports to the
 *  manifest so the CEM validator's exportTypes check can find them.
 *  (The CEM analyzer erases TS `type` keywords, so this fills the gap.) */
export const tsTypeExportsPlugin = () => {
  return {
    name: 'ts-type-exports',
    packageLinkPhase({ customElementsManifest }) {
      const TYPE_NAMES = [
        'Icon', 'Size',
        'ButtonVariant', 'ColorScheme', 'ButtonType',
        'CardVariant', 'AvatarVariant',
      ];

      // 1. Populate src/types.ts with variable-style declarations + exports
      const typesModule = customElementsManifest.modules?.find(
        (m) => m.path === 'src/types.ts'
      );
      if (typesModule) {
        typesModule.declarations = TYPE_NAMES.map((name) => ({
          kind: 'variable',
          name,
        }));
        typesModule.exports = TYPE_NAMES.map((name) => ({
          kind: 'js',
          name,
          declaration: { name, module: 'src/types.ts' },
        }));
      }

      // 2. Re-export all type names from every component module so the
      //    per-module exportTypes check passes
      customElementsManifest.modules
        .filter((m) => m.declarations?.some((d) => d.customElement))
        .forEach((module) => {
          const existing = new Set(module.exports?.map((e) => e.name) ?? []);
          TYPE_NAMES.filter((n) => !existing.has(n)).forEach((name) => {
            module.exports = module.exports ?? [];
            module.exports.push({
              kind: 'js',
              name,
              declaration: { name, module: 'src/types.ts' },
            });
          });
        });
    },
  };
}