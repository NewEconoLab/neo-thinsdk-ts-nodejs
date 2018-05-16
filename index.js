/// <reference path="code/neo-ts.d.ts" />

var fs = require("fs");
var path = require("path");
var readline = require('readline');

//习惯了直接加载，require 只支持commonjs 不方便
function loadNormalJS(filename, namespace){
    var js = fs.readFileSync(path.join(__dirname,filename)).toString();

    //我这样加一句把命名空间丢进global，对nodejs来说，就可以访问了
    //global["fuck"] =fuck; 相当于在js文件后面加上这样一句
    js += "\r\n global['" + namespace + "']=" + namespace;
    eval(js);
}
function loadNormalJSs(filename, namespaces){
    var js = fs.readFileSync(path.join(__dirname, filename)).toString();
    for (var i = 0; i < namespaces.length; i++) {
        js += "\r\n global['" + namespaces[i] + "']=" + namespaces[i];
    }
    eval(js);
}

loadNormalJSs("code/neo-ts.js", ["Neo", "ThinNeo"]);
loadNormalJS("neo-ts/3rdlib/scrypt-async.js", "scrypt");


//sample

//test_1();
//console.log("");
//test_2();
//console.log("");
//test_3();
//console.log("");
//test_4();
//console.log("");
//test_5();
//console.log("");
//test_6();
//console.log("");
//test_7();

//function test_1() {
//    console.log("Cryptography");
//    var addr = "ALjSnMZidJqd18iQaoCgFun6iqWRm2cVtj";
//    var uint8 = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
//    var hexstr = uint8.reverse().toHexString();
//    console.log("addr=" + addr);
//    console.log("hex=" + hexstr);
//}
//function test_2() {
//    console.log("Hash2Address");
//    var hexstr = "0x0b193415c6f098b02e81a3b14d0e3b08e9c3f79a";
//    var hashrev = hexstr.hexToBytes();
//    var hash = hashrev.reverse();
//    var addr = ThinNeo.Helper.GetAddressFromScriptHash(hash);
//    console.log("hex=" + hexstr);
//    console.log("addr=" + addr);
//}
//function test_3() {
//    console.log("Test_Pubkey2Address");

//    var pubkey = "02bf055764de0320c8221920d856d3d9b93dfc1dcbc759a560fd42553aa025ba5c";
//    var bytes = pubkey.hexToBytes();
//    var addr = ThinNeo.Helper.GetAddressFromPublicKey(bytes);
//    console.log("pubkey=" + pubkey);
//    console.log("addr=" + addr);
//}
//function test_4() {
//    console.log("WifDecode");
//    var wif = "L2CmHCqgeNHL1i9XFhTLzUXsdr5LGjag4d56YY98FqEi4j5d83Mv";
//    var prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
//    var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
//    var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
//    console.log("wif=" + wif);
//    console.log("prikey=" + prikey.toHexString());
//    console.log("pubkey=" + pubkey.toHexString());
//    console.log("addr=" + addr);

//}
//function test_5() {
//    console.log("Sign&Vertify");
//    var wif = "L2CmHCqgeNHL1i9XFhTLzUXsdr5LGjag4d56YY98FqEi4j5d83Mv";
//    var prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
//    var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
//    var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);

//    var signdata = "010203ff1122abcd";
//    var message = signdata.hexToBytes();
//    var data = ThinNeo.Helper.Sign(message, prikey);
//    console.log("wif=" + wif);
//    console.log("addr=" + addr);
//    console.log("sign=" + data.toHexString());

//    var b = ThinNeo.Helper.VerifySignature(message, data, pubkey);
//    console.log("verify=" + b);
//}
//function test_6() {
//    console.log("Nep2->Prikey");
//    var nep2 = "6PYT8kA51ffcAv3bJzbfcT6Uuc32QS5wHEjneRdkPYFxZSrirVHRPEpVwN";
//    var n = 16384;
//    var r = 8;
//    var p = 8
//    ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, "1", n, r, p, (info, result) => {
//        console.log("info=" + info);
//        var prikey = result;
//        console.log("result=" + prikey.toHexString());
//        var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
//        var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
//        console.log("address=" + address);

//    });
//}
//function test_7() {
//    console.log("PriKey->Nep2");
//    var n = 16384;
//    var r = 8;
//    var p = 8;

//    var prikey = "94b3335830392a3586c2d7072cfe49efc3ef048876f526cbb7061b30a2278012".hexToBytes();
//    ThinNeo.Helper.GetNep2FromPrivateKey(prikey, "1", n, r, p, (info, result) => {
//        console.log("info=" + info);
//        console.log("result=" + result);
//    });
//}