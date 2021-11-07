/**! __CODEPLACEHOLDER_START__ */ /*[PositionForHostEntryCodeBegin]*/ /**! __CODEPLACEHOLDER_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/musicHead/musicHead?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-icon/u-icon?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-search/u-search?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-badge/u-badge?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-tabs/u-tabs?hash=d82f086824acc2def70585fcaeead525511fdb67');
require('../../pages/index/index?hash=1caab40cc4544f90bf65f963b4c7c3529da613b3');
require('../../pages/center/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/search/search?hash=1caab40cc4544f90bf65f963b4c7c3529da613b3');
require('../../components/goodsList/goodsList?hash=d56164bc212b5f38b1d5b99da77a938d15e75314');
require('../../pages/detail/detail?hash=cf5ad42695e071f6042ffa43b347598283d213a5');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}