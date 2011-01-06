var sass_tests = [
{
    css : ".foo {\
  baz: bang; }",
    scss : ".foo {// bar: baz;}\
  baz: bang; //}\
}"
},
{
    css : ".foo bar[val='//'] {\
  baz: bang; }",
    scss : ".foo bar[val='//'] {\
  baz: bang; //}\
}"
},
{
    css : "blat {\
  a: foo; }",
    scss : "$var: foo;\
\
blat {a: $var}"
},
{
    css : "foo {\
  a: 2;\
  b: 6; }",
    scss : "foo {\
  $var: 2;\
  $another-var: 4;\
  a: $var;\
  b: $var + $another-var;}"
},
{
    css : "blat {\
  a: foo; }",
    scss : "$vär: foo;\
\
blat {a: $vär}"
},
{
    css : "foo {\
  a: 1; }",
    scss : "$var: 1;\
$var: 2 !default;\
\
foo {a: $var}"
},
{
    css : "foo {\
  a: 2; }",
    scss : "$var: 2 !default;\
\
foo {a: $var}"
},
{
    css : "foo {\
  a: 3;\
  b: -1;\
  c: foobar;\
  d: 12px; }",
    scss : "foo {\
  a: 1 + 2;\
  b: 1 - 2;\
  c: foo + bar;\
  d: floor(12.3px); }"
},
{
      css : "foo {\
  a: b; }\
\
bar {\
  c: d; }",
    scss : "foo {a: b}\
@debug 'hello world!';\
bar {c: d}"
},
{
      css : "bar {\
  c: d; }",
    scss : "@mixin foo { @warn 'this is a mixin';}\
@warn 'this is a warning';\
bar {c: d; @include foo;}"
},
{
    css : ".foo {\
  a: 1;\
  a: 2;\
  a: 3;\
  a: 4; }",
    scss : ".foo {\
  @for $var from 1 to 5 {a: $var;}\
}"
},
{
    css : ".foo {\
  a: 1;\
  a: 2;\
  a: 3;\
  a: 4;\
  a: 5; }",
    scss : ".foo {\
  @for $var from 1 through 5 {a: $var;}\
}"
},
{
    css : "foo {\
  a: b; }",
    scss : "@if 'foo' == 'foo' {foo {a: b}}\
@if 'foo' != 'foo' {bar {a: b}}"
},
{
    css : "bar {\
  a: b; }",
    scss : "@if 'foo' != 'foo' {foo {a: b}}\
@else if 'foo' == 'foo' {bar {a: b}}\
@else if true {baz {a: b}}"
},
{
    css : "bar {\
  a: b; }",
    scss : "@if 'foo' != 'foo' {foo {a: b}}\
@else {bar {a: b}}"
},
{
    css : "foo {\
  a: b;\
  /* This is a comment */\
  c: d; }",
    scss : "foo {\
  @if true {a: b}\
  /* This is a comment */\
  c: d }"
},
{
    css : "foo {\
  a: b;\
  /* This is a comment */\
  c: d; }",
    scss : "foo {\
  @if true {a: b}\
  @else {x: y}\
  /* This is a comment */\
  c: d }"
},
{
    css : ".foo {\
  a: 1;\
  a: 2;\
  a: 3;\
  a: 4; }",
    scss : "$i: 1;\
\
.foo {\
  @while $i != 5 {\
    a: $i;\
    $i: $i + 1;\
  }\
}"
},
{
    css : "a {\
  b: 1px;\
  b: 2px;\
  b: 3px;\
  b: 4px; }\
\
c {\
  d: foo;\
  d: bar;\
  d: baz;\
  d: bang; }",
    scss : "a {\
  @each $number in 1px 2px 3px 4px {\
    b: $number;\
  }\
}\
c {\
  @each $str in foo, bar, baz, bang {\
    d: $str;\
  }\
}"
},
{
    css : "foo {\
  a: 1bar; }",
    scss : "foo {a: 1 + /* flang */ bar}"
},
{
    css : "foo {\
  a: 1blang; }",
    scss : "foo {a: 1 + // flang }\
  blang }"
},
{
    css : "foo bar {\
  a: b; }",
    scss : "foo {bar {a: b}}"
},
{
    css : "foo bar {\
  a: b; }\
foo baz {\
  b: c; }",
    scss : "foo {\
  bar {a: b}\
  baz {b: c}}"
},
{
    css : "foo bar baz {\
  a: b; }\
foo bang bip {\
  a: b; }",
    scss : "foo {\
  bar {baz {a: b}}\
  bang {bip {a: b}}}"
},
{
    css : "foo {\
  a: b; }\
  foo bar {\
    c: d; }",
    scss : "foo {\
  a: b;\
  bar {c: d}}"
},
{
    css : "foo {\
  a: b; }\
  foo bar {\
    c: d; }",
    scss : "foo {\
  bar {c: d}\
  a: b}"
},
{
    css : "foo {\
  ump: nump;\
  grump: clump; }\
  foo bar {\
    blat: bang;\
    habit: rabbit; }\
    foo bar baz {\
      a: b; }\
    foo bar bip {\
      c: d; }\
  foo bibble bap {\
    e: f; }",
    scss : "foo {\
  ump: nump;\
  grump: clump;\
  bar {\
    blat: bang;\
    habit: rabbit;\
    baz {a: b}\
    bip {c: d}}\
  bibble {\
    bap {e: f}}}"
},
{
    css : "foo .bar {\
  a: b; }\
foo :baz {\
  c: d; }\
foo bang:bop {\
  e: f; }",
    scss : "foo {\
  .bar {a: b}\
  :baz {c: d}\
  bang:bop {e: f}}"
},
{
    css : "foo {\
  bar: baz bang bop biddle woo look at all these elems; }\
  foo bar:baz:bang:bop:biddle:woo:look:at:all:these:pseudoclasses {\
    a: b; }\
  foo bar:baz bang bop biddle woo look at all these elems {\
    a: b; }",
    scss : "foo {\
  bar:baz:bang:bop:biddle:woo:look:at:all:these:pseudoclasses {a: b};\
  bar:baz bang bop biddle woo look at all these elems {a: b};\
  bar:baz bang bop biddle woo look at all these elems; }"
},
{
    css : "foo\
bar {\
  a: b; }",
    scss : "foo\
bar {a: b}"
},
{
    css : "foo baz,\
foo bang,\
bar baz,\
bar bang {\
  a: b; }",
    scss : "foo,\
bar {\
  baz,\
  bang {a: b}}"
},
{
    css : "foo\
bar baz\
bang {\
  a: b; }\
foo\
bar bip bop {\
  c: d; }",
    scss : "foo\
bar {\
  baz\
  bang {a: b}\
\
  bip bop {c: d}}"
},
{
    css : "foo bang, foo bip\
bop, bar\
baz bang, bar\
baz bip\
bop {\
  a: b; }",
    scss : "foo, bar\
baz {\
  bang, bip\
  bop {a: b}}"
},
{
    css : "#foo #bar,\
#baz #boom {\
  a: b; }\
\
#bip #bop {\
  c: d; }",
    scss : "#foo #bar,,\
,#baz #boom, {a: b}\
\
#bip #bop, ,, {c: d}"
},
{
    css : "foo:hover {\
  a: b; }\
bar foo.baz {\
  c: d; }",
    scss : "foo {\
  &:hover {a: b}\
  bar &.baz {c: d}}"
},
{
    css : "foo {\
  bar: baz;\
  bang-bip: 1px;\
  bang-bop: bar; }",
    scss : "foo {\
  bar: baz;\
  bang: {\
    bip: 1px;\
    bop: bar;}}"
},
{
    css : "foo {\
  bar: baz;\
  bang-bip: 1px;\
  bang-bop: bar;\
  buzz-fram: 'foo';\
  buzz-frum: moo; }",
    scss : "foo {\
  bar: baz;\
  bang: {\
    bip: 1px;\
    bop: bar;}\
  buzz: {\
    fram: 'foo';\
    frum: moo;\
  }\
}"
},
{
    css : "foo {\
  bar: baz;\
  bang-bip: 1px;\
  bang-bop: bar;\
  bang-blat-baf: bort; }",
    scss : "foo {\
  bar: baz;\
  bang: {\
    bip: 1px;\
    bop: bar;\
    blat:{baf:bort}}}"
},
{
    css : "foo {\
  bar: baz;\
    bar-bip: bop;\
    bar-bing: bop; }",
    scss : "foo {\
  bar: baz {\
    bip: bop;\
    bing: bop; }}"
},
{
    css : "foo {\
  bar: bazbang;\
    bar-bip: bop;\
    bar-bing: bop; }",
    scss : "foo {\
  bar: baz + bang {\
    bip: bop;\
    bing: bop; }}"
},
{
    css : "foo bar:baz {\
  bip: bop; }",
    scss : "foo {\
  bar:baz {\
    bip: bop }}"
},
{
    css : ".foo {\
  a: b; }",
    scss : "@mixin foo {\
  .foo {a: b}}\
\
@include foo;"
},
{
    css : "bar {\
  c: d; }\
  bar .foo {\
    a: b; }",
    scss : "@mixin foo {\
  .foo {a: b}}\
\
bar {\
  @include foo;\
  c: d; }"
},
{
    css : "bar {\
  a: b;\
  c: d; }",
    scss : "@mixin foo {a: b}\
\
bar {\
  @include foo;\
  c: d; }"
},
{
    css : ".foo {\
  a: b; }",
    scss : "@mixin foo() {a: b}\
\
.foo {@include foo();}"
},
{
    css : ".foo {\
  a: b; }",
    scss : "@mixin foo() {a: b}\
\
.foo {@include foo;}"
},
{
    css : ".foo {\
  a: b; }",
    scss : "@mixin foo {a: b}\
\
.foo {@include foo();}"
},
{
    css : ".foo {\
  a: bar; }",
    scss : "@mixin foo($a) {a: $a}\
\
.foo {@include foo(bar)}"
},
{
    css : ".foo {\
  a: bar;\
  b: 12px; }",
    scss : "@mixin foo($a, $b) {\
  a: $a;\
  b: $b; }\
\
.foo {@include foo(bar, 12px)}"
},
{
    css : "foo 3 baz {\
  a: b; }",
    scss : "foo \#{1 + 2} baz {a: b}"
},
{
    css : "foo.bar baz {\
  a: b; }",
    scss : "foo\#{'.bar'} baz {a: b}"
},
{
    css : "foo.bar baz {\
  a: b; }",
    scss : "\#{'foo'}.bar baz {a: b}"
},
{
    css : "foo bar {\
  a: b; }",
    scss : "\#{'foo' + ' bar'} {a: b}"
},
{
    css : "foo barbaz {\
  a: b; }",
    scss : "\#{'foo' + ' bar'}baz {a: b}"
},
{
    css : "foo[val='bar foo bar baz'] {\
  a: b; }",
    scss : "foo[val='bar \#{'foo' + ' bar'} baz'] {a: b}"
},
{
    css : "foo:nth-child(5n) {\
  a: b; }",
    scss : "foo:nth-child(\#{5 + 'n'}) {a: b}"
},
{
    css : ".zzz {\
  a: b; }",
    scss : "$zzz: zzz;\
.\#{$zzz} { a: b; }"
},
{
    css : "#zzz {\
  a: b; }",
    scss : "$zzz: zzz;\
#\#{$zzz} { a: b; }"
},
{
    css : ":zzz::zzz {\
  a: b; }",
    scss : "$zzz: zzz;\
:\#{$zzz}::\#{$zzz} { a: b; }"
},
{
    css : "[zzz=foo] {\
  a: b; }",
    scss : "$zzz: zzz;\
[\#{$zzz}=foo] { a: b; }"
},
{
    css : "div {\
  -foo-a-b-foo: foo; }",
    scss : "$a : a;\
$b : b;\
div { -foo-\#{$a}-\#{$b}-foo: foo }"
},
{
    css : "foo {\
  barbazbang: blip; }",
    scss : "foo {bar\#{'baz' + 'bang'}: blip}"
},
{
    css : "foo {\
  bar3: blip; }",
    scss : "foo {bar\#{1 + 2}: blip}"
},
{
    css : "foo {\
  bazbang: blip; }",
    scss : "foo {\#{'baz' + 'bang'}: blip}"
},
{
    css : "foo {\
  bar: -moz-bip; }",
    scss : "$value : bip;\
\
foo {\
  bar: -moz-\#{$value};\
}"
},
{
    css : "a.foo b {\
  color: red; }",
    scss : "a.\#{'foo'} b\
{color: red}"
},
{
    css : "ul li#foo a span.label {\
  foo: bar; }",
    scss : "$bar : '#foo';\
ul li\#{$bar} a span.label { foo: bar; }"
},
{
    css : ".mixed {\
  required: foo;\
  arg1: default-val1;\
  arg2: non-default-val2; }",
    scss : "@mixin a-mixin($required, $arg1: default-val1, $arg2: default-val2) {\
  required: $required;\
  arg1: $arg1;\
  arg2: $arg2;\
}\
.mixed { @include a-mixin(foo, $arg2: non-default-val2); }"
},
{
    css : ".mixed {\
  required: foo;\
  arg1: default-val1;\
  arg2: default-val2; }",
    scss : "@mixin a-mixin($required, $arg1: default-val1, $arg2: default-val2) {\
  required: $required;\
  arg1: $arg1;\
  arg2: $arg2; }\
.mixed { @include a-mixin($required: foo); }"
},
{
    css : ".mixed {\
  required: foo;\
  arg1: non-default-val1;\
  arg2: non-default-val2; }",
    scss : "@mixin a-mixin($required, $arg1: default-val1, $arg2: default-val2) {\
  required: $required;\
  arg1: $arg1;\
  arg2: $arg2; }\
.mixed { @include a-mixin($arg2: non-default-val2, $arg1: non-default-val1, $required: foo); }"
},
{
    css : ".keyed {\
  color: rgba(170, 119, 204, 0.4); }",
    scss : ".keyed { color: rgba($color: #a7c, $alpha: 0.4) }"
},
{
    css : "foo {\
  a: 3;\
  b: false;\
  c: a b c; }",
    scss : "foo {\
  $var1: 1 +\
    2;\
  $var2: true and\
    false;\
  $var3: a b\
    c;\
  a: $var1;\
  b: $var2;\
  c: $var3; }"
}];