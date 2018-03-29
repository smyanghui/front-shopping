
let AppInterface = {
  domain: 'http://abc.com',

  za: window.ZAIAppJSInterface || {
    setWebViewMenu: (menuData) => {
      __DEBUG__ && console.info('AppInterface.aa.setWebViewMenu', JSON.parse(menuData));
    }
  }

}

export default AppInterface;