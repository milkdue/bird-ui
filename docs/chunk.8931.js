"use strict";(self.webpackChunkBIRD=self.webpackChunkBIRD||[]).push([[8931],{8931:(e,n,t)=>{t.r(n),t.d(n,{default:()=>a});var a=[Object.freeze({displayName:"zig",fileTypes:["zig","zon"],name:"zig",patterns:[{include:"#comments"},{include:"#strings"},{include:"#keywords"},{include:"#operators"},{include:"#numbers"},{include:"#support"},{include:"#variables"}],repository:{commentContents:{patterns:[{match:"\\b(TODO|FIXME|XXX|NOTE)\\b:?",name:"keyword.todo.zig"}]},comments:{patterns:[{begin:"//[!/](?=[^/])",end:"$",name:"comment.line.documentation.zig",patterns:[{include:"#commentContents"}]},{begin:"//",end:"$",name:"comment.line.double-slash.zig",patterns:[{include:"#commentContents"}]}]},keywords:{patterns:[{match:"\\binline\\b(?!\\s*\\bfn\\b)",name:"keyword.control.repeat.zig"},{match:"\\b(while|for)\\b",name:"keyword.control.repeat.zig"},{match:"\\b(extern|packed|export|pub|noalias|inline|comptime|volatile|align|linksection|threadlocal|allowzero|noinline|callconv)\\b",name:"keyword.storage.zig"},{match:"\\b(struct|enum|union|opaque)\\b",name:"keyword.structure.zig"},{match:"\\b(asm|unreachable)\\b",name:"keyword.statement.zig"},{match:"\\b(break|return|continue|defer|errdefer)\\b",name:"keyword.control.flow.zig"},{match:"\\b(await|resume|suspend|async|nosuspend)\\b",name:"keyword.control.async.zig"},{match:"\\b(try|catch)\\b",name:"keyword.control.trycatch.zig"},{match:"\\b(if|else|switch|orelse)\\b",name:"keyword.control.conditional.zig"},{match:"\\b(null|undefined)\\b",name:"keyword.constant.default.zig"},{match:"\\b(true|false)\\b",name:"keyword.constant.bool.zig"},{match:"\\b(usingnamespace|test|and|or)\\b",name:"keyword.default.zig"},{match:"\\b(bool|void|noreturn|type|error|anyerror|anyframe|anytype|anyopaque)\\b",name:"keyword.type.zig"},{match:"\\b(f16|f32|f64|f80|f128|u\\d+|i\\d+|isize|usize|comptime_int|comptime_float)\\b",name:"keyword.type.integer.zig"},{match:"\\b(c_char|c_short|c_ushort|c_int|c_uint|c_long|c_ulong|c_longlong|c_ulonglong|c_longdouble)\\b",name:"keyword.type.c.zig"}]},numbers:{patterns:[{match:"\\b0x[0-9a-fA-F][0-9a-fA-F_]*(\\.[0-9a-fA-F][0-9a-fA-F_]*)?([pP][+-]?[0-9a-fA-F_]+)?\\b",name:"constant.numeric.hexfloat.zig"},{match:"\\b[0-9][0-9_]*(\\.[0-9][0-9_]*)?([eE][+-]?[0-9_]+)?\\b",name:"constant.numeric.float.zig"},{match:"\\b[0-9][0-9_]*\\b",name:"constant.numeric.decimal.zig"},{match:"\\b0x[a-fA-F0-9_]+\\b",name:"constant.numeric.hexadecimal.zig"},{match:"\\b0o[0-7_]+\\b",name:"constant.numeric.octal.zig"},{match:"\\b0b[01_]+\\b",name:"constant.numeric.binary.zig"},{match:"\\b[0-9](([eEpP][+-])|[0-9a-zA-Z_])*(\\.(([eEpP][+-])|[0-9a-zA-Z_])*)?([eEpP][+-])?[0-9a-zA-Z_]*\\b",name:"constant.numeric.invalid.zig"}]},operators:{patterns:[{match:"(?<=\\[)\\*c(?=\\])",name:"keyword.operator.c-pointer.zig"},{match:"(\\b(and|or)\\b)|(==|!=)",name:"keyword.operator.comparison.zig"},{match:"(-%?|\\+%?|\\*%?|/|%)=?",name:"keyword.operator.arithmetic.zig"},{match:"(<<%?|>>|!|&|\\^|\\|)=?",name:"keyword.operator.bitwise.zig"},{match:"(==|\\+\\+|\\*\\*|->)",name:"keyword.operator.special.zig"}]},stringcontent:{patterns:[{match:"\\\\([nrt'\"\\\\]|(x[0-9a-fA-F]{2})|(u\\{[0-9a-fA-F]+\\}))",name:"constant.character.escape.zig"},{match:"\\\\.",name:"invalid.illegal.unrecognized-string-escape.zig"}]},strings:{patterns:[{begin:'"',end:'"',name:"string.quoted.double.zig",patterns:[{include:"#stringcontent"}]},{begin:"\\\\\\\\",end:"$",name:"string.multiline.zig"},{match:"'([^'\\\\]|\\\\(x\\h{2}|[0-2][0-7]{,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.))'",name:"string.quoted.single.zig"}]},support:{patterns:[{comment:"Built-in functions",match:"@[_a-zA-Z][_a-zA-Z0-9]*",name:"support.function.builtin.zig"}]},variables:{patterns:[{name:"meta.function.declaration.zig",patterns:[{captures:{1:{name:"storage.type.function.zig"},2:{name:"entity.name.type.zig"}},match:"\\b(fn)\\s+([A-Z][a-zA-Z0-9]*)\\b"},{captures:{1:{name:"storage.type.function.zig"},2:{name:"entity.name.function.zig"}},match:"\\b(fn)\\s+([_a-zA-Z][_a-zA-Z0-9]*)\\b"},{begin:'\\b(fn)\\s+@"',beginCaptures:{1:{name:"storage.type.function.zig"}},end:'"',name:"entity.name.function.string.zig",patterns:[{include:"#stringcontent"}]},{match:"\\b(const|var|fn)\\b",name:"keyword.default.zig"}]},{name:"meta.function.call.zig",patterns:[{match:"([A-Z][a-zA-Z0-9]*)(?=\\s*\\()",name:"entity.name.type.zig"},{match:"([_a-zA-Z][_a-zA-Z0-9]*)(?=\\s*\\()",name:"entity.name.function.zig"}]},{name:"meta.variable.zig",patterns:[{match:"\\b[_a-zA-Z][_a-zA-Z0-9]*\\b",name:"variable.zig"},{begin:'@"',end:'"',name:"variable.string.zig",patterns:[{include:"#stringcontent"}]}]}]}},scopeName:"source.zig"})]}}]);