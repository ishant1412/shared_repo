"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const express_1 = __importStar(require("express"));
//@ts-ignore
const pg_1 = require("pg");
const client = new pg_1.Client("postgresql://neondb_owner:npg_j8Wle1uKCBys@ep-crimson-bird-adhqteig-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
client.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const insertQuery = `INSERT INTO users (username, email, password)VALUES ('${username}', '${email}', '${password}');`;
        console.log(insertQuery);
        const response = await client.query(insertQuery);
        console.log(response);
        res.json({
            message: response
        });
    }
    catch (e) {
        res.json({
            message: "error while inserting the data "
        });
    }
});
app.post("/addaddress", async (req, res) => {
    try {
        const { user_id, city, country, street, pincode } = req.body;
        const adressquery = `INSERT INTO addresses(user_id,city,country,street, pincode) VALUES('${user_id}','${city}','${country}','${street}','${pincode}');`;
        const response = await client.query(adressquery);
        res.json({
            message: "nicely done"
        });
    }
    catch (e) {
        res.json({
            message: "oops"
        });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map