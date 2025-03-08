# bun-vite-assets-import
Generates a Vite bundle map and Resolves source imports to Vite Build Assets

## Usage

**`index.ts`**
```ts
import bundleMap from "./build/bundle.map.json"
import Component from 

Bun.plugin(viteAssetsImportResolution(path.resolve("./"), bundleMap.assets))

const { default: Component } = await import("./Component.tsx")
```

**`Component.tsx`**
```tsx
import ImagePNG from "./image.png"

function Component() {}
```

The `"./image.png"` will not be resolved to the path relative to the component file location (`/home/user/project/src/component/image.png`),
instead it will be resolved accordingly to the generated bundle map (`/assets/image-ashdz5.png`).
