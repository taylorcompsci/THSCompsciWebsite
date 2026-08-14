"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambda_function = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var client_s3_1 = require("@aws-sdk/client-s3");
var zod_1 = require("zod");
var BlogPostSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    authors: zod_1.z.array(zod_1.z.string()),
    bucket_url: zod_1.z.url(),
    created_at: zod_1.z.coerce.date(),
    thumbnail_url: zod_1.z.string()
});
var requestSchema = zod_1.z.object({
    action: zod_1.z.enum(["list", "access"], { message: "Make sure you include an action: list or access." }),
    id: zod_1.z.string().optional()
});
var CORS_HEADERS = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
};
var dynamoDbClient = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({ region: (_a = process.env.AWS_REGION) !== null && _a !== void 0 ? _a : "us-east-2" }));
var dbTable = (_b = process.env.DYNAMO_DB_TABLE) !== null && _b !== void 0 ? _b : "blog";
var s3Client = new client_s3_1.S3Client({ region: process.env.AWS_REGION });
function response(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: CORS_HEADERS,
        body: JSON.stringify(body),
    };
}
function listBlogPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var Items, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dynamoDbClient.send(new lib_dynamodb_1.ScanCommand({ TableName: dbTable }))];
                case 1:
                    Items = (_a.sent()).Items;
                    items = Items === null || Items === void 0 ? void 0 : Items.map(function (item) { return BlogPostSchema.safeParse(item); }).filter(function (data) { return data.success; }).map(function (item) { return item.data; });
                    return [2 /*return*/, response(200, items)];
            }
        });
    });
}
function getBlogPost(blogPostID) {
    return __awaiter(this, void 0, void 0, function () {
        var Item, schemaParse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (blogPostID === "-1")
                        return [2 /*return*/, response(400, { message: "Invalid blog post ID." })];
                    return [4 /*yield*/, dynamoDbClient.send(new lib_dynamodb_1.GetCommand({
                            Key: {
                                id: blogPostID
                            },
                            TableName: dbTable
                        }))];
                case 1:
                    Item = (_a.sent()).Item;
                    schemaParse = BlogPostSchema.parse(Item);
                    return [2 /*return*/, response(200, schemaParse)];
            }
        });
    });
}
var lambda_function = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonEvent, parsedJsonEvent, schemaValidate, parsedEvent, id, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                console.log("Request:".concat(JSON.stringify(event)));
                jsonEvent = typeof event.body == "string" ? validate_json((_a = event.body) !== null && _a !== void 0 ? _a : "{}") : { res: event.body, success: true };
                if (!jsonEvent.success)
                    return [2 /*return*/, response(400, { message: "Invalid JSON" })];
                parsedJsonEvent = (_b = jsonEvent.res) !== null && _b !== void 0 ? _b : {};
                schemaValidate = requestSchema.safeParse(parsedJsonEvent);
                if (!schemaValidate.success)
                    return [2 /*return*/, response(400, { message: schemaValidate.error.flatten().fieldErrors })];
                parsedEvent = schemaValidate.data;
                if (!(parsedEvent.action === "list")) return [3 /*break*/, 2];
                return [4 /*yield*/, listBlogPosts()];
            case 1: return [2 /*return*/, _d.sent()];
            case 2:
                id = (_c = parsedEvent.id) !== null && _c !== void 0 ? _c : "-1";
                return [4 /*yield*/, getBlogPost(id)];
            case 3: return [2 /*return*/, _d.sent()];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _d.sent();
                console.log("[ERROR] - ".concat(err_1));
                return [2 /*return*/, response(500, { message: "Internal Server Error. Please contact server admin!" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.lambda_function = lambda_function;
function validate_json(s) {
    try {
        var body = JSON.parse(s);
        return { res: body, success: true };
    }
    catch (err) {
        return { res: {}, success: false };
    }
}
