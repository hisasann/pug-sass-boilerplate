## app/views/config/*.pug

`app/view/pages/*.pug` 内で、

```pug
block vars
  include ../config/_config
  - var key = "top"
  - var page = pages[key]
```

のように `include` して `var` で宣言しておくと、

`app/views/layout/*.pug` 内の、

```pug
block vars
```

という感じになります。

**OGP** などを `pages` ごとに作りたい場合は、 `config` で json で書いておくと楽かもしれません。

## _（アンダースコア）をファイル名のプレフィックスに付けてください
