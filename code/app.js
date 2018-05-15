"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../lib.d.ts"/>
///<reference path="neo-ts.d.ts"/>
var fs = require("fs");
var readline = require("readline");
//输出一些nodejs 目录
console.log(process.execPath);
console.log(__dirname);
console.log(process.cwd());
//习惯了直接加载，require 只支持commonjs 不方便
function loadNormalJS(filename, namespace) {
    var js = fs.readFileSync(__dirname + "\\" + filename).toString();
    //我这样加一句把命名空间丢进global，对nodejs来说，就可以访问了
    //global["fuck"] =fuck; 相当于在js文件后面加上这样一句
    js += "\r\n global['" + namespace + "']=" + namespace;
    eval(js);
}
function loadNormalJSs(filename, namespaces) {
    var js = fs.readFileSync(__dirname + "\\" + filename).toString();
    for (var i = 0; i < namespaces.length; i++) {
        js += "\r\n global['" + namespaces[i] + "']=" + namespaces[i];
    }
    eval(js);
}
var mapTest = {};
function showMenu() {
    console.log("=====Thinneo sdk TS for nodejs:menu=====");
    for (var key in mapTest) {
        console.log(key + " = " + mapTest[key].name);
    }
}
function initMenu() {
    mapTest["0"] = { name: "test load normal js", call: test_0 };
    mapTest["1"] = { name: "Cryptography", call: test_1 };
    mapTest["2"] = { name: "Hash2Address", call: test_2 };
    mapTest["3"] = { name: "Test_Pubkey2Address", call: test_3 };
    mapTest["4"] = { name: "WifDecode", call: test_4 };
    mapTest["5"] = { name: "Sign&Vertify", call: test_5 };
    mapTest["6"] = { name: "Nep2->Prikey", call: test_6 };
    mapTest["7"] = { name: "PriKey->Nep2", call: test_7 };
}
function test_0() {
    loadNormalJS("../lib.js", "fuck");
    var a = new fuck.abc();
    a.log();
    console.log('Hello world');
}
function test_1() {
    var addr = "ALjSnMZidJqd18iQaoCgFun6iqWRm2cVtj";
    var uint8 = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
    var hexstr = uint8.reverse().toHexString();
    console.log("addr=" + addr);
    console.log("hex=" + hexstr);
}
function test_2() {
    var hexstr = "0x0b193415c6f098b02e81a3b14d0e3b08e9c3f79a";
    var hashrev = hexstr.hexToBytes();
    var hash = hashrev.reverse();
    var addr = ThinNeo.Helper.GetAddressFromScriptHash(hash);
    console.log("hex=" + hexstr);
    console.log("addr=" + addr);
}
function test_3() {
    var pubkey = "02bf055764de0320c8221920d856d3d9b93dfc1dcbc759a560fd42553aa025ba5c";
    var bytes = pubkey.hexToBytes();
    var addr = ThinNeo.Helper.GetAddressFromPublicKey(bytes);
    console.log("pubkey=" + pubkey);
    console.log("addr=" + addr);
}
function test_4() {
    var wif = "L2CmHCqgeNHL1i9XFhTLzUXsdr5LGjag4d56YY98FqEi4j5d83Mv";
    var prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
    var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
    var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    console.log("wif=" + wif);
    console.log("prikey=" + prikey.toHexString());
    console.log("pubkey=" + pubkey.toHexString());
    console.log("addr=" + addr);
}
function test_5() {
    var wif = "L2CmHCqgeNHL1i9XFhTLzUXsdr5LGjag4d56YY98FqEi4j5d83Mv";
    var prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
    var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
    var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    var signdata = "010203ff1122abcd";
    var message = signdata.hexToBytes();
    var data = ThinNeo.Helper.Sign(message, prikey);
    console.log("wif=" + wif);
    console.log("addr=" + addr);
    console.log("sign=" + data.toHexString());
    var b = ThinNeo.Helper.VerifySignature(message, data, pubkey);
    console.log("verify=" + b);
}
function test_6() {
    //這個需要把scrypt換掉
    var nep2 = "6PYT8kA51ffcAv3bJzbfcT6Uuc32QS5wHEjneRdkPYFxZSrirVHRPEpVwN";
    var n = 16384;
    var r = 8;
    var p = 8;
    ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, "1", n, r, p, function (info, result) {
        console.log("info=" + info);
        var prikey = result;
        console.log("result=" + prikey.toHexString());
        var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
        var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
        console.log("address=" + address);
    });
}
function test_7() {
    var n = 16384;
    var r = 8;
    var p = 8;
    var prikey = "94b3335830392a3586c2d7072cfe49efc3ef048876f526cbb7061b30a2278012".hexToBytes();
    ThinNeo.Helper.GetNep2FromPrivateKey(prikey, "1", n, r, p, function (info, result) {
        console.log("info=" + info);
        console.log("result=" + result);
    });
}
function main() {
    loadNormalJSs("neo-ts.js", ["Neo", "ThinNeo"]);
    loadNormalJS("../neo-ts/3rdlib/scrypt-async.js", "scrypt");
    initMenu();
    showMenu();
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("line", function (input) {
        var cleanline = input.replace(" ", "");
        if (cleanline == "?" || cleanline == "？") {
            showMenu();
        }
        if (mapTest[cleanline] != undefined) {
            mapTest[cleanline].call();
        }
    });
}
main();
//# sourceMappingURL=app.js.map