# StealthFlow

Open [the supplier catalog workspace](https://caliberfoundry.com/stealthflow/#supplierCatalog) to normalize a UTF-8 CSV or a supplier JSON product object or array. Each product needs a link field. JSON export to CSV preserves nested content as serialized JSON and represents null or absent fields as blank cells. Tracking parameters are removed. Product options, SKU identifiers and other columns stay in the output. Only identical rows after URL normalization are deduplicated.

The browser reads the selected file locally. The bundled catalog contains 50 illustrative records for practising filters and exports. Its JSON panel previews the selected data locally.

For development, serve the site root over HTTP and open /stealthflow/.

If more than one URL column is present the working column is chosen in this order: product_url, canonical_url, url. CSV output prefixes formula-like text with an apostrophe for spreadsheet import. Signed numbers are preserved.

The separate [Combine supplier files](https://caliberfoundry.com/stealthflow/batch.html) workspace sends the selected catalogs to the hosted batch API when you choose Send and combine files. The single-file workspace on the main page processes its input on the device.
