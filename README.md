# Static Assets Import Resolution
Generates a Vite bundle map and Resolves source imports to Vite Build Assets. This includes two plugins: Bun - import resolution and Vite - generating bundle map.

## Motivation

When importing application files that may import assets, they are resolved to the absolute path of your **File System**.
But when rendering your app on the server side (SSR), this behavior leads to these paths occure in an html, which is not correct.

> [!IMPORTANT]  
> This is yet another approach to handling static assets for SSR, you may want to use conventional one, which is building both client and server entry points.

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
instead it will be resolved accordingly to the generated bundle map (e.g. `/assets/image-ashdz5.png`).
