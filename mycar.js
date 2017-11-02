define((require) => {
  let STRING_EMPTY = '',
    DISPLAY_NONE = ' style="display:none;"',
    Utility = require(JS_UTILITY),
    Cookie = Utility.Cookie,
    OOP = Utility.OOP,
    Promise = Utility.Promise,
    stringFormat = Utility.String.stringFormat,
    DateTime = Utility.DateTime,
    Flash = Utility.Flash;

  let Kit = require(useJSComponent('kit')),
    I18N = Kit.use('I18N'),
    Body = Kit.use('Body'),
    Header = Body.Header,
    Footer = Body.Footer,
    Lazyload = Kit.use('Lazyload'),
    Trigger = Kit.use('Trigger'),
    Bussiness = Kit.use('Bussiness');
  const Popup = require('component/popup');

  let IMAGE_DOMAIN = DOMAIN_CONFIG.IMAGE_DOMAIN,
    fullDefaultHead = `${IMAGE_DOMAIN}systemRes/img/default/nophoto.jpg`;
  let language_NUM = {
      en: 1,
      ar: 2,
      tr: 3,
      es: 4,
      pt: 5,
      pl: 6,
      in: 7,
    },
    shopType_Num = {
      ALL: 4,
      VIP: 1,
      MOUNT: 2,
      ITEM: 3,
    },
    specialType_Num = {
      Store_VIP: 1,
      Store_SVIP: 2,
      Store_Mount: 3,
      Store_Gift: 4,
      Store_Flower: 5,
      Store_Exp: 6,
      Store_Badge: 7,
      Store_libao: 8,
    },
    special_NUM = {
      MOUNT: 3,
    }; // 调 shop_list_by_special 表取座驾，约定参数
  flash_Num = {
    1: 'moto',
    3: 'camel',
    4: 'mini',
    5: 'lamborghini',
    157: 'clap',
    158: 'xiaolong',
    159: 'yaoming',
    160: 'woman',
  };

  const TEMPLATE = {
    MAIN: ' <div class="mycar clearfix">{0}{1}\
                     <div class="car_driving" style="display: none;"></div>\
                     {2}{3}\
                 </div>',
    NO_CAR: '<div class="no_car" style="display: none;">\
                      <p data-i18n="MyCar_NoCurrentCarPurchase">{{MyCar_NoCurrentCarPurchase}}</p>\
                      <a href="/store.shtml#mount" data-i18n="MyCar_ClickToBuyTheCar" data-stat="MyCar_ClickToBuyTheCar">{{MyCar_ClickToBuyTheCar}}</a>\
                      <p><img src="/resource/static/image/user/no_cars.png"></p>\
                   </div>',
    NO_DRIVER: '<div class="no_driver" style="display: none;">\
                            <p class="no_driver_buy"><a href="/store.shtml#mount" data-i18n="MyCar_GoBuy" data-stat="MyCar_GoBuy">{{MyCar_GoBuy}}</a><span data-role="carsCount"></span></p>\
                            <p class="no_driver_car">\
                            <img src="/resource/static/image/user/no_cars.png">\
                            <span data-i18n="MyCar_TheCarWithoutAdriver">{{MyCar_TheCarWithoutAdriver}}</span>\
                            </p>\
                        </div>',
    CAR_DRIVING: '<p class="car_driving_buy">\
                                <a href="/store.shtml#mount" data-i18n="MyCar_GoBuy" data-stat="MyCar_GoBuy">{{MyCar_GoBuy}}</a><span data-role="carsCount"></span>\
                            </p>\
                            <p class="car_driving_renew" >{{Mycar_ThebeetleisValiduntil}} {0}<a data-renew="{1}" href="javascript:;" data-i18n="MyCar_Renew" {5} data-stat="MyCar_Renew">{{MyCar_Renew}}</a></p>\
                            <p class="car_driving_car">\
                                {2}\
                                <span>{{MyCar_Driving}}{4}</span>\
                                <a data-change="{3}" href="javascript:;" data-i18n="MyCar_DoNotdrive" data-stat="MyCar_DoNotdrive">{{MyCar_DoNotdrive}}</a>\
                            </p>',
    MYCARS: '<div class="car_product clearfix" style="display:none;">\
                        <ul class="clearfix" data-role="mycarsUl"></ul>\
                    </div>',
    MYCARS_ITEM: '<li>\
                            <p class="car_product_name">{0}</p>\
                            <div class="car_product_top">\
                                {1}\
                                <a class="btn_enable" href="javascript:;" data-change="{3}" {9} data-stat="btn_enable">{2}</a>\
                            </div>\
                            <div class="car_product_bottom clearfix">\
                                <div class="car_product_info">\
                                    <p class="car_product_price">{4}</p>\
                                    <a class="btn_renew" data-renew="{8}" href="javascript:;" data-i18n="MyCar_Renew" {10}  data-stat="MyCar_Renew">{5}</a>\
                                </div>\
                                <p class="car_validity"> {6}</p>\
                            </div>\
                        </li>',
    MOUNT: `<div id="mount" data-key="${shopType_Num.MOUNT}" class="product clearfix" style="display:none;">\
                        <div class="title_mount"><h2 data-i18n="Mycar_Recommend">{{Mycar_Recommend}}</h2></div>\
                        <ul data-role="mountUl" class="clearfix"></ul>\
                   </div>`,
    MOUNT_ITEM: '<li>\
                            <div class="product_top">\
                                <img class="product_img" src="{0}" alt="product" />\
                                {1}\
                                <span data-preview="{2}" data-name="{3}" class="preview" data-stat="Store_Preview{3}">{{Store_Preview}}</span>\
                                <span class="available" {10}>{{Store_RemainPurchaseTime}}{11}</span>\
                            </div>\
                            <div class="product_bottom clearfix">\
                                <div class="product_info">\
                                    <div class="name_block">\
                                        <p class="product_name">\
                                            <span>{3}</span>\
                                            <span class="product_price_old" {4}><strong>{8}</strong>/{9}{{Store_Days}}</span>\
                                        </p>\
                                    </div>\
                                    <p class="product_price"><strong>{5}</strong> /<span>{6}{{Store_Days}}</span></p>\
                                </div>\
                                <a data-buy="{7}" class="btn_buy" href="javascript:;" data-stat="btn_buy">{{Store_Buy}}</a>\
                            </div>\
                        </li>',
    POP: '<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            <h2>{{Store_ChooseQuantityTobuy}}</h2>\
                            <div class="sel">\
                                <div class="sel_num">\
                                    <span data-role="minus" class="minus" >-</span>\
                                    <span class="num"><input data-role="num" type="text" value="1"></span>\
                                    <span data-role="plus" class="plus" >+</span>\
                                </div>\
                                <div class="spent_block" >\
                                    <h3>{{Store_Spend}}:</h3>\
                                    <span data-role="price" class="price"></span>\
                                </div>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-stat="Store_Pop_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-stat="Store_Pop_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>',
    POP_ITEM: '<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            <h2 data-i18n="Store_ChooseTimeTobuy">{{Store_ChooseTimeTobuy}}</h2>\
                            <div class="sel">\
                                <ul class="item_times">\
                                    <li class="active" data-role="item_time" data-times="1" data-i18n="Store_30days" data-stat="Store_30days">{{Store_30days}}</li>\
                                    <li data-role="item_time" data-times="2" data-i18n="Store_60days" data-stat="Store_60days">{{Store_60days}}</li>\
                                    <li data-role="item_time" data-times="3" data-i18n="Store_90days" data-stat="Store_90days">{{Store_90days}}</li>\
                                </ul>\
                            <input data-role="num" type="hidden" value="1">\
                            <span style="display:none;" data-role="price"></span>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;" data-i18n="Store_InsufficientFunds">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-i18n="Store_OK" data-stat="Store_Pop_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-i18n="Store_Cancel" data-stat="Store_Pop_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>',
  };
  const Page = window.Page = {
    run() {
      this.load();
      this.render();
      this.compose();
      this.bind();
      this.start();
    },
    load() {

    },
    render() {
      this.container = $('#container');
      this.container.i18nHTML(Header.html() + stringFormat(TEMPLATE.MAIN, TEMPLATE.NO_CAR, TEMPLATE.NO_DRIVER, TEMPLATE.MYCARS, TEMPLATE.MOUNT) + Footer.html());
      this.wrapper = this.container.find('.mycar');
      this.recommendData = {};
    },
    compose() {
      login_util.setCallback(this.identifyFlow.bind(this));
      Header.init({
        container: this.container,
      });
    },
    bind() {

    },
    start() {
      this.identifyFlow();
    },
    startPromisecar() {
      var promise = new Promise((() => {
        Bussiness.getData('data/static/v4/?car', (data) => {
          if (data.code == 0) {
            const myCars = data.dataInfo.car.d;
            let carShow = {},
              k = 1;
            for (let i = 0; i < myCars.length; i++) {
              carShow[myCars[i].id] = {
                id: myCars[i].id,
                name: myCars[i].n,
                no: myCars[i].no,
                webPic: myCars[i].p,
                webResource: myCars[i].r,
                renewalFees: myCars[i].rf,
                showPrice: myCars[i].sp,
                showType: myCars[i].st,
              };
              k++;
            }
            this.mountResource = carShow;
            //                      console.log(carShow)
            promise.resolve();
          }
        }, null, true);
      })).then(() => {
        if (this.mycar) {
          promise.resolve(this.mycar);
          return true;
        }
        Bussiness.postData('user_get_car.fly', {}, (data) => {
          //                    console.log(data.dataInfo);
          if (data.code == 0 && data.dataInfo) {
            promise.resolve(this.mycar = data.dataInfo);
          }
        });
      }).then((data) => {
        const OJson = [];
        data && data.forEach((item, i) => {
          OJson[i] = OJson[i] || {};
          OJson[i].specialType = special_NUM.MOUNT; // 2
          OJson[i].specialId = item.carId;
        });
        if (OJson.length > 0) {
          if (this.mycar[0].info && this.mycar[0].info[I18N.language]) {
            this.renderMyCar(this.mycar);
            promise.resolve(this.mycar);
            return true;
          }
          Bussiness.postData('shop_list_by_special.fly', {
            language: language_NUM[I18N.language],
            data: JSON.stringify(OJson),
          }, (data) => {
            console.log(language_NUM[I18N.language]);
            console.log(data.dataInfo);
            this.formatMyCarData(data.dataInfo);
            this.renderMyCar(this.mycar);
            promise.resolve(this.mycar);
          });
        } else {
          this.renderMyCar(data);
          promise.resolve(data);
        }
      }).then((data) => {
        if (data && data.length > 0) {
          if (this.recommendData[I18N.language]) {
            this.showMounts(this.recommendData[I18N.language]);
            promise.resolve();
            return true;
          }
          Bussiness.postData('shop_list_info.fly', {
            language: language_NUM[I18N.language],
            shoptypeId: shopType_Num.MOUNT,
            shopFlag: 0,
            pageSize: data.length + 4, // 推荐用户未购买的座驾
            pageNo: 0,
          }, (res) => {
            if (res.code == 0 && res.dataInfo) {
              this.showMounts(this.recommendData[I18N.language] = this.formatRecommendCar(res.dataInfo));
              promise.resolve();
            }
          });
        } else {
          if (this.recommendData[I18N.language]) {
            this.showMounts(this.recommendData[I18N.language]);
            return true;
          }
          Bussiness.postData('shop_recommend_info.fly', {
            language: language_NUM[I18N.language],
            shoptypeId: shopType_Num.MOUNT,
          }, (data) => {
            console.log(data);
            if (data && data.dataInfo) {
              this.showMounts(this.recommendData[I18N.language] = data.dataInfo);
              promise.resolve();
            }
          });
        }
      })
        .then(() => {
          this.bindEvents(this.wrapper);
        });
    },
    formatRecommendCar(data) {
      if (data && data.list) {
        let arrKeys = [],
          resList = [];
        this.mycar.forEach((item) => {
          // arrKeys.push(item.carId);
          item.info[I18N.language].id && arrKeys.push(item.info[I18N.language].id);
        });
        data.list.forEach((item, i) => {
          // item.specialId   item.id
          if (arrKeys.indexOf(item.id) == -1) {
            resList.push(item);
          }
        });
        return resList;
      }
    },
    formatMyCarData(data) {
      if (!this.mycar) return;
      this.mycar.forEach((item, i) => {
        // console.log(this.mycar)
        //  console.log(data)
        this.mycar[i].info = this.mycar[i].info || {};
        this.mycar[i].info[I18N.language] = (data[`${special_NUM.MOUNT}_${item.carId}`] && 　data[`${special_NUM.MOUNT}_${item.carId}`][0]) || this.getSpecialMount(item.carId);
      });
      // console.log('mycar:'+this.mycar);
      return this.mycar;
    },
    getSpecialMount(id) {
      const res = this.mountResource[id];
      //          console.log(res)
      res.price = [];
      res.price.current = res.showPrice;
      res.pic = res.webPic;
      res.isRenew = false;
      return res;
    },
    renderMyCar(data) {
      if (data && data.length > 0) {
        let isDriving = false,
          imgTpl = '<img class="car_product_img" src="{0}" alt="" />';
        this.wrapper.find('[data-role="mycarsUl"]').html(data.map((item, i) => {
          if (item.used) {
            isDriving = i;
          }
          console.log(item.info);
          //						0是mycar,和名字
          return stringFormat(
            //                      	{{0}}
            TEMPLATE.MYCARS_ITEM,
            //                      	{{1}}
            item.info[I18N.language].name,
            //                      	{{2}}
            item.info[I18N.language].pic ? stringFormat(imgTpl, IMAGE_DOMAIN + item.info[I18N.language].pic) : '',
            //                      	{{3}}
            item.used ? '' : i18nTranslate('MyCar_Drive'),
            //                      	{{4}}
            item.used ? `cancel${item.carId}` : item.carId, // item.carId,  item.info.id
            //                      	{{5}}
            item.info[I18N.language].price && item.info[I18N.language].price.current,
            //                      	{{6}}
            i18nTranslate('MyCar_Renew'),
            //                      	{{7}}
            i18nTranslate('Mycar_PeriodOfValidity') + DateTime.showtime((new Date(item.endDate))),
            //                      	{{8}}
            DateTime.countdownTime(item.endDate - new Date().getTime(), true),
            i, // buy
            item.used ? DISPLAY_NONE : '',
            typeof (item.info[I18N.language].isRenew) !== 'undefined' ? DISPLAY_NONE : '',
          );
        })).parent().show();
        if (isDriving !== false) {
          this.wrapper.find('.car_driving').i18nHTML(stringFormat(
            TEMPLATE.CAR_DRIVING,
            DateTime.showtime(new Date(data[isDriving].endDate)),
            isDriving,
            data[isDriving].info[I18N.language].pic ? `<img src="${IMAGE_DOMAIN}${data[isDriving].info[I18N.language].pic}" onerror="this.src='${IMAGE_DOMAIN}static/image/user/car_driving.png'">` : '',
            `cancel${data[isDriving].carId}`,
            data[isDriving].info[I18N.language].name,
            typeof (data[isDriving].info[I18N.language].isRenew) !== 'undefined' ? DISPLAY_NONE : '',
          )).show().find('[data-role="carsCount"]')
            .html(data.length == 1 ? i18nTranslate('MyCar_ThereIsCar') : stringFormat(i18nTranslate('MyCar_ThereAreCars'), data.length));
        } else {
          this.wrapper.find('.no_driver').show().find('[data-role="carsCount"]').html(stringFormat(i18nTranslate('MyCar_ThereAreCars'), data.length));
        }
      } else {
        this.wrapper.find('.no_car').show();
      }
    },
    showMounts(recommendCar) {
      if (recommendCar.length < 1) return;
      this.mount = $('#mount');
      const key = this.mount.data('key');
      this.mount.show().find('[data-role="mountUl"]').i18nHTML(recommendCar.map((item, i) => {
        if (i > 3) return;
        const isSamePrice = item.price.current == item.price.original;

        return stringFormat(
          TEMPLATE.MOUNT_ITEM, item.pic ? IMAGE_DOMAIN + item.pic : '',
          item.label && item.label.icon ? '<img class="flag" src="/resource/static/image/user/new_produces.png" alt="">' : '',
          item.specialId,
          item.name,
          (isSamePrice || item.price.original == 0) ? DISPLAY_NONE : '',
          item.price.current,
          item.expire,
          i,
          item.price.original,
          item.expire,
          remainTime = item.period ? ` data-time=${item.period.endInterval}` : DISPLAY_NONE,
          item.period ? this.formatTime(item.period.endInterval) : '',
        );
      }).join(''));
    },
    bindEvents(oParent) {
      oParent && oParent.unbind('click').click((evt) => {
        let target = $(evt.target),
          pId,
          previewID;
        if ((pId = target.data('buy')) !== undefined) {
          this.popPurchase(this.recommendData[I18N.language][pId]);
        } else if ((pId = target.data('renew')) !== undefined) {
          this.popPurchase(this.mycar[pId].info[I18N.language]);
        } else if ((pId = target.data('preview')) !== undefined) {
          if (this.mountResource) {
            (previewID = this.mountResource[pId]) && this.previewSWF(previewID.webResource, shopType_Num.MOUNT, pId, target.data('name'));
          }
          // Bussiness.getJSON('car/car_data.json',function(data){
          //    this.mountResource = data;
          //    (previewID = this.mountResource[pId]) && this.previewSWF(previewID.webResource,shopType_Num.MOUNT,pId,target.data('name'));
          // }.bind(this));
        } else if ((pId = target.data('change')) !== undefined) {
          if (isNaN(pId)) {
            Bussiness.postData('user_cannel_car.fly', {}, (res) => {
              console.log(res);
              if (res.code == 0) {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          } else {
            Bussiness.postData('user_update_car.fly', {
              carId: pId,
            }, (res) => {
              console.log(res);
              if (res.code == 0) {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          }
        }
      });
    },
    purchase(data) {
      this.purchasePromise = new Promise((() => {
        // this.requestProduct(id);
        this.purchasePromise.resolve();
      })).then(() => {
        this.popPurchase(data);
      });
    },
    popPurchase(data) {
      if (!user_util.user_info) {
        user_util.is_login(true);
      } else {
        console.log(data);
        if (data.stock && data.stock.total == data.stock.sold) { // all sold
          Popup.show({
            template: TEMPLATE.POP,
            caption: i18nTranslate('Store_TitleInfficient'),
            content: i18nTranslate('Store_TotalCountNotEnough'),
            buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
          });
          this.bindButton();
          return false;
        } else if (data.period && data.period.endInterval <= 0) { // out of date
          Popup.show({
            template: TEMPLATE.POP,
            caption: i18nTranslate('Store_TitleInfficient'),
            content: i18nTranslate('Store_OutOfDate'),
            buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
          });
          this.bindButton();
          return false;
        } else if (data.period && data.period.beginInterval > 0) { // not start yet
          Popup.show({
            template: TEMPLATE.POP,
            caption: i18nTranslate('Store_TitleInfficient'),
            content: `${i18nTranslate('Store_HasNotStarted')}<br/>${stringFormat(i18nTranslate('Store_StartTime'), DateTime.showtime(new Date(data.period.startTime)))}`,
            buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
          });
          this.bindButton();
          return false;
        }
        Popup.show({
          template: TEMPLATE.POP_ITEM,
        });
        this.bindButton(data);
        const singlePrice = data.price.current || 0;
        // var totalLeft = data.stock ? data.stock.total - data.stock.Sold : Number.POSITIVE_INFINITY;
        Popup.price.html(singlePrice); // set price
        data.trriger && Popup.container.find('.tips').html(stringFormat(i18nTranslate('Store_BuyForGift'), data.name, data.trriger.name)).show(); // set trigger tips
        if (singlePrice > this.getBanlance()) {
          Popup.container.find('.warn').html(i18nTranslate('Store_InsufficientFunds')).show();
          Popup.content.addClass('warn');
        }


        Popup.content.bind('input', (evt) => {
          const target = $(evt.target);
          if (target.data('role') == 'num') {
            let val = parseInt(target.val()),
              totalPrice = isNaN(val) ? 0 : val * singlePrice;
            target.attr('value', totalPrice / singlePrice);
            Popup.price.html(totalPrice);
            if (totalPrice > this.getBanlance()) { // check balance only
              Popup.container.find('.warn').html(i18nTranslate('Store_InsufficientFunds')).show();
            }
          }
        });

        Popup.content.click((evt) => {
          let target = $(evt.target),
            role = target.data('role');
          if (!role) return;
          let inputValue = parseInt(Popup.inputNum.val());
          switch (role) {
            case 'minus':
              inputValue > 1 ? inputValue-- : 1;
              Popup.inputNum.val(isNaN(inputValue) ? inputValue = 1 : inputValue);
              Popup.inputNum.attr('value', inputValue);
              Popup.price.html(inputValue * singlePrice);
              return;
            case 'plus':
              Popup.inputNum.val(isNaN(inputValue) ? inputValue = 1 : ++inputValue);
              Popup.inputNum.attr('value', inputValue);
              Popup.price.html(inputValue * singlePrice);
              return;
            case 'item_time':
              target.addClass('active').siblings().removeClass('active');
              var item_time = target.data('times');
              Popup.inputNum.val(item_time);
              Popup.price.html(item_time * singlePrice);
          }
        });
      }
    },
    getBanlance() {
      return user_util.user_info.returnBalance + user_util.user_info.balance;
    },
    bindButton(data) {
      Popup.button.click((evt) => {
        let target = $(evt.target),
          role = target.data('role');
        if (!role) return;
        switch (role) {
          case 'pop-ok':
            this.confirmPurchase(data.id, Popup.price.html());
            return;
          case 'confirm-ok':
            this.requestPurchase(data.id, data.name, Popup.inputNum.val(), data.shopTypeId);
            return;
          case 'close':
            Popup.close();
            return;
          case 'recharge':
            setTimeout(window.location.reload(), 1000);
            return;
          case 'back':
            Popup.back();
        }
      });
    },
    confirmPurchase(id, price) {
      if (price == 0) return;
      const tpl = `<p>${i18nTranslate('Store_ConfirmThePayments')}</p>`;
      Popup.rePaint({
        caption: i18nTranslate('Store_Notice'),
        content: stringFormat(tpl, price),
        buttons: `<a data-role="confirm-ok" class="ok">${i18nTranslate('Store_OK')}</a><a data-role="close" class="cancel">${i18nTranslate('Store_Cancel')}</a>`,
      });
    },
    requestPurchase(id, name, num) {
      Bussiness.postData('shop_buy.fly', {
        shopId: id,
        num,
      }, (data) => {
        console.log(data);
        switch (data.code) {
          case 0:
            var handler = function () {
              window.location.reload();
            };
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleSuccess'),
              content: `${stringFormat(i18nTranslate('Store_CongratulationGotGoods'), name)}.<br/>${i18nTranslate('Store_ValidUntil')}${DateTime.showtime(new Date(data.dataInfo.expire))}`,
              buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
              closeHandler: handler,
            });
            console.log('购买成功');
            return;
          case 35:
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleInfficient'),
              content: i18nTranslate('Store_BalanceNotEnough'),
              buttons: `<a href="/myrecharge.shtml" target="_blank" data-role="recharge" class="recharge" data-stat="Store_Pop_BtnRecharge">${i18nTranslate('Store_Charge')}</a><a data-role="close" class="cancel" data-stat="Store_Pop_BtnCancel">${i18nTranslate('Store_Cancel')}</a>`,
            });
            console.log('余额不足');
            return;
          case 2001:
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleInfficient'),
              content: i18nTranslate('Store_TotalCountNotEnough'),
              buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
            });
            console.log('库存不足');
            return;
          case 2002:
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleInfficient'),
              content: i18nTranslate('Store_NotExistOrOffShore'),
              buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
            });
            console.log('不存在或已下架');
            return;
          case 2003:
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleInfficient'),
              content: i18nTranslate('Store_HasNotStarted'),
              buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
            });
            console.log('未到购买时间');
            return;
          case 2004:
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleInfficient'),
              content: i18nTranslate('Store_OutOfDate'),
              buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
            });
            console.log('购买时间已过期');
            return;
          default:
            Popup.rePaint({
              caption: i18nTranslate('Store_TitleInfficient'),
              content: i18nTranslate('Store_FailToBuy'),
              buttons: `<a data-role="close" class="ok">${i18nTranslate('Store_OK')}</a>`,
            });
            console.log('购买失败');
            return;
        }
        this.purchasePromise.resolve();
      });
    },
    previewSWF(id, type, specialId, name) {
      if (!/(\.swf)$/.test(id)) return;

      if (this.instance) {
        $(this.instance).css({
          width: '1200px',
          height: '400px',
        });
        $('#mallMask').css({
          width: '100%',
          height: '100%',
        });
        if (type == shopType_Num.MOUNT) {
          this.instance.StartDrive(IMAGE_DOMAIN + id, flash_Num[specialId], name, true);
        } else {
          this.instance.StartMagic(IMAGE_DOMAIN + id, flash_Num[specialId], '', true);
        }
      } else {
        this.container.append($('<div id="mallMask" class="store_mask"><a class="preview_clz"></a></div>'));
        this.instance = Flash.render({
          container: this.container.find('#mallMask'),
          src: '/room/swf/magic.swf',
          id: 'mountSWF',
          width: '1200',
          height: '400',
          callback: function () {
            new Promise().wait(200).then(() => {
              if (type == shopType_Num.MOUNT) {
                this.instance.StartDrive(IMAGE_DOMAIN + id, flash_Num[specialId], name, true);
              } else {
                this.instance.StartMagic(IMAGE_DOMAIN + id, flash_Num[specialId], '', true);
              }
            }).resolve();
          }.bind(this),
        });

        $('#mallMask .preview_clz').click(() => {
          this.instance.EndMagic();
          $(this.instance).css({
            width: '0',
            height: '0',
          });
          $('#mallMask').css({
            width: '0',
            height: '0',
            overflow: 'hidden',
          });
        });
      }
    },
    formatTime(time) {
      let day = 24 * 60 * 60 * 1000,
        hour = 60 * 60 * 1000,
        minutes = 60 * 1000,
        timeFormat;
      if ((timeFormat = parseInt(time / day)) >= 1) {
        timeFormat += i18nTranslate('Store_Days');
      } else if ((timeFormat = parseInt(time / hour)) >= 1) {
        timeFormat += i18nTranslate('Store_Hours');
      } else if ((timeFormat = parseInt(time / minutes)) >= 1) {
        timeFormat += i18nTranslate('Store_Minutes');
      } else {
        timeFormat = time <= 0 ? 0 : parseInt(time / 1000) + i18nTranslate('Store_Seconds');
      }
      return timeFormat;
    },
    localize() {
      this.startPromisecar();
    },

    identifyFlow() {
      this.promise = new Promise(this.identify.bind(this)) // move method identity to utility
        .then(this.identified.bind(this));
    },

    identify() {
      this.identity = null;
      const user = Cookie.get(Cookie.key.user_info);
      if (user) {
        return this.identity = JSON.parse(user);
      }

      const userName = Cookie.get(Cookie.key.login_name);
      if (!userName) {
        return 'anonymous';
      }
      Bussiness.postData('user_init_user_info.fly', {
        loginName: userName,
      }, (data) => {
        if (data && data.code == 0) {
          this.promise.resolve(this.identity = data);
        } // todo: JSON.stringify(dta)
        else {
          this.promise.resolve();
        }
      }, () => {
        this.promise.resolve();
      });
    },

    identified() {
      I18N.init({
        onLocalize: this.localize.bind(this),
      });
      Header.identified(this.identity);
      if (this.identity) {
        this.startPromisecar();
      } else {
        // login_util.show_login_div();
      }
    },
  };


  I18N.init(null, true).localize(null, Page.run.bind(Page), true);
});
