:::demo
基础布局
单一分栏创建基础的栅格布局，将一行分成24等份，通过 `col` 组件的 `span` 属性我们就可以自由地组合布局
<layout-base></layout-base>
:::

:::demo
分栏间距
`row` 组件提供属性 `gutter` 设置 `col` 之间的间距，默认为 `0`
<layout-space></layout-space>
:::

:::demo
分栏偏移
`col` 组件提供属性 `offset` 设置 `col` 的偏移
<layout-offset></layout-offset>
:::

:::demo
对齐方式
设置 `row` 组件属性 `flex` 为 `true`，即可开启 `flex` 布局，默认为 `flex-start` 可设置 `justify` 属性指定对齐方式，可选值 `start` `end` `center` `space-around` `space-between` `space-evenly`
<layout-flex></layout-flex>
:::

:::demo
响应式布局
预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`
<layout-media></layout-media>
:::