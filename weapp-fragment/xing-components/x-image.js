// xing-components/x-image.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholderImage: {
      type: String,
      value: 'default',
    },
    brokenImage: {
      type: String,
    },
    src: {
      type: String,
    },
    mode: {
      type: String,
      value: 'scaleToFill',
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    placeholderType: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onerror: function (e) {
      if (this.properties.brokenImage) {
        this.setData({
          src: this.properties.brokenImage,
        })
      }
    },
  },

  attached: function () {
    const image = this.properties.placeholderImage;
    if (image === 'default') {
      this.setData({ placeholderType: 'default' });
    } else if (image.startsWith('data:') || image.startsWith('http')) {
      this.setData({ placeholderType: 'url' });
    } else {
      this.setData({ placeholderType: 'local' });
    }
  },
})
