(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{"25e0":function(e,t,r){var a=r("6792");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=r("4f06").default;i("254fb128",a,!0,{sourceMap:!1,shadowMode:!1})},"38d4":function(e,t,r){"use strict";r.r(t);var a=r("790b"),i=r.n(a);for(var s in a)"default"!==s&&function(e){r.d(t,e,(function(){return a[e]}))}(s);t["default"]=i.a},6062:function(e,t,r){"use strict";var a=r("6d61"),i=r("6566");e.exports=a("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(e,t,r){"use strict";var a=r("9bf2").f,i=r("7c73"),s=r("e2cc"),n=r("0366"),o=r("19aa"),c=r("2266"),u=r("7dd0"),h=r("2626"),l=r("83ab"),d=r("f183").fastKey,v=r("69f3"),f=v.set,b=v.getterFor;e.exports={getConstructor:function(e,t,r,u){var h=e((function(e,a){o(e,h,t),f(e,{type:t,index:i(null),first:void 0,last:void 0,size:0}),l||(e.size=0),void 0!=a&&c(a,e[u],e,r)})),v=b(t),w=function(e,t,r){var a,i,s=v(e),n=y(e,t);return n?n.value=r:(s.last=n={index:i=d(t,!0),key:t,value:r,previous:a=s.last,next:void 0,removed:!1},s.first||(s.first=n),a&&(a.next=n),l?s.size++:e.size++,"F"!==i&&(s.index[i]=n)),e},y=function(e,t){var r,a=v(e),i=d(t);if("F"!==i)return a.index[i];for(r=a.first;r;r=r.next)if(r.key==t)return r};return s(h.prototype,{clear:function(){var e=this,t=v(e),r=t.index,a=t.first;while(a)a.removed=!0,a.previous&&(a.previous=a.previous.next=void 0),delete r[a.index],a=a.next;t.first=t.last=void 0,l?t.size=0:e.size=0},delete:function(e){var t=this,r=v(t),a=y(t,e);if(a){var i=a.next,s=a.previous;delete r.index[a.index],a.removed=!0,s&&(s.next=i),i&&(i.previous=s),r.first==a&&(r.first=i),r.last==a&&(r.last=s),l?r.size--:t.size--}return!!a},forEach:function(e){var t,r=v(this),a=n(e,arguments.length>1?arguments[1]:void 0,3);while(t=t?t.next:r.first){a(t.value,t.key,this);while(t&&t.removed)t=t.previous}},has:function(e){return!!y(this,e)}}),s(h.prototype,r?{get:function(e){var t=y(this,e);return t&&t.value},set:function(e,t){return w(this,0===e?0:e,t)}}:{add:function(e){return w(this,e=0===e?0:e,e)}}),l&&a(h.prototype,"size",{get:function(){return v(this).size}}),h},setStrong:function(e,t,r){var a=t+" Iterator",i=b(t),s=b(a);u(e,t,(function(e,t){f(this,{type:a,target:e,state:i(e),kind:t,last:void 0})}),(function(){var e=s(this),t=e.kind,r=e.last;while(r&&r.removed)r=r.previous;return e.target&&(e.last=r=r?r.next:e.state.first)?"keys"==t?{value:r.key,done:!1}:"values"==t?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),h(t)}}},6792:function(e,t,r){var a=r("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.container[data-v-08b7b4c9]{width:100%;height:calc(100vh - 150px);overflow:hidden}.container uni-scroll-view[data-v-08b7b4c9]{height:100%}.search-history[data-v-08b7b4c9]{margin:%?20?% %?30?%;font-size:%?26?%}.search-history .search-history-head[data-v-08b7b4c9]{margin-bottom:%?36?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.search-history .search-history-list[data-v-08b7b4c9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.search-history .search-history-list uni-view[data-v-08b7b4c9]{padding:%?16?% %?38?%;border-radius:%?40?%;margin-right:%?30?%;margin-bottom:%?30?%;background:#f7f7f7}.search-hot[data-v-08b7b4c9]{margin:0 %?30?%;font-size:%?26?%}.search-hot .search-hot-head[data-v-08b7b4c9]{margin-bottom:%?36?%}.search-hot .search-hot-item[data-v-08b7b4c9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?58?%}.search-hot .search-hot-item .search-hot-top[data-v-08b7b4c9]{color:#fb2222;width:%?60?%;margin-left:%?8?%}.search-hot .search-hot-item .search-hot-word[data-v-08b7b4c9]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.search-hot .search-hot-item .search-hot-word uni-view[data-v-08b7b4c9]:nth-child(1){color:#000;font-size:%?30?%}.search-hot .search-hot-item .search-hot-word uni-view:nth-child(1) uni-image[data-v-08b7b4c9]{width:%?48?%;height:%?22?%}.search-hot .search-hot-item .search-hot-word uni-view[data-v-08b7b4c9]:nth-child(2){width:%?500?%;color:#878787;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:%?24?%}.search-hot .search-hot-item uni-text[data-v-08b7b4c9]{color:#878787}.search-result[data-v-08b7b4c9]{border-top:%?2?% solid #e4e4e4;padding:%?30?%}.search-result .search-result-item[data-v-08b7b4c9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-bottom:%?30?%;margin-bottom:%?30?%;border-bottom:%?2?% solid #e4e4e4}.search-result .search-result-item .search-result-word uni-view[data-v-08b7b4c9]:nth-child(1){font-size:%?28?%;color:#235790;margin-bottom:%?12?%}.search-result .search-result-item .search-result-word uni-view[data-v-08b7b4c9]:nth-child(2){display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?22?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.search-result .search-result-item .search-result-word uni-view:nth-child(2) uni-image[data-v-08b7b4c9]{width:%?32?%;height:%?20?%;margin-right:%?10?%}.search-result .search-result-item .search-result-word uni-view:nth-child(2) uni-view[data-v-08b7b4c9]{color:#898989}.search-result .search-result-item uni-text[data-v-08b7b4c9]{font-size:%?50?%}.search-suggest[data-v-08b7b4c9]{border-top:%?2?% solid #e4e4e4;padding:%?30?%;font-size:%?26?%}.search-suggest .search-suggest-head[data-v-08b7b4c9]{color:#235790;margin-bottom:%?40?%}.search-suggest .search-suggest-item[data-v-08b7b4c9]{margin-bottom:%?60?%;color:#5d5d5d}.search-suggest .search-suggest-item uni-text[data-v-08b7b4c9]{color:#bdbdbd;margin-right:%?28?%;position:relative;top:%?2?%}',""]),e.exports=t},"78a5":function(e,t,r){"use strict";r.r(t);var a=r("84de"),i=r("38d4");for(var s in i)"default"!==s&&function(e){r.d(t,e,(function(){return i[e]}))}(s);r("d799");var n,o=r("f0c5"),c=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"08b7b4c9",null,!1,a["a"],n);t["default"]=c.exports},"790b":function(e,t,r){"use strict";var a=r("4ea4");r("d3b7"),r("6062"),r("3ca3"),r("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(r("2909"));r("96cf");var s=a(r("1da1")),n={data:function(){return{keyword:"",SearchHot:[],searchHistory:[],searchType:1,searchList:[],searchHint:[]}},onLoad:function(){var e=this;this.getData(),uni.getStorage({key:"searchHistory",success:function(t){e.searchHistory=t.data}})},methods:{ClearClick:function(){this.keyword=""},getData:function(){var e=this;return(0,s.default)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$u.api.SearchHotDefault();case 2:r=t.sent,e.SearchHot=r.data.data;case 4:case"end":return t.stop()}}),t)})))()},handleToWord:function(e){this.keyword=e,this.getSearch(e)},handleToSearch:function(e){this.keyword&&(this.searchHistory.unshift(e),this.searchHistory=(0,i.default)(new Set(this.searchHistory)),this.searchHistory.length>8&&(this.searchHistory.length=8),uni.setStorage({key:"searchHistory",data:this.searchHistory}),this.getSearch(e),this.keyword="")},ClearSearch:function(){var e=this;uni.removeStorage({key:"searchHistory",success:function(t){e.searchHistory=[],e.$u.toast("删除成功！"),e.keyword=""}})},getSearch:function(e){var t=this;return(0,s.default)(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t.keyword){r.next=7;break}return t.keyword=e,r.next=4,t.$u.api.SearchKeywords(e);case 4:a=r.sent,t.searchList=a.data.result.songs,t.searchType=2;case 7:case"end":return r.stop()}}),r)})))()},ToDetail:function(e){uni.navigateTo({url:"/pages/detail/detail?id="+e})},ToChange:function(e){var t=this;return(0,s.default)(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e){r.next=4;break}t.searchType=1,r.next=10;break;case 4:if(!e){r.next=10;break}return t.searchType=3,r.next=8,t.$u.api.SearchSuggest(e);case 8:a=r.sent,t.searchHint=a.data.result.allMatch;case 10:case"end":return r.stop()}}),r)})))()}}};t.default=n},"84de":function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){return a}));var a={musicHead:r("077d").default,uSearch:r("530d").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("musicHead",{attrs:{title:"搜索",isShow:!0,iconblack:!0}}),a("v-uni-view",{staticClass:"u-m-30"},[a("u-search",{attrs:{clearabled:!0,placeholder:"搜索的歌曲/歌手",height:"70"},on:{search:function(t){arguments[0]=t=e.$handleEvent(t),e.handleToSearch(e.keyword)},custom:function(t){arguments[0]=t=e.$handleEvent(t),e.handleToSearch(e.keyword)},change:function(t){arguments[0]=t=e.$handleEvent(t),e.ToChange.apply(void 0,arguments)},clear:function(t){arguments[0]=t=e.$handleEvent(t),e.ClearClick.apply(void 0,arguments)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),a("v-uni-view",{staticClass:"container"},[a("v-uni-scroll-view",{attrs:{"scroll-y":"true"}},[1==e.searchType?[a("v-uni-view",{staticClass:"search-history"},[a("v-uni-view",{staticClass:"search-history-head"},[a("v-uni-text",[e._v("历史记录")]),a("v-uni-text",{staticClass:"iconfont icon-shanchu",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ClearSearch.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"search-history-list"},e._l(e.searchHistory,(function(t,r){return a("v-uni-view",{key:r,on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.handleToWord(t)}}},[e._v(e._s(t))])})),1)],1),a("v-uni-view",{staticClass:"search-hot"},[a("v-uni-view",{staticClass:"search-hot-head"},[e._v("热搜榜")]),e._l(e.SearchHot,(function(t,r){return a("v-uni-view",{key:r,staticClass:"search-hot-item",on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.handleToWord(t.searchWord)}}},[a("v-uni-view",{staticClass:"search-hot-top"},[e._v(e._s(r+1))]),a("v-uni-view",{staticClass:"search-hot-word"},[a("v-uni-view",[e._v(e._s(t.searchWord)),a("v-uni-image",{attrs:{src:t.iconUrl,mode:"aspectFit"}})],1),a("v-uni-view",[e._v(e._s(t.content))])],1),a("v-uni-text",{staticClass:"search-hot-count"},[e._v(e._s(t.score))])],1)}))],2)]:2==e.searchType?[a("v-uni-view",{staticClass:"search-result"},e._l(e.searchList,(function(t,i){return a("v-uni-view",{key:i,staticClass:"search-result-item",on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.ToDetail(t.id)}}},[a("v-uni-view",{staticClass:"search-result-word"},[a("v-uni-view",[e._v(e._s(t.name))]),a("v-uni-view",[t.mark>60&&t.mark<70?a("v-uni-image",{attrs:{src:r("dc4e")}}):e._e(),a("v-uni-view",[e._v(e._s(t.artists[0].name)+" - "+e._s(t.album.name))])],1)],1),a("v-uni-text",{staticClass:"iconfont icon-bofang"})],1)})),1)]:e._e(),3==e.searchType?[a("v-uni-view",{staticClass:"search-suggest"},[a("v-uni-view",{staticClass:"search-suggest-head"},[e._v("搜索“"+e._s(e.keyword)+"”")]),e._l(e.searchHint,(function(t,r){return a("v-uni-view",{key:r,staticClass:"search-suggest-item",on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.handleToWord(t.keyword)}}},[a("v-uni-text",{staticClass:"iconfont icon-sousuo_2"}),e._v(e._s(t.keyword))],1)}))],2)]:e._e()],2)],1)],1)},s=[]},d799:function(e,t,r){"use strict";var a=r("25e0"),i=r.n(a);i.a},dc4e:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAAC4CAIAAAD8L7dsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAR0SURBVHic7dy/q859HMfx6xzHrxwMlH/AwCCdya9EoWSwGhSyG+UfMFE2MjLJIjkTg6RsJDLIdDIcclKK04Wcc/kX7vM65z53r+7HY3/1PjqefafzGRtdvDjILCyEQ2DNmmA0vuI/BvAvkSvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUkCvUmMgfhbhzJ1l9+BCe27YtWW3cGJ4bjZLVx4/hud27w2Em+9ctLobnhsNk9eJFeO748XCYGY++eZcuJaeSS8B/Qa5QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QQ65QY2K1D759Gw6np5PV1avhubVrk9Xr1+G5VX785caNZPX0aXhuYnX/m926laz+/AnPnT0bDpfO1xVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqLOPP/Eejlfsx/oFdu5LVw4fhuZmZZDU/H557+TJZnTkTntu5M1kdOBCe+/YtWf3+HZ7bvDlZbdkSnvv5Mxwuna8r1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1FjG4y9jY8kqe8NlkL6rMjsbnjt5MlnNzYXnJieT1eJieO7UqWR192547vHjZLV3b3ju8OFkde9eeO7atWR1/34w8nWFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGnKFGst4TWI0SlbZGxSDweD582Q1NRWey94W+P49PDcR/SKuXAnPvXuXrHbsCM9lT3M8eBCem5lJVtevh+ey313E1xVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqyBVqrPrjL9mzI4PB4OjRZHXkSHju9Olk9exZeG44TFbbt4fnfv1KVl+/hud+/EhW+/eH59atS1aPHoXnzp0Lh0vn6wo15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao15Ao1lvGaxHiU+sGD4bnp6WR182Z47tOnZPXlS3huYSFZxa9JzM0lq/fvw3MXLiSrJ0/CcydOJKs3b8Jzt28nq+gxFl9XqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqCFXqLGMx18ynz+Hw0OHktWxY+G59euT1dat4blNm5LV7Gx4Lns1ZsOG8NyrV8lq377w3J49yWpqKjw3HCary5eDka8r1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1JAr1BgbnT8fTicnV/Qngf+T+flg5OsKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNeQKNf4C60OGpTLe3nMAAAAASUVORK5CYII="}}]);