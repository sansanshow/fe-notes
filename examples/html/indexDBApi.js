/**
 * 打开或新建数据库
 * @param {string} db_name 数据库名称
 * @param {int} db_version 数据库版本
 * @param {function} succ_cb 回调第一个参数为IDBOpenDBRequest对象 
 * @param {function} err_cb 
 * @param {function} upgrd_cb 回调第一个参数为IDBOpenDBRequest对象
 * @returns {object} 
 */
function openDB(db_name, db_version, succ_cb, err_cb, upgrd_cb) {
    var request = window.indexedDB.open(db_name, db_version); //IDBOpenDBRequest
    request.onerror = function(event) {
        console.warn('数据库打开错误', event);
        err_cb();
    }
    var iDBDatabase = null;
    request.onsuccess = function(event) {
        iDBDatabase  = request.result;
        db = request.result;
        console.log('数据库打开成功', event);
        succ_cb(iDBDatabase);
    }

    request.onupgradeneeded = function(event) {
        iDBDatabase = event.target.result;
        console.log('指定数据库版本过高，升级数据库');
        upgrd_cb(iDBDatabase);
    }
    return {
        db: iDBDatabase,
        name: name,
        version: db_version
    }
}

/**
 * 创建 ObjectStore 此函数必须在 upgradeneeded 或者versionchage中调用
 * @param {IDBDatabase} iDBDatabase 
 * @param {string} name 表名称
 * @param {enum} auth_type 读写权限`readonly`、`readwrite`之一。默认值`readonly`
 */
function createObjectStore(iDBDatabase, name, keyPath) {
    // todo 如何根据传来的信息优雅的创建主键
    var objectStore = iDBDatabase.createObjectStore(name, {keyPath: keyPath});
    return objectStore
}
/**
 * 创建索引
 * @param {ObjectStore} objectStore 
 * @param {Map} options key:为索引名称 value: {key: 索引键, options: {可选的对象值}}
 */
function createIndex(objectStore, options) {
    for(var idx_name in options) {
        objectStore.createIndex(idx_name,options[idx_name].key, options[idx_name].options || {})
    }
}
 /**
  * 添加数据
  * @param {IDBDatabase} iDBDatabase 
  * @param {string} objectStore_name 
  * @param {enum} open_type
  * @param {*} data 要插入的数据
  */
function add(iDBDatabase, objectStore_name, open_type = 'readonly', data) {
    var request = iDBDatabase.transaction([objectStore_name], open_type)
        .objectStore(objectStore_name)
        .add(data);
    return new Promise((resolve, reject) => {
        request.onsuccess = function(e) {
            console.log('数据写入成功');
            resolve()
        }
        request.onerror = function(e) {
            console.warn('数据写入失败',e);
            reject()
        }
    })
    
}

var DB = {
    openDB: openDB,
    createObjectStore: createObjectStore,
    createIndex: createIndex,
    add: add
}