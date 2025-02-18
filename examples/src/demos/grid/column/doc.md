## AG GRID 表格列配置

:::demo
基础表格
基础表格，表格配置 `field` `headerName` `checkboxSelection` `valueFormatter` `valueGetter` `flex` `filter`
<basic-table></basic-table>
:::

:::demo
表格列配置
表格列的属性配置
<definition-table></definition-table>
:::

> `init` 属性仅仅到列被创建时，而状态属性应用列创建或更新时。就是说之后改变后再进行更新列，列的属性保持现有的状态，而状态属性更新时是改变当前前的状态

> `null` 和 `undefined`，属性设置 `null` 表示清空这个属性，`undefined` 表示离开当前状态

|状态属性|初始属性|描述|
|-------|------|----|
|`width`|`initialWidth`|列宽 `number`|
|`flex`|`initialFlex`|自适应列宽、按比例分配 `number`|
|`hide`|`initialHide`|是否隐藏列 `boolean`|
|`pinned`|`initialPinned`|冻结列 `right \| left`|
|`sort`|`initialPinned`|是否是排序字段 `boolean` |
|`sortIndex`|`initialSortIndex`|排序字段优先级 `number`|
|`rowGroup`|`initialRowGroup`|是否行分组 `boolean`|
|`rowGroupIndex`|`initialRowGroupIndex`|分组字段优先级 `number`|
|`pivot`|`initialPivot`|-|
|`pivotIndex`|`initialPivotIndex`|-|
|`aggFunc`|`initialAggFunc`|-|

:::demo
表格列排序
设置 `maintainColumnOrder=true` 时，更新列配置，之前拖动改变的列顺序不会被改变。清空后遵循列配置的顺序，这是希望并且期望的行为。设置 `false` 或不设置时，更新列配置，之前拖动改变的列顺序会被改变。
<column-order-table></column-order-table>
:::

:::demo
表格列事件
包括 `sort-changed` `column-resized` `column-visible` `column-pivot-changed` `column-row-group-changed` `column-value-changed` `column-moved` `column-pinned-changed`
<colum-event-table></colum-event-table>
:::

:::demo
表格分组
表格分组，`groupId` `children`
<column-group-table></column-group-table>
:::

:::demo
表头配置
表头配置信息，`height`
<column-header-table></column-header-table>
:::

:::demo
自定义表头组件
<custom-header-table></custom-header-table>
:::

:::demo
自定义组头组件
<custom-group-table></custom-group-table>
:::

### 其他表格列配置

> `width` 和 `flex` 配置不能同时使用，`width` 优先否则 `flex` 不会生效，所以使用 `flex` 和 `minWidth` 和 `maxWidth` 配置是可以一起工作的

|属性名|类型|描述|
|-----|--|----|
|`resizable`|`boolean`|是否可调整列宽|
|`flex`|`number`|自适应列宽、按比例|
|`minWidth`|`number`|最小宽度|
|`maxWidth`|`number`|最大宽度|

:::demo
自适应容器
<fit-grid-table></fit-grid-table>
:::

|对比总结|||
|-------|----|-----|
|特性|`fitGridWidth`|`fitCellContents`|
|调整依据|网格容器的总宽度|单元格内容的最大宽度|
|是否填满容器|是|可能超出容器|
|内容截断|可能(列宽压缩)|避免|
|性能|高效|可能较慢(大数据量时)|
|场景|自适应布局,占满容器|确保内容完整显示|

:::demo
表格移动
<move-table></move-table>
:::

:::demo
表格可移动性
<movable-table></movable-table>
:::

:::demo
复杂的锁定
<locked-table></locked-table>
:::

:::demo
冻结列
<pinned-table></pinned-table>
:::

:::demo
列合并
<col-span-table></col-span-table>
:::

:::demo
状态应用
<save-apply-table></save-apply-table>
:::

:::demo
组状态
<group-state-table></group-state-table>
:::

:::demo
同步网格
允许多个网格实例之间同步某些行为或状态，例如滚动位置、列宽、行选择。可以使多个网格在视觉交互上保持一致。同步水平滚动，绑定 `horizontalScroll` 事件，同步网格的滚动位置。同步垂直滚动，绑定 `bodyScroll` 事件，同步滚动位置。同步列宽调整，绑定 `columnResized` 事件。同步行选择状态，绑定 `rowSelected` 事件
<align-grid-table></align-grid-table>
:::
