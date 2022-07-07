function typeOf(obj){
    let res = Object.prototype.toString.call(obj).slice(8,-1)
    res = res.toLowerCase()
    return res
}
console.log(typeOf([]));