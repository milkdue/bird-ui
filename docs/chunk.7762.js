"use strict";(self.webpackChunkBIRD=self.webpackChunkBIRD||[]).push([[7762],{7762:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});var a=[Object.freeze({displayName:"Rust",name:"rust",patterns:[{begin:"(<)(\\[)",beginCaptures:{1:{name:"punctuation.brackets.angle.rust"},2:{name:"punctuation.brackets.square.rust"}},comment:"boxed slice literal",end:">",endCaptures:{0:{name:"punctuation.brackets.angle.rust"}},patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#gtypes"},{include:"#lvariables"},{include:"#lifetimes"},{include:"#punctuation"},{include:"#types"}]},{captures:{1:{name:"keyword.operator.macro.dollar.rust"},3:{name:"keyword.other.crate.rust"},4:{name:"entity.name.type.metavariable.rust"},6:{name:"keyword.operator.key-value.rust"},7:{name:"variable.other.metavariable.specifier.rust"}},comment:"macro type metavariables",match:"(\\$)((crate)|([A-Z][A-Za-z0-9_]*))((:)(block|expr|ident|item|lifetime|literal|meta|path?|stmt|tt|ty|vis))?",name:"meta.macro.metavariable.type.rust",patterns:[{include:"#keywords"}]},{captures:{1:{name:"keyword.operator.macro.dollar.rust"},2:{name:"variable.other.metavariable.name.rust"},4:{name:"keyword.operator.key-value.rust"},5:{name:"variable.other.metavariable.specifier.rust"}},comment:"macro metavariables",match:"(\\$)([a-z][A-Za-z0-9_]*)((:)(block|expr|ident|item|lifetime|literal|meta|path?|stmt|tt|ty|vis))?",name:"meta.macro.metavariable.rust",patterns:[{include:"#keywords"}]},{captures:{1:{name:"entity.name.function.macro.rules.rust"},3:{name:"entity.name.function.macro.rust"},4:{name:"entity.name.type.macro.rust"},5:{name:"punctuation.brackets.curly.rust"}},comment:"macro rules",match:"\\b(macro_rules!)\\s+(([a-z0-9_]+)|([A-Z][a-z0-9_]*))\\s+(\\{)",name:"meta.macro.rules.rust"},{captures:{1:{name:"storage.type.rust"},2:{name:"entity.name.module.rust"}},comment:"modules",match:"(mod)\\s+((?:r#(?!crate|[Ss]elf|super))?[a-z][A-Za-z0-9_]*)"},{begin:"\\b(extern)\\s+(crate)",beginCaptures:{1:{name:"storage.type.rust"},2:{name:"keyword.other.crate.rust"}},comment:"external crate imports",end:";",endCaptures:{0:{name:"punctuation.semi.rust"}},name:"meta.import.rust",patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#keywords"},{include:"#punctuation"}]},{begin:"\\b(use)\\s",beginCaptures:{1:{name:"keyword.other.rust"}},comment:"use statements",end:";",endCaptures:{0:{name:"punctuation.semi.rust"}},name:"meta.use.rust",patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#keywords"},{include:"#namespaces"},{include:"#punctuation"},{include:"#types"},{include:"#lvariables"}]},{include:"#block-comments"},{include:"#comments"},{include:"#attributes"},{include:"#lvariables"},{include:"#constants"},{include:"#gtypes"},{include:"#functions"},{include:"#types"},{include:"#keywords"},{include:"#lifetimes"},{include:"#macros"},{include:"#namespaces"},{include:"#punctuation"},{include:"#strings"},{include:"#variables"}],repository:{attributes:{begin:"(#)(\\!?)(\\[)",beginCaptures:{1:{name:"punctuation.definition.attribute.rust"},3:{name:"punctuation.brackets.attribute.rust"}},comment:"attributes",end:"\\]",endCaptures:{0:{name:"punctuation.brackets.attribute.rust"}},name:"meta.attribute.rust",patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#keywords"},{include:"#lifetimes"},{include:"#punctuation"},{include:"#strings"},{include:"#gtypes"},{include:"#types"}]},"block-comments":{patterns:[{comment:"empty block comments",match:"/\\*\\*/",name:"comment.block.rust"},{begin:"/\\*\\*",comment:"block documentation comments",end:"\\*/",name:"comment.block.documentation.rust",patterns:[{include:"#block-comments"}]},{begin:"/\\*(?!\\*)",comment:"block comments",end:"\\*/",name:"comment.block.rust",patterns:[{include:"#block-comments"}]}]},comments:{patterns:[{comment:"documentation comments",match:"^\\s*///.*",name:"comment.line.documentation.rust"},{comment:"line comments",match:"\\s*//.*",name:"comment.line.double-slash.rust"}]},constants:{patterns:[{comment:"ALL CAPS constants",match:"\\b[A-Z]{2}[A-Z0-9_]*\\b",name:"constant.other.caps.rust"},{captures:{1:{name:"storage.type.rust"},2:{name:"constant.other.caps.rust"}},comment:"constant declarations",match:"\\b(const)\\s+([A-Z][A-Za-z0-9_]*)\\b"},{captures:{1:{name:"punctuation.separator.dot.decimal.rust"},2:{name:"keyword.operator.exponent.rust"},3:{name:"keyword.operator.exponent.sign.rust"},4:{name:"constant.numeric.decimal.exponent.mantissa.rust"},5:{name:"entity.name.type.numeric.rust"}},comment:"decimal integers and floats",match:"\\b\\d[\\d_]*(\\.?)[\\d_]*(?:(E|e)([+-]?)([\\d_]+))?(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b",name:"constant.numeric.decimal.rust"},{captures:{1:{name:"entity.name.type.numeric.rust"}},comment:"hexadecimal integers",match:"\\b0x[\\da-fA-F_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b",name:"constant.numeric.hex.rust"},{captures:{1:{name:"entity.name.type.numeric.rust"}},comment:"octal integers",match:"\\b0o[0-7_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b",name:"constant.numeric.oct.rust"},{captures:{1:{name:"entity.name.type.numeric.rust"}},comment:"binary integers",match:"\\b0b[01_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b",name:"constant.numeric.bin.rust"},{comment:"booleans",match:"\\b(true|false)\\b",name:"constant.language.bool.rust"}]},escapes:{captures:{1:{name:"constant.character.escape.backslash.rust"},2:{name:"constant.character.escape.bit.rust"},3:{name:"constant.character.escape.unicode.rust"},4:{name:"constant.character.escape.unicode.punctuation.rust"},5:{name:"constant.character.escape.unicode.punctuation.rust"}},comment:"escapes: ASCII, byte, Unicode, quote, regex",match:"(\\\\)(?:(?:(x[0-7][\\da-fA-F])|(u(\\{)[\\da-fA-F]{4,6}(\\}))|.))",name:"constant.character.escape.rust"},functions:{patterns:[{captures:{1:{name:"keyword.other.rust"},2:{name:"punctuation.brackets.round.rust"}},comment:"pub as a function",match:"\\b(pub)(\\()"},{begin:"\\b(fn)\\s+((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)((\\()|(<))",beginCaptures:{1:{name:"keyword.other.fn.rust"},2:{name:"entity.name.function.rust"},4:{name:"punctuation.brackets.round.rust"},5:{name:"punctuation.brackets.angle.rust"}},comment:"function definition",end:"\\{|;",endCaptures:{0:{name:"punctuation.brackets.curly.rust"}},name:"meta.function.definition.rust",patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#keywords"},{include:"#lvariables"},{include:"#constants"},{include:"#gtypes"},{include:"#functions"},{include:"#lifetimes"},{include:"#macros"},{include:"#namespaces"},{include:"#punctuation"},{include:"#strings"},{include:"#types"},{include:"#variables"}]},{begin:"((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)(\\()",beginCaptures:{1:{name:"entity.name.function.rust"},2:{name:"punctuation.brackets.round.rust"}},comment:"function/method calls, chaining",end:"\\)",endCaptures:{0:{name:"punctuation.brackets.round.rust"}},name:"meta.function.call.rust",patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#attributes"},{include:"#keywords"},{include:"#lvariables"},{include:"#constants"},{include:"#gtypes"},{include:"#functions"},{include:"#lifetimes"},{include:"#macros"},{include:"#namespaces"},{include:"#punctuation"},{include:"#strings"},{include:"#types"},{include:"#variables"}]},{begin:"((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)(?=::<.*>\\()",beginCaptures:{1:{name:"entity.name.function.rust"}},comment:"function/method calls with turbofish",end:"\\)",endCaptures:{0:{name:"punctuation.brackets.round.rust"}},name:"meta.function.call.rust",patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#attributes"},{include:"#keywords"},{include:"#lvariables"},{include:"#constants"},{include:"#gtypes"},{include:"#functions"},{include:"#lifetimes"},{include:"#macros"},{include:"#namespaces"},{include:"#punctuation"},{include:"#strings"},{include:"#types"},{include:"#variables"}]}]},gtypes:{patterns:[{comment:"option types",match:"\\b(Some|None)\\b",name:"entity.name.type.option.rust"},{comment:"result types",match:"\\b(Ok|Err)\\b",name:"entity.name.type.result.rust"}]},interpolations:{captures:{1:{name:"punctuation.definition.interpolation.rust"},2:{name:"punctuation.definition.interpolation.rust"}},comment:"curly brace interpolations",match:'({)[^"{}]*(})',name:"meta.interpolation.rust"},keywords:{patterns:[{comment:"control flow keywords",match:"\\b(await|break|continue|do|else|for|if|loop|match|return|try|while|yield)\\b",name:"keyword.control.rust"},{comment:"storage keywords",match:"\\b(extern|let|macro|mod)\\b",name:"keyword.other.rust storage.type.rust"},{comment:"const keyword",match:"\\b(const)\\b",name:"storage.modifier.rust"},{comment:"type keyword",match:"\\b(type)\\b",name:"keyword.declaration.type.rust storage.type.rust"},{comment:"enum keyword",match:"\\b(enum)\\b",name:"keyword.declaration.enum.rust storage.type.rust"},{comment:"trait keyword",match:"\\b(trait)\\b",name:"keyword.declaration.trait.rust storage.type.rust"},{comment:"struct keyword",match:"\\b(struct)\\b",name:"keyword.declaration.struct.rust storage.type.rust"},{comment:"storage modifiers",match:"\\b(abstract|static)\\b",name:"storage.modifier.rust"},{comment:"other keywords",match:"\\b(as|async|become|box|dyn|move|final|impl|in|override|priv|pub|ref|typeof|union|unsafe|unsized|use|virtual|where)\\b",name:"keyword.other.rust"},{comment:"fn",match:"\\bfn\\b",name:"keyword.other.fn.rust"},{comment:"crate",match:"\\bcrate\\b",name:"keyword.other.crate.rust"},{comment:"mut",match:"\\bmut\\b",name:"storage.modifier.mut.rust"},{comment:"logical operators",match:"(\\^|\\||\\|\\||&&|<<|>>|!)(?!=)",name:"keyword.operator.logical.rust"},{comment:"logical AND, borrow references",match:"&(?![&=])",name:"keyword.operator.borrow.and.rust"},{comment:"assignment operators",match:"(\\+=|-=|\\*=|/=|%=|\\^=|&=|\\|=|<<=|>>=)",name:"keyword.operator.assignment.rust"},{comment:"single equal",match:"(?<![<>])=(?!=|>)",name:"keyword.operator.assignment.equal.rust"},{comment:"comparison operators",match:"(=(=)?(?!>)|!=|<=|(?<!=)>=)",name:"keyword.operator.comparison.rust"},{comment:"math operators",match:"(([+%]|(\\*(?!\\w)))(?!=))|(-(?!>))|(/(?!/))",name:"keyword.operator.math.rust"},{captures:{1:{name:"punctuation.brackets.round.rust"},2:{name:"punctuation.brackets.square.rust"},3:{name:"punctuation.brackets.curly.rust"},4:{name:"keyword.operator.comparison.rust"},5:{name:"punctuation.brackets.round.rust"},6:{name:"punctuation.brackets.square.rust"},7:{name:"punctuation.brackets.curly.rust"}},comment:"less than, greater than (special case)",match:"(?:\\b|(?:(\\))|(\\])|(\\})))[ \\t]+([<>])[ \\t]+(?:\\b|(?:(\\()|(\\[)|(\\{)))"},{comment:"namespace operator",match:"::",name:"keyword.operator.namespace.rust"},{captures:{1:{name:"keyword.operator.dereference.rust"}},comment:"dereference asterisk",match:"(\\*)(?=\\w+)"},{comment:"subpattern binding",match:"@",name:"keyword.operator.subpattern.rust"},{comment:"dot access",match:"\\.(?!\\.)",name:"keyword.operator.access.dot.rust"},{comment:"ranges, range patterns",match:"\\.{2}(=|\\.)?",name:"keyword.operator.range.rust"},{comment:"colon",match:":(?!:)",name:"keyword.operator.key-value.rust"},{comment:"dashrocket, skinny arrow",match:"->",name:"keyword.operator.arrow.skinny.rust"},{comment:"hashrocket, fat arrow",match:"=>",name:"keyword.operator.arrow.fat.rust"},{comment:"dollar macros",match:"\\$",name:"keyword.operator.macro.dollar.rust"},{comment:"question mark operator, questionably sized, macro kleene matcher",match:"\\?",name:"keyword.operator.question.rust"}]},lifetimes:{patterns:[{captures:{1:{name:"punctuation.definition.lifetime.rust"},2:{name:"entity.name.type.lifetime.rust"}},comment:"named lifetime parameters",match:"(['])([a-zA-Z_][0-9a-zA-Z_]*)(?!['])\\b"},{captures:{1:{name:"keyword.operator.borrow.rust"},2:{name:"punctuation.definition.lifetime.rust"},3:{name:"entity.name.type.lifetime.rust"}},comment:"borrowing references to named lifetimes",match:"(\\&)(['])([a-zA-Z_][0-9a-zA-Z_]*)(?!['])\\b"}]},lvariables:{patterns:[{comment:"self",match:"\\b[Ss]elf\\b",name:"variable.language.self.rust"},{comment:"super",match:"\\bsuper\\b",name:"variable.language.super.rust"}]},macros:{patterns:[{captures:{2:{name:"entity.name.function.macro.rust"},3:{name:"entity.name.type.macro.rust"}},comment:"macros",match:"(([a-z_][A-Za-z0-9_]*!)|([A-Z_][A-Za-z0-9_]*!))",name:"meta.macro.rust"}]},namespaces:{patterns:[{captures:{1:{name:"entity.name.namespace.rust"},2:{name:"keyword.operator.namespace.rust"}},comment:"namespace (non-type, non-function path segment)",match:"(?<![A-Za-z0-9_])([A-Za-z0-9_]+)((?<!super|self)::)"}]},punctuation:{patterns:[{comment:"comma",match:",",name:"punctuation.comma.rust"},{comment:"curly braces",match:"[{}]",name:"punctuation.brackets.curly.rust"},{comment:"parentheses, round brackets",match:"[()]",name:"punctuation.brackets.round.rust"},{comment:"semicolon",match:";",name:"punctuation.semi.rust"},{comment:"square brackets",match:"[\\[\\]]",name:"punctuation.brackets.square.rust"},{comment:"angle brackets",match:"(?<!=)[<>]",name:"punctuation.brackets.angle.rust"}]},strings:{patterns:[{begin:'(b?)(")',beginCaptures:{1:{name:"string.quoted.byte.raw.rust"},2:{name:"punctuation.definition.string.rust"}},comment:"double-quoted strings and byte strings",end:'"',endCaptures:{0:{name:"punctuation.definition.string.rust"}},name:"string.quoted.double.rust",patterns:[{include:"#escapes"},{include:"#interpolations"}]},{begin:'(b?r)(#*)(")',beginCaptures:{1:{name:"string.quoted.byte.raw.rust"},2:{name:"punctuation.definition.string.raw.rust"},3:{name:"punctuation.definition.string.rust"}},comment:"double-quoted raw strings and raw byte strings",end:'(")(\\2)',endCaptures:{1:{name:"punctuation.definition.string.rust"},2:{name:"punctuation.definition.string.raw.rust"}},name:"string.quoted.double.rust"},{begin:"(b)?(')",beginCaptures:{1:{name:"string.quoted.byte.raw.rust"},2:{name:"punctuation.definition.char.rust"}},comment:"characters and bytes",end:"'",endCaptures:{0:{name:"punctuation.definition.char.rust"}},name:"string.quoted.single.char.rust",patterns:[{include:"#escapes"}]}]},types:{patterns:[{captures:{1:{name:"entity.name.type.numeric.rust"}},comment:"numeric types",match:"(?<![A-Za-z])(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)\\b"},{begin:"\\b(_?[A-Z][A-Za-z0-9_]*)(<)",beginCaptures:{1:{name:"entity.name.type.rust"},2:{name:"punctuation.brackets.angle.rust"}},comment:"parameterized types",end:">",endCaptures:{0:{name:"punctuation.brackets.angle.rust"}},patterns:[{include:"#block-comments"},{include:"#comments"},{include:"#keywords"},{include:"#lvariables"},{include:"#lifetimes"},{include:"#punctuation"},{include:"#types"},{include:"#variables"}]},{comment:"primitive types",match:"\\b(bool|char|str)\\b",name:"entity.name.type.primitive.rust"},{captures:{1:{name:"keyword.declaration.trait.rust storage.type.rust"},2:{name:"entity.name.type.trait.rust"}},comment:"trait declarations",match:"\\b(trait)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b"},{captures:{1:{name:"keyword.declaration.struct.rust storage.type.rust"},2:{name:"entity.name.type.struct.rust"}},comment:"struct declarations",match:"\\b(struct)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b"},{captures:{1:{name:"keyword.declaration.enum.rust storage.type.rust"},2:{name:"entity.name.type.enum.rust"}},comment:"enum declarations",match:"\\b(enum)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b"},{captures:{1:{name:"keyword.declaration.type.rust storage.type.rust"},2:{name:"entity.name.type.declaration.rust"}},comment:"type declarations",match:"\\b(type)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b"},{comment:"types",match:"\\b_?[A-Z][A-Za-z0-9_]*\\b(?!!)",name:"entity.name.type.rust"}]},variables:{patterns:[{comment:"variables",match:"\\b(?<!(?<!\\.)\\.)(?:r#(?!(crate|[Ss]elf|super)))?[a-z0-9_]+\\b",name:"variable.other.rust"}]}},scopeName:"source.rust",aliases:["rs"]})]}}]);