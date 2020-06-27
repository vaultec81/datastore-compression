const InterfaceDatastore = require('interface-datastore');
const {Key, Adapter} = InterfaceDatastore;
const compressjs = require('compressjs')

class DatastoreCompression extends Adapter {
    constructor(store, options = {}) {
        super();

        this.child = store;

        if(!this.options.algo) {
            this.options.algo = "bzip2"
        }
        this.options = options;
    }

    open() {
        return this.child.open();
    }

    close() {
        return this.child.close();
    }

    put(key, val, options) {
        return this.child.put(key, compressjs[this.options.algo].compressFile(val), options);
    }

    async get(key, options) {
        return compressjs[this.options.algo].decompressFile(await this.child.get(key, options));
    }

    has(key, options) {
        return this.child.has(key, options);
    }

    delete(key, options) {
        return this.child.delete(key, options);
    }
    
    async *query (q, options) { 
        for await(var entry of this.query(q, options)) {
            yield {
                key: entry.key,
                value: compressjs[this.options.algo].decompressFile(entry.value)
            }
        }
    }
}
module.exports = DatastoreCompression;