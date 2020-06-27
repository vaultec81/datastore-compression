# datastore-compression
`Datastore-compression is a compression wrapper for interface-datastore compatible datastores allowing for seemless compression`

#### Supported compression algorithms
* Bzip2 (default)
* BWTC
* Lzp3
* PPM 
* Dmc 
* Lzjb 
* LzjbR

As documented in [compressjs readme](https://github.com/cscott/compressjs)

# Install
`npm install datastore-compression`

# Usage 
```javascript
const datastoreCompression = require('datastore-compression');
let datastore; // Insert interface-datastore compliant datastore

const wrappedStore = new datastoreCompression(datastore, {
    algo: "Bzip2" // (optional) Customize to compression algorithm of choice. Default algo is recommended. 
})
```

## Important notes
* Once a datastore is created with a specific compression algorithm it cannot easily be converted to uncompressed or another compression algorithm. Converting already created datastores is not supported this present time. It is recommended to not change compression algorithm.

# License
MIT