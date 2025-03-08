import { BunPlugin } from "bun"



const filterRegexp = /.+\.{apng|bmp|png|jpg|jpeg|jfif|pjpeg|pjp|gif|svg|ico|webp|avif|cur}$/m


/**
 * Resolves absolute source imports to Vite post-build assets.
 * 
 * @example
 * import ImagePNG from "./image.png" // => "/home/user/project/src/component/image.png".
 * 
 * 
 * @example
 * Bun.plugin(viteAssetsImportResolution(...))
 * 
 * import ImagePNG from "./image.png" // => "/assets/image-asdz2.png".
 */
export function viteAssetsImportResolution(rootPath: string, assets: Record<string, string[]>): BunPlugin {
  const assetSources = Object.entries(assets).reduce((result, [asset, sources]) => {
    sources.forEach(source => result.set(source, "/" + asset))
    return result
  }, new Map<string, string>())

  return {
    name: "vite-assets-import",
    setup(build) {
      build.onLoad({ filter: filterRegexp }, async args => {
        const relativeAssetPath = args.path.substring(rootPath.length + 1)
        const asd = assetSources.get(relativeAssetPath) ?? "not found"
        console.log(asd)
        return { contents: `export default "${asd}"` }
      })
    },
  }
}
