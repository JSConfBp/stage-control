const {createClient} = require('redis')

const createStore = () => {
  let client
  if (process.env.NODE_ENV === 'production') {
    client = createClient(process.env.REDIS_URL)
  } else {
    client = createClient({ host: process.env.REDIS_URL })
  }

  client.on('connect', () => console.log('Redis Client Connect'));
  client.on('ready', () => console.log('Redis Client Ready'));
  client.on('end', () => console.log('Redis Client End'));
  client.on('reconnecting', () => console.log('Redis Client Reconnecting'));
  client.on('error', (err) => console.log('Redis Client Error', err));

  client.connect();
  return client
}

const store = createStore()
// migrate(store)

exports.hset = async (hash, key, value) => store.HSET(hash, key, value)
exports.hget = async (hash, key) => store.HGET(hash, key)
exports.hgetall = async (hash) => store.HGETALL(hash)

exports.rpush = async (list, ...values) => store.RPUSH(list, ...values)
exports.lrange = async (list, from, to) => store.LRANGE(list, from, to)
exports.llen = async (list) => store.llen(list)
exports.lindex = async (list, index) => store.LINDEX(list, index)
exports.lrem = async (list, index) => store.LREM(list, index)

exports.zcard = async (set) => store.ZCARD(set)
exports.zadd = async (set, score, item) => store.ZADD(set, score, item)
exports.zrange = async (set, from, to) => store.ZRANGE(set, from, to)

exports.sadd = async (set, item) => store.SADD(set, item)
exports.smembers = async (set) => store.SMEMBERS(set)

exports.set = async (key, value) => store.set(key, JSON.stringify(value))
exports.get = async (key) => {
    const value = await store.get(key)
    return JSON.parse(value)
}
exports.del = async (key) => {
  if (key instanceof Array) {
    return store.del(...key)
  } else {
    return store.del(key)
  }
}

exports.keys = require('./keys')
