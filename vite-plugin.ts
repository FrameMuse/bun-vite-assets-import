function generateBundleMap(): Plugin {
  const source = {
    chunks: [],
    assets: {}
  }

  return {
    name: "BundleMap",
    generateBundle(options, bundle) {
      console.log(options.chunkFileNames)
      Object.values(bundle).forEach(output => {
        if (output.type === "chunk") {
          source.chunks.push(output.fileName)
        }
        if (output.type === "asset") {
          source.assets[output.fileName] = output.originalFileNames
        }
      })

      // @ts-expect-error deprecated fields.
      bundle["bundle.map.json"] = {
        fileName: "bundle.map.json",
        names: [],
        originalFileNames: [],
        source: JSON.stringify(source),
        type: "asset",
        needsCodeReference: false,
      }
    }
  }
}
