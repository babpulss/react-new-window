import data from "../data.json";
import shpwrite from "@mapbox/shp-write";

export async function mapboxshpwrite() {
  const zipData = await shpwrite.zip(data, {
    folder: "my_internal_shapes_folder",
    filename: "my_zip_filename",
    outputType: "blob",
    compression: "DEFLATE",
    types: {
      point: "mypoints",
      polygon: "mypolygons",
      polyline: "mylines",
    },
  });

  const url = URL.createObjectURL(
    new Blob([zipData], { type: "application/zip" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.zip";
  a.click();
  URL.revokeObjectURL(url);
}
