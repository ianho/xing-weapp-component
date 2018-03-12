// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: [],
    refreshing: false,
  },

  _randomColor: function () {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${(Math.random() * 0.4 + 0.1).toFixed(1)})`;
  },

  _onPullDownRefresh: function () {
    setTimeout(() => {
      const colors = [];
      for (let i = 0; i < 20; i++) {
        colors.push(this._randomColor());
      }
      this.setData({
        colors,
        refreshing: false,
      });
    }, 2000);
  },

  _onLoadmore: function () {
    setTimeout(() => {
      if (this.data.colors.length == 80) {
        this.setData({
          nomore: true,
        })
        return;
      }
      const colors = [];
      for (let i = 0; i < 20; i++) {
        colors.push(this._randomColor());
      }
      this.setData({
        colors: [...this.data.colors, ...colors],
      });
    }, 1000);
  },

  _onScroll: function (e) {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const colors = [];
    for (let i = 0; i < 20; i++) {
      colors.push(this._randomColor());
    }
    this.setData({ colors });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})