"use strict";
// Based on https://github.com/SitePen/dts-generator
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const mkdirp = require("mkdirp");
const os = require("os");
const pathUtil = require("path");
const ts = require("typescript");
const lodash_1 = require("lodash");
const SyntaxKind = ts.SyntaxKind;
const filenameToMid = (function () {
    if (pathUtil.sep === "/") {
        return function (filename) {
            return filename;
        };
    }
    else {
        const separatorExpression = new RegExp(pathUtil.sep.replace("\\", "\\\\"), "g");
        return function (filename) {
            return filename.replace(separatorExpression, "/");
        };
    }
})();
function getFilenames(files) {
    return files.map(function (filename) {
        const resolvedFilename = pathUtil.resolve(filename);
        return resolvedFilename;
    });
}
function getMembers(members) {
    return members.map((member) => {
        switch (member.kind) {
            case ts.SyntaxKind.PropertySignature:
                let pdNode = member;
                let type = getTypeSpec(pdNode);
                type.required = !pdNode.questionToken;
                return type;
            case ts.SyntaxKind.IndexSignature:
                let sigNode = member;
                return {
                    kind: "IndexSignature",
                    required: false,
                    in: sigNode.parameters.map((param) => getType(param.type)),
                    out: getType(sigNode.type),
                };
            default:
                return ("I don't know how to handle Type literal type " +
                    SyntaxKind[member.kind] +
                    ". " +
                    "Why not submit a PR?");
        }
    });
}
function getEnumMembers(members) {
    return members.map((member) => {
        switch (member.kind) {
            case ts.SyntaxKind.EnumMember:
                let enNode = member;
                return {
                    kind: "EnumMember",
                    name: enNode.name.text,
                    value: getExpression(enNode.initializer),
                };
            default:
                return ("I don't know how to handle enum subtype " +
                    SyntaxKind[member.kind] +
                    ". " +
                    "Why not submit a PR?");
        }
    });
}
function getExpression(node) {
    switch (node.kind) {
        case ts.SyntaxKind.FirstLiteralToken:
            return node.text;
        default:
            return ("I don't know how to handle expression subtype " +
                SyntaxKind[node.kind] +
                ". Why not submit " +
                "a PR?");
    }
}
function getType(node) {
    switch (node.kind) {
        case ts.SyntaxKind.TypeReference:
            let trNode = node;
            if ("right" in trNode.typeName) {
                return trNode.typeName.right.text;
            }
            else {
                return trNode.typeName.text;
            }
        case ts.SyntaxKind.StringKeyword:
            return "string";
        case ts.SyntaxKind.NumberKeyword:
            return "number";
        case ts.SyntaxKind.BooleanKeyword:
            return "boolean";
        case ts.SyntaxKind.AnyKeyword:
            return "boolean";
        case ts.SyntaxKind.ArrayType:
            let arNode = node;
            return `${getType(arNode.elementType)}[]`;
        case ts.SyntaxKind.TypeLiteral: {
            let litNode = node;
            return {
                kind: "typeLiteral",
                members: getMembers(litNode.members),
            };
        }
        default:
            return ("I don't know how to handle type " +
                SyntaxKind[node.kind] +
                ". Why not submit a PR?");
    }
}
function getTypeSpec(decl) {
    if (decl.type.kind === ts.SyntaxKind.FunctionType) {
        let fnNode = decl.type;
        return {
            name: decl.name.text,
            kind: "FunctionDeclaration",
            in: fnNode.parameters.map((param) => getType(param.type)),
            out: getType(fnNode.type),
        };
    }
    else {
        return {
            name: decl.name.text,
            kind: getType(decl.type),
        };
    }
}
function processTree(sourceFile) {
    let code = "";
    let cursorPosition = 0;
    function skip(node) {
        cursorPosition = node.end;
    }
    function readThrough(node) {
        code += sourceFile.text.slice(cursorPosition, node.pos);
        cursorPosition = node.pos;
    }
    function handleSymbol(node, implicitExport = false) {
        const children = node.getChildren(sourceFile);
        let asts = [];
        const syntaxList = (0, lodash_1.find)(children, (child) => child.kind === ts.SyntaxKind.SyntaxList);
        const isExport = implicitExport ||
            node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (!isExport) {
            return;
        }
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration: {
                const fdNode = node;
                // ast.children = children.map(child => visit(child)).filter(node => Boolean(node));
                let ast = {
                    kind: SyntaxKind[node.kind],
                    name: fdNode.name.text,
                    in: fdNode.parameters.map((param) => getType(param.type)),
                    out: getType(fdNode.type),
                };
                asts.push(ast);
                break;
            }
            case ts.SyntaxKind.VariableStatement: {
                const vdNode = node;
                asts = vdNode.declarationList.declarations.map((decl) => {
                    return getTypeSpec(decl);
                });
                break;
            }
            case ts.SyntaxKind.InterfaceDeclaration: {
                const icNode = node;
                let ast = {
                    kind: SyntaxKind[node.kind],
                    name: icNode.name.text,
                    members: getMembers(icNode.members),
                    extends: (0, lodash_1.flatten)(icNode.heritageClauses
                        ? icNode.heritageClauses.map((clause) => clause.types.map((t) => t.expression.text))
                        : []),
                };
                asts.push(ast);
                break;
            }
            case ts.SyntaxKind.ModuleDeclaration: {
                let modDec = node;
                let ast = {
                    name: modDec.name.text,
                    symbols: (0, lodash_1.flatten)((0, lodash_1.flatten)(children
                        .filter((node) => node.kind === ts.SyntaxKind.ModuleBlock)
                        .map((child) => child.statements.map((sym) => handleSymbol(sym, true)))
                        .filter((a) => Boolean(a)))),
                };
                asts.push(ast);
                break;
            }
            case ts.SyntaxKind.EnumDeclaration: {
                let enDec = node;
                let ast = {
                    kind: SyntaxKind[node.kind],
                    name: enDec.name.text,
                    members: getEnumMembers(enDec.members),
                };
                asts.push(ast);
                break;
            }
            default: {
                let ast = {
                    kind: SyntaxKind[node.kind],
                };
                ast.error =
                    "I don't know how to handle export type " +
                        SyntaxKind[node.kind] +
                        ". Why not submit a PR?";
                ast.childCount = children
                    .map((child) => visit(child))
                    .filter((node) => Boolean(node)).length;
                asts.push(ast);
                break;
            }
        }
        return asts;
    }
    function visit(node) {
        // console.log('sk', SyntaxKind[node.kind]);
        // console.log((node as any).text && (node as any).text.substr(0, 500));
        const children = node.getChildren(sourceFile);
        let ast = {
            kind: SyntaxKind[node.kind],
        };
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
                return (0, lodash_1.flatten)(children.map((child) => visit(child)).filter((node) => Boolean(node)));
            case ts.SyntaxKind.SyntaxList:
                return children
                    .map((child) => visit(child))
                    .filter((node) => Boolean(node));
            case ts.SyntaxKind.ModuleDeclaration:
                let modDec = node;
                ast.name = modDec.name.text;
                ast.symbols = (0, lodash_1.flatten)((0, lodash_1.flatten)(children
                    .filter((node) => node.kind === ts.SyntaxKind.ModuleBlock)
                    .map((child) => child.statements.map((sym) => handleSymbol(sym)))
                    .filter((a) => Boolean(a)))).filter((a) => Boolean(a));
                break;
            case ts.SyntaxKind.EndOfFileToken:
                return null;
            default:
                ast = handleSymbol(node, true);
                ast.handled = false;
                // ast.childCount = children.map(child => visit(child)).filter(node => Boolean(node)).length;
                break;
        }
        return ast;
    }
    return visit(sourceFile);
}
function generate(options) {
    const noop = function (message, ...optionalParams) { };
    const sendMessage = options.sendMessage || noop;
    const verboseMessage = options.verbose ? sendMessage : noop;
    const eol = options.eol || os.EOL;
    const nonEmptyLineStart = new RegExp(eol + "(?!" + eol + "|$)", "g");
    const target = options.target || ts.ScriptTarget.Latest;
    verboseMessage(`taget = ${target}`);
    const compilerOptions = {
        declaration: true,
        module: ts.ModuleKind.CommonJS,
        target: target,
    };
    if (options.outDir) {
        verboseMessage(`outDir = ${options.outDir}`);
        compilerOptions.outDir = options.outDir;
    }
    if (options.moduleResolution) {
        verboseMessage(`moduleResolution = ${options.moduleResolution}`);
        compilerOptions.moduleResolution = options.moduleResolution;
    }
    const filenames = getFilenames(options.files);
    verboseMessage("filenames:");
    filenames.forEach((name) => {
        verboseMessage("  " + name);
    });
    const excludesMap = {};
    options.exclude = options.exclude || ["node_modules/**/*.d.ts"];
    if (options.exclude) {
        verboseMessage("exclude:");
        options.exclude.forEach((name) => {
            verboseMessage("  " + name);
        });
    }
    mkdirp.sync(pathUtil.dirname(options.out));
    /* node.js typings are missing the optional mode in createWriteStream options and therefore
     * in TS 1.6 the strict object literal checking is throwing, therefore a hammer to the nut */
    const output = fs.createWriteStream(options.out, {
        mode: parseInt("644", 8),
    });
    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram(filenames, compilerOptions, host);
    let decls = [];
    return new Promise(function (resolve, reject) {
        output.on("close", () => {
            resolve(undefined);
        });
        output.on("error", reject);
        if (options.externs) {
            options.externs.forEach(function (path) {
                sendMessage(`Writing external dependency ${path}`);
                output.write(`/// <reference path="${path}" />` + eol);
            });
        }
        sendMessage("processing:");
        program.getSourceFiles().some(function (sourceFile) {
            // Source file is a default library, or other dependency from another project, that should not be included in
            // our bundled output
            if (excludesMap[filenameToMid(pathUtil.normalize(sourceFile.fileName))]) {
                return;
            }
            sendMessage(`  ${sourceFile.fileName}`);
            console.assert(sourceFile.fileName.slice(-5) === ".d.ts");
            decls = decls.concat(processTree(sourceFile));
            return false;
        });
        sendMessage(`output to "${options.out}"`);
        output.write(JSON.stringify((0, lodash_1.flatten)(decls), null, 2));
        output.end();
    });
}
exports.default = generate;
function main(argv) {
    const kwArgs = {
        files: [],
        sendMessage: console.log.bind(console),
    };
    for (let i = 0; i < argv.length; ++i) {
        const arg = argv[i];
        if (arg.charAt(0) === "-") {
            const key = argv[i].replace(/^-+/, "");
            const value = argv[i + 1];
            ++i;
            if (key === "exclude") {
                if (!kwArgs.exclude) {
                    kwArgs.exclude = [];
                }
                kwArgs.exclude.push(value);
            }
            else if (key === "extern") {
                if (!kwArgs.externs) {
                    kwArgs.externs = [];
                }
                kwArgs.externs.push(value);
            }
            else if (key === "verbose") {
                kwArgs.verbose = true;
                /* decrement counter, because vebose does not take a value */
                --i;
            }
            else {
                kwArgs[key] = value;
            }
        }
        else {
            kwArgs.files.push(argv[i]);
        }
    }
    if (!kwArgs["out"]) {
        console.error(`Missing required argument "out"`);
        process.exit(1);
    }
    if (kwArgs.files.length === 0) {
        console.error("Missing files");
        process.exit(1);
    }
    console.log("Starting");
    return generate(kwArgs).then(function () {
        console.log("Done!");
    });
}
main(process.argv.slice(2)).then(function (code) {
    return process.exit(code || 0);
}, function (err) {
    throw err;
});
