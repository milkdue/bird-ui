"use strict";(self.webpackChunkBIRD=self.webpackChunkBIRD||[]).push([[2342],{2342:(n,e,t)=>{t.r(e),t.d(e,{default:()=>a});var a=[Object.freeze({displayName:"JSON with Comments",name:"jsonc",patterns:[{include:"#value"}],repository:{array:{begin:"\\[",beginCaptures:{0:{name:"punctuation.definition.array.begin.json.comments"}},end:"\\]",endCaptures:{0:{name:"punctuation.definition.array.end.json.comments"}},name:"meta.structure.array.json.comments",patterns:[{include:"#value"},{match:",",name:"punctuation.separator.array.json.comments"},{match:"[^\\s\\]]",name:"invalid.illegal.expected-array-separator.json.comments"}]},comments:{patterns:[{begin:"/\\*\\*(?!/)",captures:{0:{name:"punctuation.definition.comment.json.comments"}},end:"\\*/",name:"comment.block.documentation.json.comments"},{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment.json.comments"}},end:"\\*/",name:"comment.block.json.comments"},{captures:{1:{name:"punctuation.definition.comment.json.comments"}},match:"(//).*$\\n?",name:"comment.line.double-slash.js"}]},constant:{match:"\\b(?:true|false|null)\\b",name:"constant.language.json.comments"},number:{match:"(?x)\n-?\n(?:\n0\n|\n[1-9]\n\\d*\n)\n(?:\n(?:\n\\.\n\\d+\n)?\n(?:\n[eE]\n[+-]?\n\\d+\n)?\n)?",name:"constant.numeric.json.comments"},object:{begin:"\\{",beginCaptures:{0:{name:"punctuation.definition.dictionary.begin.json.comments"}},end:"\\}",endCaptures:{0:{name:"punctuation.definition.dictionary.end.json.comments"}},name:"meta.structure.dictionary.json.comments",patterns:[{comment:"the JSON object key",include:"#objectkey"},{include:"#comments"},{begin:":",beginCaptures:{0:{name:"punctuation.separator.dictionary.key-value.json.comments"}},end:"(,)|(?=\\})",endCaptures:{1:{name:"punctuation.separator.dictionary.pair.json.comments"}},name:"meta.structure.dictionary.value.json.comments",patterns:[{comment:"the JSON object value",include:"#value"},{match:"[^\\s,]",name:"invalid.illegal.expected-dictionary-separator.json.comments"}]},{match:"[^\\s\\}]",name:"invalid.illegal.expected-dictionary-separator.json.comments"}]},objectkey:{begin:'"',beginCaptures:{0:{name:"punctuation.support.type.property-name.begin.json.comments"}},end:'"',endCaptures:{0:{name:"punctuation.support.type.property-name.end.json.comments"}},name:"string.json.comments support.type.property-name.json.comments",patterns:[{include:"#stringcontent"}]},string:{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.json.comments"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.json.comments"}},name:"string.quoted.double.json.comments",patterns:[{include:"#stringcontent"}]},stringcontent:{patterns:[{match:'(?x)\n\\\\\n(?:\n["\\\\/bfnrt]\n|\nu\n[0-9a-fA-F]{4})',name:"constant.character.escape.json.comments"},{match:"\\\\.",name:"invalid.illegal.unrecognized-string-escape.json.comments"}]},value:{patterns:[{include:"#constant"},{include:"#number"},{include:"#string"},{include:"#array"},{include:"#object"},{include:"#comments"}]}},scopeName:"source.json.comments"})]}}]);