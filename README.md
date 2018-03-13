# xing-weapp-component

> 小程序基础组件扩展

## xing组件简介

|组件名|目录|扩展组件|扩展内容|
|---|---|---|---|
|xing-scroll-view|/xing-components/x-scroll-view|[scroll-view](https://mp.weixin.qq.com/debug/wxadoc/dev/component/scroll-view.html)|增加scroll-view自身的下拉刷新功能等|
|xing-image|/xing-components/x-image|[image](https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html)|增加图片的placeholder占位图/broken破图|

## 使用方法

- 复制文件夹 `xing-components` 到项目中

- 在需要使用相关组件的页面的 `json` 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：

```json
{
  "usingComponents": {
    "x-tag-name": "path/to/xing-components/x-tag-name"
  }
}
```

- 在页面的 `wxml` 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值。

```xml
<view>
  <x-tag-name attr-name="attr-value"></x-tag-name>
</view>
```

- [自定义组件官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/)

## 组件文档

### xing-scroll-view

|属性名|类型|默认值|说明|
|---|---|---|---|
|pull-down-height|Number|60|下拉到多少高度时可刷新，单位为 `px` |
|pull-text|String|下拉可以刷新|下拉还不能刷新时显示的文字|
|release-text|String|松开立即刷新|下拉至可刷新时显示的文字|
|loading-text|String|正在刷新数据中|刷新时显示的文字，尾部会自动接 `...` |
|finish-text|String|刷新完成|刷新完成时显示的文字|
|loadmore-text|String|正在加载更多数据|上拉加载更多时显示的文字|
|nomore-text|String|已经全部加载完毕|上拉加载无数据后显示的文字|
|refreshing|Boolean|false|是否正在刷新|
|nomore|Boolean|false|是否没有更多数据（加载完毕）|
|bindpulldownrefresh|HandleEvent||当下拉刷新时触发|
|bindloadmore|HandleEvent||当滚动到底部时触发|
|bindscroll|HandleEvent||同[scroll-view](https://mp.weixin.qq.com/debug/wxadoc/dev/component/scroll-view.html)|

**注意：**

1. 触发 `pulldownrefresh` 事件时，组件的 `refreshing` 属性会被设为 `true` ，刷新完成后将其设为 `false` 以完成刷新
2. 当没有更多数据时，将组件的 `nomore` 属性设为 `true`
3. 每页内容总高度应大于组件的高度，否则在底部加载时会出现问题，因此在当前页确定为最后一页时（如内容不足一页）就应该将 `nomore` 设为 `true`

**示例**

```xml
<view class="header">header</view>
<x-scroll-view refreshing="{{refreshing}}" nomore="{{nomore}}" bindpulldownrefresh="_onPullDownRefresh" bindloadmore="_onLoadmore" bindscroll="_onScroll">
  <block wx:for="{{colors}}" wx:for-index="index" wx:key="index">
    <view class="view" style="background: {{item}}">{{index + 1}}. {{item}}</view>
  </block>
</x-scroll-view>
```

```javascript
Page({

  data: {
    colors: [],
  },

  _randomColor: function () {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${(Math.random() * 0.3 + 0.2).toFixed(1)})`;
  },

  _generateColors: function (length) {
    return new Array(length).fill(null).map(() => this._randomColor());
  },

  //下拉刷新监听函数
  _onPullDownRefresh: function () {
    setTimeout(() => {
      const colors = this._generateColors(20);
      this.setData({
        colors,
        refreshing: false,
      });
    }, 2000);
  },

  //加载更多监听函数
  _onLoadmore: function () {
    setTimeout(() => {
      if (this.data.colors.length == 80) {
        this.setData({ nomore: true })
      } else {
        const colors = this._generateColors(20);
        this.setData({ colors: [...this.data.colors, ...colors] });
      }
    }, 1000);
  },

  _onScroll: function (e) {
    console.log(e);
  },

  onLoad: function (options) {
    const colors = this._generateColors(20);
    this.setData({ colors });
  },
})
```

### xing-image

|属性名|类型|默认值|说明|
|---|---|---|---|
|src|String||同[image](https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html)|
|mode|String|scaleToFill|同[image](https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html)|
|lazy-load|Boolean|false|同[image](https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html)|
|placeholder-image|String|data: image / png; base64, iVBOR...|占位图，支持url、base64、本地目录，默认图：![](data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAIAAABi1XKVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw / eHBhY2tldCBiZWdpbj0i77u / IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8 + IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjgwMkZCRjkxRThDMTFFOEFBODc4NjRDODNBQTY3QjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjgwMkZCRkExRThDMTFFOEFBODc4NjRDODNBQTY3QjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGODAyRkJGNzFFOEMxMUU4QUE4Nzg2NEM4M0FBNjdCMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGODAyRkJGODFFOEMxMUU4QUE4Nzg2NEM4M0FBNjdCMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI / 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)|
|broken-image|String||图片加载失败时显示图片，支持url、base64、本地目录，若未设置则不显示|

**注意：**

`xing-image` 是 `block` 块级元素

**示例**

```xml
<x-image class="x-image" src="https://images.unsplash.com/photo-1516203294340-5ba5f612dc6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b79294f231ab4799218e82818a07de1&auto=format&fit=crop&w=500&q=60"></x-image>
<x-image class="x-image" src="https://images.unsplash.com/photo-1496134732667-ae8d2853a045?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e4dd1c9106a69065ccfa21a36cfb53b1&auto=format&fit=crop&w=500&q=60" placeholder-image="/sources/placeholder.png"></x-image>
<x-image class="x-image" src="http://www.fourzero.four" broken-image="/sources/broken-image.png"></x-image>
```
