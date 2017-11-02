  /*jshint multistr: true */
  showLoading(); // jshint ignore:line
  Zepto(function ($) { // jshint ignore:line
  	FastClick.attach(document.body);
  	/**
  	 *  开辟全局命名空间
  	 *  @type {Object}
  	 */
  	var infoPersonCompany = {
  		epCompanyName: '',
  		epCompanyId: '',
  		productTypeId: '',
  		epCompanyNo: '',
  		acceptOrderFrom: '',
  		acceptOrderTo: '',
  		snderDstrCode: '',
  		clickFlag: true,
  		rcvrDstrCode: '',
  		senderAddrID: '', // 寄件人id
  		reciptiensAddrID: '', // 收件人 id
  		productType: '', // 新增的产品类型数组
  		presetWeight: '', // 首重重量  默认是数组中的第一个
  		presetWeightPricePec: '', //首重价格 默认是数组中的第一个
  		extraWeightUnitPec: '', //续重单位  默认是数组中的第一个
  		extraWeightPricePec: '', //续重价格  默认是数组中的第一个
  		description: '', // 产品类型   默认是数组中的第一个
  		goodsMaxWeight: '', // 选择重量的最大值
  		goodsWeightTypes: [], // 选择重量的数组
  		discount: '', // 选择服务类型后的折扣率
  		productTypeCode: '', // 服务类型编码
  		logisMerchLog: '', // 物流机构的log url;
  		real_recName: '', // 收件人真实地址
  		real_sendName: '', // 寄件人 真实地址
  		snderAddress: '', // 寄件人详细地址；
  		filterCompanyId: '', // 过滤快递公司
  		enableButton: true, //  立即下单 点击 标志 判断
  		// 过滤掉备注重点中的表情包
  		// 超50 提示
  		informationLock: false,
  		scrollAble: false
  	};
  	var Page = {
  		run: function () {
  			this.load();
  			this.render();
  			this.compose();
  			this.bind();
  			this.start();
  		},
  		load: function () {
  			ant.setSessionData({
  				data: {
  					fromInformation: "0"
  				}
  			});
  			var getMethods = this.methods();


  		},
  		render: function () {

  		},
  		methods: function () {
  			return {
  				// 检查日期 重量 类型 是否填写完整   完整返回 真
  				checkInf: function () {
  					if ($("#timeDate").text() == "请选择") {
  						return false;
  					} else if ($("#goodstype").text() == "请选择") {
  						return false;
  					} else if ($(".goodsweightNum").val() == '') {
  						return false;
  					} else if (!$("#defaultCheckBox").hasClass("defaultSelect")) {
  						return false;
  					} else {
  						$(".single_btn").removeClass("disabled");
  						return true;
  					}
  				},
  				// 初始化 选择重量 下拉数据
  				initWeightData: function () {
  					goodsWeightTypes = [];
  					var maxNum = 100;
  					for (var m = 0; m < maxNum; m++) {
  						var goodsWeightTypesVal = (0.5 + m * 0.5);
  						if (m == 0) {
  							goodsWeightTypesVal = goodsWeightTypesVal + " 公斤及以下";
  						} else if (m == maxNum - 1) {
  							goodsWeightTypesVal = goodsWeightTypesVal + " 公斤及以上";
  						} else {
  							goodsWeightTypesVal = goodsWeightTypesVal + " 公斤";
  						}
  						goodsWeightTypes.push(goodsWeightTypesVal);
  					}
  				},
  				// 初始化 产品类型 下拉选择
  				initExpressType: function (productType) {
  					var arthtml = '';
  					productType.map(function (item, index) {
  						var tempDescription = item.description;
  						var otherClass = '';
  						if (tempDescription == "-" || tempDescription == "") {
  							// tempDescription = '';
  							otherClass = "displayNone";
  						}
  						arthtml += '<div  class=" am-list twoline" data-select="0" style="width:100%;padding:0;margin-bottom:.1rem">' +
  							'<div class="am-list-item expressType_border" style="background-size:0;border-radius:.05rem;padding-top:.15rem;min-height:0;padding-bottom:.135rem">' +
  							'<div class="am-list-thumb" data-select="1" style="width:.21rem;height:.21rem;background-size:contain;background-image: url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/noselect.png);background-repeat: no-repeat;">' +
  							// '<img data-select="1"  style="width:.21rem;height:.21rem" src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/noselect.png" alt="图片描述" />'+
  							'</div>' +
  							'<div class="am-list-content" style="margin-left:.05rem">' +
  							'<div class="am-list-title am-flexbox twocolumn" style="margin-bottom:0;line-height:1">' +
  							'<label class="am-flexbox-item" style="color:#000;font-size:.24rem;line-height:.24rem">' + item.productTypeName + '</label>' +
  							'<div class="am-list-right-brief" style="color:#f4333c;font-size:.14rem;line-height:.24rem;"><span>' + item.presetWeightPrice / 100 + '</span><span> 元起</span></div>' +
  							'</div>' +
  							'<div class="am-list-brief ' + otherClass + '"' + 'style="white-space:normal;font-size:.14rem;line-height:.2rem;margin-top:0.05rem;margin-bottom:-0.02rem;">' + tempDescription + '</div>' +
  							'</div>' +
  							'</div>' +
  							'</div>';
  					});
  					$(".iosselect-box").html(arthtml);
  				},
  				// 选择产品类型
  				initselectExpressType: function () {
  					var _this = this;
  					var myBtn = $(".alertInfo").find(".am-list-item").eq(2);
  					var temp = $("#expressId").html();
  					myBtn.click(function () {
  						if (!enableButton) {
  							return;
  						}
  						$(".myPop").show();
  						$("body").on('touchmove', function (event) {
  							event.preventDefault();
  						}, false);
  						if (clickFlag) {
  							clickFlag = false;
  							if (isAndroid) {
  								$(".iosselect-box").find(".am-list-item").css("border", '1px solid #ddd');
  							}
  							// $(".iosselect-box").find("img").eq(0).attr("src","https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/select.png");
  							$(".iosselect-box").find(".am-list-thumb").eq(0).css({
  								"background-image": "url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/select.png)"
  							});
  							$(".iosselect-box").find(".am-list").eq(0).attr("data-select", "1");
  							$(".iosselect-box").find(".am-list-item").eq(0).css("border-color", '#108ee9');
  							$(".iosselect-box").find(".am-list:last").css("margin-bottom", '0');
  						}
  					});
  					$(".iosselect-box").find(".am-list").map(function (item, index) {
  						//  $(this).attr("data-index",item);
  						$(this).on("click", function () {
  							var current = $(this);
  							if ($(this).attr("data-select") == "0") {
  								current = $(this);
  								$(".iosselect-box").find(".am-list").each(function () {
  									$(this).attr("data-select", "0");
  									// $(this).find("img").attr("src","https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/noselect.png")
  									$(this).find(".am-list-thumb").css({
  										"background-image": "url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/noselect.png)"
  									});
  									$(this).find(".am-list-item").css("border-color", '#ddd');
  								});
  								$(this).attr("data-select", "1");
  								$(this).find(".am-list-thumb").css({
  									"background-image": "url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/select.png)"
  								});
  								// $(this).find("img").attr("src","https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/select.png")
  								$(this).find(".am-list-item").eq(0).css("border-color", '#108ee9');
  							}
  							temp = current.find("label").html();
  							$("#expressId").html(temp);
  							var num = $(this).index();
  							productTypeId = productType[num].productTypeId; // 更换产品类型id
  							presetWeight = parseFloat(productType[num].presetWeight);
  							presetWeightPricePec = parseFloat(productType[num].presetWeightPrice); //首重价格
  							extraWeightUnitPec = parseFloat(productType[num].extraWeightUnit); //续重单位
  							extraWeightPricePec = parseFloat(productType[num].extraWeightPrice); //续重价格
  							description = productType[num].description; //  //预存描述
  							discount = parseFloat(productType[num].discount);
  							productTypeCode = productType[num].productTypeCode; // 服务类型的编码
  							// 选择完服务类型后，初始化 首重 和 重量选择数组
  							_this.initWeightData();
  							$(".priceNum").html("首重" + presetWeightPricePec / 100 + "元，续重" + extraWeightPricePec / 100 + "元");
  							var reg = /^[0-9\.]+/g;
  							var oldWeight = reg.exec($("#goodsweight").html());
  							var phaseWeight = parseFloat(oldWeight) - (presetWeight / 1000);
  							var weightId;
  							if (phaseWeight <= 0) {
  								weightId = 0;
  							} else {
  								weightId = Math.ceil(phaseWeight / (extraWeightUnitPec / 1000));
  							}
  							$("#goodsweight").html(goodsWeightTypes[weightId]);
  							//  alert(presetWeight/1000);
  							$(".goodsweightNum").val(presetWeight / 1000 + weightId * (extraWeightUnitPec / 1000));
  							// 初始化 联动控件
  							$(".alertInfo").find(".am-list-item").eq(3).attr('data-weight_id', weightId.toString());
  							$(".alertInfo").find(".am-list-item").eq(3).attr('data-weight_value', goodsWeightTypes[weightId]);
  							var totalPrice = presetWeightPricePec + Math.ceil((oldWeight * 1000 - presetWeight) / extraWeightUnitPec) * extraWeightPricePec;
  							totalPrice = totalPrice / 100;
  							$(".estimatePrice-data").html(totalPrice.toFixed(2));
  							setTimeout(function () {
  								$(".myPop").hide();
  								$("body").off("touchmove");
  							}, 200);
  						});
  					});
  					$(".myPop").find(".close").click(function () {
  						$(".myPop").hide();
  						$("body").off("touchmove");
  					});
  					$(".myPop").find(".sure").click(function () {
  						$(".myPop").hide();
  						$("body").off("touchmove");
  						$("#expressId").html(temp);
  					});
  				},
  				// 选择日期 函数
  				initselectDateEvent: function (data2) {
  					console.log(data2);
  					var timeInternal = data2;
  					var outChecked = 0,
  						outNewTime = '',
  						outNewDate = '';
  					for (var value in timeInternal) {
  						if (Array.isArray(timeInternal[value]) && timeInternal[value].some(function (item, dex) {
  								return item.hasOwnProperty('isChecked') && item['isChecked'] == "1";
  							})) {
  							outNewDate = value;
  						}
  					}
  					// outNewDate = timeInternal.serviceDay;
  					timeInternal[outNewDate].some(function (item, dex) {
  						outNewTime = item.time;
  						return item.hasOwnProperty('isChecked') && item['isChecked'] == "1";
  					});
  					// outNewTime = timeInternal.serviceTime;
  					// console.log(outNewDate);
  					// console.log(outNewTime);
  					if (outNewDate != "TDY") {
  						$("#timeDate").css("color", "#f4333c");
  					} else {
  						$("#timeData").css("color", "#888");
  					}
  					var spanHtml = "<span style='padding-left:.05rem;'></span>";
  					$("#timeDate").html(JSON.parse(JSON.stringify((outNewDate == "TDY" ? '今天' : outNewDate == "TOM" ? '明天' : "后天") + spanHtml + outNewTime)));
  					$(".day1").val(JSON.parse(JSON.stringify(outNewDate == "TDY" ? '今天' : outNewDate == "TOM" ? '明天' : "后天")));
  					$(".time1").val(JSON.parse(JSON.stringify(outNewTime)));

  					var dateDom = document.querySelector('#dateId');
  					var timeDom = document.querySelector('#timeId');
  					var myBtn = $(".alertInfo").find("#selectTime");
  					var _this = this;
  					myBtn.unbind().click(function () {
  						if (!enableButton) {
  							return;
  						}
  						$(".newDate").show();
  						$("body").on('touchmove', function (event) {
  							event.preventDefault();
  						}, false);
  						//初始化 默认选择的日期
  						_this.initDateTimes();
  						var checked = 0;
  						$(".dataItem").each(function (index) {
  							var newDate = index === 0 ? "TDY" : index === 1 ? "TOM" : "AFT";
  							if (timeInternal[newDate].every(function (item, index) {
  									return item.status != "1";
  								})) {
  								$(this).addClass('clickDisabled');
  								$(this).find('img').hide();
  								$(this).find('span').html($(this).find('span').html().replace('约满', '') + '约满');
  							} else {
  								$(this).removeClass('clickDisabled');
  								$(this).find('img').hide();
  								// $(this).find('img.imgNoSelect').show();
  								$(this).find('span').html($(this).find('span').html().replace('约满', ''));
  							}
  							// if(timeInternal[newDate].some(function(item, dex){return item.hasOwnProperty('isChecked')&&item['isChecked'] === "1";})){
  							//      checked = index
  							// }
  						});
  						// 设置选中状态
  						var internalNewDate = $(".day1").val() == '今天' ? 'TDY' : $(".day1").val() == '明天' ? 'TOM' : 'AFT';
  						var internalNewTime = $(".time1").val();
  						var $checked = $(".dataItem").eq(checked);
  						var internalNewDateId = internalNewDate === "TDY" ? 0 : internalNewDate === "TOM" ? 1 : 2;
  						var tempButton = '';
  						$('.dataItem').css('borderColor', '#ddd');
  						$(".dataItem").eq(internalNewDateId).find('img.imgSelect').show();
  						$(".dataItem").eq(internalNewDateId).css('borderColor', '#108ee9');
  						// $(".dataItem").eq(internalNewDateId).find('img.imgNoSelect').hide();
  						timeInternal[internalNewDate].forEach(function (item, index) {
  							var form = format('<button style="float:left;padding:0;font-size:.14rem;margin-bottom:12px;width:1.08rem;height:.42rem;line-height:1" class="am-button \
                                       {0}"\
                                       {1}>\
                                       <span>{3}</span>\
                                       <p {4}\
                                       >{2}</p>\
                                       </button>',
  								internalNewTime === item.time ? '' : 'white',
  								item.status == "1" ? '' : 'disabled',
  								item.time,
  								item.status == "2" ? '约满' : '',
  								item.status == "2" ? 'style="padding-top:.03rem;"' : ''
  							);
  							tempButton = tempButton + form;
  						});
  						$('.times').html(tempButton);
  						$('.times button').unbind().click(function (event) {
  							outNewTime = $(this).find('p').html();
  							$('.times button').addClass('white');
  							$(this).removeClass('white');
  						});
  						// 初始化今天 明天 后天的日期
  					});
  					//  初始化 预约上面的 弹窗
  					$(".dataItem").unbind().click(function () {
  						if ($(this).hasClass('clickDisabled')) {
  							return;
  						}
  						$(".dataItem").find('img.imgSelect').hide();
  						$('.dataItem').css('borderColor', '#ddd');
  						// $(".dataItem").find('img.imgNoSelect').not($(this)).show();

  						// $(this).find("img.imgNoSelect").hide();
  						$(this).find("img.imgSelect").show();
  						$(this).css('borderColor', '#108ee9');
  						var tempCheckDate = $(this).index() === 0 ? "TDY" : $(this).index() === 1 ? "TOM" : "AFT";
  						outNewDate = tempCheckDate;
  						var tempButtonInternal = '';
  						timeInternal[tempCheckDate].forEach(function (item, index) {
  							var form = format('<button style="float:left;padding:0;font-size:.14rem;margin-bottom:12px;width:1.08rem;height:.42rem;line-height:1" class="am-button \
                   {0}"\
                   {1}>\
                   <span>{3}</span>\
                   <p {4}\
                   >{2}</p>\
                   </button>',
  								item.hasOwnProperty('isChecked') && item['isChecked'] === "1" ? 'white' : 'white',
  								item.status === "1" ? '' : 'disabled',
  								item.time,
  								item.status === "2" ? '约满' : '',
  								item.status === "2" ? 'style="padding-top:.03rem;"' : ''
  							);
  							tempButtonInternal += form;
  						});

  						$('.times').html(tempButtonInternal);

  						if (timeInternal[tempCheckDate].some(function (item, index) {
  								if (item.status === "1") {
  									$('.times button').eq(index).removeClass('white');
  									outNewTime = item.time;
  								}
  								return item.status === "1";
  							})) {
  							console.log();
  						} else {
  							outNewTime = '';
  						}
  						$('.times button').unbind().click(function (event) {
  							outNewTime = $(this).find('p').html();
  							$('.times button').addClass('white');
  							$(this).removeClass('white');
  						});
  					});
  					$(".newDate").find(".close").unbind().click(function () {
  						$(".newDate").hide();
  						$("body").off("touchmove");
  					});
  					$(".newDate").find(".sure").unbind().click(function () {
  						if (outNewTime !== '') {
  							$(".time1").val(JSON.parse(JSON.stringify(outNewTime)));
  							$(".day1").val(JSON.parse(JSON.stringify(outNewDate == "TDY" ? '今天' : outNewDate == "TOM" ? '明天' : "后天")));

  							$("#timeDate").html(JSON.parse(JSON.stringify((outNewDate == "TDY" ? '今天' : outNewDate == "TOM" ? '明天' : "后天") + spanHtml + outNewTime)));
  							// alert(outNewDate != "TDY")
  							if (outNewDate != "TDY") {
  								$("#timeDate").css("color", "#f4333c");
  							} else {
  								$("#timeDate").css("color", "#888");
  							}
  						}
  						$(".newDate").hide();
  						$("body").off("touchmove");
  						// $("#expressId").html(temp);
  					});
  				},

  				initDateTimes: function () {
  					ready(function () {
  						AlipayJSBridge.call('getServerTime', function (data) {
  							// var tempDate = new Date(data.time)
  							$('.dataItem p').each(function (index) {
  								$(this).html(getFullDate(data.time, index));
  							});
  						});
  					});

  					function getFullDate(time, count) {
  						var tempDate = new Date(time);
  						tempDate.setDate(tempDate.getDate() + count); //获取AddDayCount天后的日期
  						var y = tempDate.getFullYear();
  						var m = tempDate.getMonth() + 1; //获取当前月份的日期
  						var d = tempDate.getDate();
  						return y + "-" + m + "-" + d;
  					}

  					function ready(callback) {
  						// 如果jsbridge已经注入则直接调用
  						if (window.AlipayJSBridge) {
  							/* jshint expr: true */
  							callback && callback();
  						} else {
  							// 如果没有注入则监听注入的事件
  							document.addEventListener('AlipayJSBridgeReady', callback, false);
  						}
  					}
  				},
  				// 选择物品类型 函数
  				initSelectTypeEvent: function (goodsTypes) {
  					var typeDom = document.querySelector("#typeId");
  					var typeBtn = $(".alertInfo").find(".am-list-item").eq(1);
  					typeBtn.click(function () {
  						if (!enableButton) {
  							return;
  						}
  						//  $("body").on('touchmove', function (event) {
  						//         event.preventDefault();
  						// }, false);
  						var typeId = typeBtn.attr("data-type_id");
  						var typeName = typeBtn.attr("data-type_value");
  						var typeLevel = 1;
  						var typeArr = [];
  						for (var i = 0; i < goodsTypes.length; i++) {
  							typeArr.push({
  								"id": i.toString(),
  								"value": goodsTypes[i]
  							});
  						}
  						var option2 = {
  							title: "",
  							itemHeight: 35,
  							headerHeight: 42,
  							cssUtil: "px",
  							oneLevelId: typeId,
  							callback: function (selectOneObj) {
  								typeDom.value = selectOneObj.id;
  								typeBtn.attr('data-type_id', selectOneObj.id);
  								typeBtn.attr('data-type_value', selectOneObj.value);
  								$("#goodstype").text(JSON.parse(JSON.stringify(selectOneObj.value)));
  								ant.setSessionData({
  									data: {
  										goodstypeValue: JSON.parse(JSON.stringify(selectOneObj.value))
  									}
  								});
  								checkInf();
  							}
  						};
  						var oneSelect = new IosSelect(typeLevel, [typeArr], option2);
  					});
  				},
  				// 选择物品重量 函数
  				initSelectWeightEvent: function () {
  					//选择物品重量
  					var weightDom = document.querySelector("#weightId");
  					var weightBtn = $(".alertInfo").find(".am-list-item").eq(3);
  					weightBtn.click(function () {
  						if (!enableButton) {
  							return;
  						}
  						var weightId = weightBtn.attr("data-weight_id");
  						var weightName = weightBtn.attr("data-weight_value");
  						//   $("body").on('touchmove', function (event) {
  						//          event.preventDefault();
  						//  }, false);
  						var weightLevel = 1;
  						var weightArr = [];
  						for (var i = 0; i < goodsWeightTypes.length; i++) {
  							weightArr.push({
  								"id": i.toString(),
  								"value": goodsWeightTypes[i]
  							});
  						}
  						var option2 = {
  							title: "",
  							itemHeight: 35,
  							headerHeight: 42,
  							cssUtil: "px",
  							oneLevelId: weightId,
  							callback: function (selectOneObj) {
  								weightDom.value = selectOneObj.id;
  								weightBtn.attr('data-weight_id', selectOneObj.id);
  								weightBtn.attr('data-weight_value', selectOneObj.value);
  								// $("#goodstype").text(JSON.parse(JSON.stringify(selectOneObj.value)));
  								if (selectOneObj.id == '') {
  									var reg = /^[0-9\.]+/g;
  									var addServicesOne = reg.exec(goodsWeightTypes[0]) * 1000;
  									var totalPrice = presetWeightPricePec + Math.ceil((addServicesOne - presetWeight) / extraWeightUnitPec) * extraWeightPricePec;
  									totalPrice = totalPrice / 1000;
  									$(".estimatePrice-data").html(totalPrice.toFixed(2));
  								} else {
  									$("#goodsweight").text(JSON.parse(JSON.stringify(selectOneObj.value)));
  									var reg = /^[0-9\.]+/g;
  									var weight = reg.exec(selectOneObj.value);
  									var totalPrice = presetWeightPricePec + Math.ceil((weight * 1000 - presetWeight) / extraWeightUnitPec) * extraWeightPricePec;
  									totalPrice = totalPrice / 100;
  									$(".goodsweightNum").val(weight);
  									$(".estimatePrice-data").html(totalPrice.toFixed(2));
  									ant.setSessionData({
  										data: {
  											goodsOneValue: JSON.parse(JSON.stringify(selectOneObj.value)),
  											goodsOneIndex: JSON.parse(JSON.stringify(selectOneObj.value))
  										}
  									});
  								}
  								checkInf();
  							}
  						};
  						var weightSelect = new IosSelect(weightLevel, [weightArr], option2);
  					});
  				},
  				// 提交订单信息
  				addressOrder: function () {
  					var addServiceArr = [],
  						classArr = $(".extra_service div");
  					console.log("vclassArr.length: " + classArr.length);
  					if (classArr && classArr.length != 0) {
  						for (var i = 0; i < classArr.length; i++) {
  							if ($(classArr[i]).hasClass("express_active")) {
  								addServiceArr.push($(classArr[i]).text());
  							}
  						}
  						addServiceArr = addServiceArr.join(",");
  					} else {
  						addServiceArr = "1";
  					}
  					var remarkStr = emojione.toShort($("#text-content").val()).replace(/\:[a-z0-9_]+\:/g, '');
  					if (remarkStr == '其他要求请在此备注(选填)') {
  						remarkStr = "";
  					}
  					ant.setSessionData({
  						data: {
  							addServiceArr: addServiceArr,
  							remarkContent: remarkStr
  						}
  					});
  					if (checkInf()) {
  						console.log("productTypeCode" + productTypeCode);
  						var info = {
  							"logisMerchLog": logisMerchLog,
  							"senderAddrID": JSON.parse(senderAddrID) == -1 ? 0 : JSON.parse(senderAddrID),
  							"reciptiensAddrID": JSON.parse(reciptiensAddrID) == -1 ? 0 : JSON.parse(reciptiensAddrID),
  							"productTypeCode": productTypeCode,
  							"discount": JSON.parse(discount),
  							"logisMerchId": JSON.parse(epCompanyId),
  							"productId": JSON.parse(productTypeId),
  							"snderName": real_sendName,
  							"snderMobile": $(".data-senderNumber").attr("real-sendnumber"),
  							"snderPrvnCode": $(".data-senderName").attr("data-provinceNo"),
  							"snderCityCode": $(".data-senderName").attr("data-cityNo"),
  							"snderDstrCode": $(".data-senderName").attr("data-areaNo"),
  							"snderStreet": "",
  							"snderAddress": $(".data-detailaddress").text(),
  							"rcvrName": real_recName,
  							"rcvrMobile": $(".data-recipientsNumber").attr("real-recNumber"),
  							"rcvrPrvnCode": $(".data-recipientsName").attr("data-recprovinceNo"),
  							"rcvrCityCode": $(".data-recipientsName").attr("data-reccityNo"),
  							"rcvrDstrCode": $(".data-recipientsName").attr("data-recareaNo"),
  							"rcvrStreet": "",
  							"rcvrAddress": $(".data-redetailaddress").text(),
  							"bookedDay": ($(".day1").val() == "今天" ? "TDY" : ($(".day1").val() == "明天" ? "TOM" : "AFT")),
  							"bookedTime": $(".time1").val(),
  							"goodsType": $("#goodstype").text(),
  							"goodsWeight": $(".goodsweightNum").val() * 1000,
  							"remark": remarkStr,
  							"addService": addServiceArr,
  							"estimatePrice": JSON.parse($(".estimatePrice-data").text()) * 100
  						};
  						var xhrurl = jUrl + '/ep/order/save';
  						// 在没网的情况下 除去加载状态
  						if (!isNetworkAvailable) {
  							enableButton = true;
  							$(".single_btn").removeClass("loading");
  							$(".single_btn").html("立即下单");
  						}
  						new Promise(function (resolve, reject) {
  							$.axs(xhrurl, info, function (data) {
  								resolve(data)
  							}, function (data) {
  								reject(data)
  							});
  						}).then(function (data) { // jshint ignore:line
  							$(".single_btn").removeClass("loading");
  							$(".single_btn").html("立即下单");
  							if (data.meta.code == "0000") {
  								var data = data.result.orderNo;
  								var orderNo;
  								//  var data = data.result;
  								if (data && data != '') {
  									orderNo = data;
  								}
  								//下单成功，清空seesion
  								//clearSeesion();
  								pushWindow("scuess-order-placeOrder.html?orderNo=" + orderNo + "", false);
  							} else {
  								ant.pushWindow({
  									url: "single-failure-placeOrder.html?epCompanyName=" + infoPersonCompany.epCompanyName
  								});
  							}
  						}, function (data) {
  							enableButton = true;
  							$(".single_btn").removeClass("loading");
  							$(".single_btn").html("立即下单");
  							// 存在已取件 并未支付的订单
  							if (data.meta.code == "1820") {
  								enableButton = true;
  								$(".single_btn").removeClass("loading");
  								$(".single_btn").html("立即下单");
  								setTimeout(function () {
  									notPaidOrder(data.result.notPaidOrderNo, data.result.notPaidRemindCnt);
  								}, 10);
  							} else if (data.meta.code == '1810') {
  								toast({
  									text: "预约取件时间无效",
  									type: 'exception'
  								});
  								//保存订单失败，提示重试 toast
  							} else if (data.meta.code == '1812') {
  								enableButton = true;
  								$(".single_btn").removeClass("disabled");
  								BizLog.call('info', {
  									spmId: "a106.b2109.c4855",
  									actionId: 'exposure',
  									params: {
  										CompName: infoPersonCompany.epCompanyName
  									}
  								});

  								$(".dialog-num").show();
  								//保存订单失败，提示重试 toast
  							} else if (data.meta.code == '1813') {
  								toast({
  									text: "快递公司下单失败",
  									type: 'exception'
  								});
  							} else if (data.meta.code == '1817') {
  								var tempData2 = data.result.times;
  								InitSelect.initselectDateEvent(tempData2);
  								toast({
  									text: "请重新确认上门时间",
  								});
  							} else {
  								toast({
  									text: "创建订单失败，请重试",
  									type: 'exception'
  								});
  							}
  						})
  					}
  				},
  				// 头部两行的地址信息初始化
  				initTopAddressInform: function (templateData) {
  					var sendHtml = template("sendTemplate", templateData);
  					document.getElementById("sendId").innerHTML = sendHtml;
  					var recHtml = template("recpAddressTemplate", templateData);
  					document.getElementById("recAddressId").innerHTML = recHtml;
  					var tempSendName = templateData.sendName;
  					var temprecName = templateData.recName;
  					$(".data-senderName").html(tempSendName);
  					$(".data-recipientsName").html(temprecName);
  				},
  				//寄件信息显示
  				orderInfoShow: function (epCompanyNo, epCompanyId, snderDstrCode, rcvrDstrCode, acceptOrderFrom, acceptOrderTo, dayValue, timeValue, timeDate, goodstypeValue, goodsOneValue, goodsOneIndex, addServiceArrs, remarkContent) {
  					//加载旧数据?
  					if (remarkContent) {
  						$("#text-content").val(remarkContent);
  						$("#text-content").css('color', '#000');
  					} else {
  						$("#text-content").val("其他要求请在此备注(选填)");
  						$("#text-content").css('color', '#ccc');
  					}
  					$(".day1").val(dayValue);
  					$(".time1").val(timeValue);
  					$("#goodsweight").text(goodsOneValue);
  					checkInf();
  					var info = {
  						"snderAddress": snderAddress,
  						"logisMerchCode": epCompanyNo,
  						"acceptOrderFrom": acceptOrderFrom,
  						"acceptOrderTo": acceptOrderTo,
  						"logisMerchId": parseInt(epCompanyId),
  						"snderDstrCode": snderDstrCode,
  						"rcvrDstrCode": rcvrDstrCode
  					};
  					//初始化控件
  					var xhrurl = jUrl + '/ep/order/index';
  					$.axs(xhrurl, info, function (data) {
  						if (data.meta.success) {
  							var result = data.result,
  								mHtml = '',
  								timeNum;
  							if (result.pricingMode == "2") {
  								$(".systemPay").html('实际费用以<span style="color:#f4333c;">快递员当面确认为准</span>，在订单详情页即可完成在线支付，<span style="color:#f4333c;">不支持现金及扫码支付</span>');
  							} else {
  								$(".systemPay").html('实际费用以<span style="color:#f4333c;">快递员当面确认为准</span>，快递员录入信息后，支付宝会在订单详情生成账单提示支付，<span style="color:#f4333c;">不支持现金及扫码支付</span>');
  							}
  							if (result && result != '') {
  								var servicingText = result.servicingText,
  									goodsTypes = result.goodsTypes,
  									data2 = result.times,
  									addServices = result.addServices;
  								//为全局变量赋值
  								goodsMaxWeight = JSON.parse(result.goodsMaxWeight); //最大值
  								productType = result.productTypes;
  								productTypeId = result.productTypes[0].productTypeId;
  								presetWeight = parseFloat(result.productTypes[0].presetWeight);
  								presetWeightPricePec = parseFloat(result.productTypes[0].presetWeightPrice); //首重价格
  								extraWeightUnitPec = parseFloat(result.productTypes[0].extraWeightUnit); //续重单位
  								extraWeightPricePec = parseFloat(result.productTypes[0].extraWeightPrice); //续重价格
  								description = result.productTypes[0].description; // 产品类型描述
  								discount = result.productTypes[0].discount; // 产品类型对应的折扣率
  								productTypeCode = result.productTypes[0].productTypeCode; // 服务类型的编码

  								InitSelect.initExpressType(productType); // 初始化选择产品类型

  								// 产品类型 默认选中第一个
  								$("#expressId").html(productType[0].productTypeName);
  								// 默认 的首重 续重
  								$(".priceNum").html("首重" + presetWeightPricePec / 100 + "元，续重" + extraWeightPricePec / 100 + "元");
  								$(".goodsweightNum").val(presetWeight / 1000);
  								if (goodsOneValue && goodsOneValue != '') {
  									// 初始化 预计快递费
  									var reg = /^[0-9\.]+/g;
  									var goodsWeights = reg.exec(goodsOneValue);
  									var goodsweightNum = goodsWeights * 1000;
  									var totalPrice = presetWeightPricePec + Math.ceil((goodsweightNum - presetWeight) / extraWeightUnitPec) * extraWeightPricePec;
  									totalPrice = totalPrice / 100;
  									$(".estimatePrice-data").html(totalPrice.toFixed(2));
  								}
  								InitSelect.initWeightData();
  								if (!goodsWeights) { // jshint ignore:line

  									$("#goodstype").text(goodsTypes[0]);
  									$("#goodsweight").html(goodsWeightTypes[0]);
  									$(".estimatePrice-data").html((presetWeightPricePec / 100).toFixed(2));
  								}
  								if (addServices && addServices != '') {
  									$(".extra_service_show").show();
  									$(".extra_service_txt").show();
  									$(".extra_service").css("padding-bottom", "0.05rem");
  									// $(".kd-height-show").show();
  									// $(".kd-info").css({"border-top":"1px solid #ddd;"});
  									$(".kd-info-text").css({
  										"background-color": "#f5f5f9"
  									});
  								} else {
  									$(".extra_service_show").hide();
  									$(".extra_service_txt").hide();
  									$(".extra_service").css("padding-bottom", "0");

  									// $(".kd-height-show").hide();
  									//  $(".kd-info").removeClass("borderTopddd");
  									// $(".kd-info").css({"border-top":"0px solid #ddd;"});
  									$(".kd-info-text").css({
  										"background-color": "#f5f5f9",
  										"border-bottom": "0"
  									});
  								}
  								// 绑定选择日期    事件
  								InitSelect.initselectDateEvent(data2);
  								// 绑定选择物品类型  事件
  								InitSelect.initSelectTypeEvent(goodsTypes);
  								//  绑定选择物品重量  事件
  								InitSelect.initSelectWeightEvent(goodsWeightTypes, presetWeightPricePec, presetWeight, extraWeightUnitPec, extraWeightPricePec);
  								// 绑定选择产品类型的 事件
  								InitSelect.initselectExpressType();

  								$(".timeText").text(servicingText);
  								$.each(addServices, function (i) {
  									var classChange;
  									for (var j = 0; j < addServiceArrs.length; j++) {
  										if (addServiceArrs[j] == addServices[i]) {
  											classChange = "express_active";
  										} else {
  											classChange = "";
  										}
  									}
  									if (i == 0) {
  										mHtml += '<div class="' + classChange + '" data-spmv="a106.b2109.c4629.d7167" style="min-width:0rem;text-align:center;width: 1.46rem;margin: 0.15rem 0rem 0.1rem 0.25rem;border: 1px #108ee9 dotted;padding: 0.02rem 0.02rem;line-height: .24rem;margin-top:0rem;">' + addServices[i] + '</div>';
  									} else {
  										mHtml += '<div class="' + classChange + '" data-spmv="a106.b2109.c4629.d7167" style="min-width:0rem;text-align:center;width: 1.46rem;margin: 0.15rem 0rem 0.1rem 0.25rem;border: 1px #108ee9 dotted;padding: 0.02rem 0.02rem;line-height: .24rem;margin-top:0rem;">' + addServices[i] + '</div>';
  									}
  								});

  								$(".extra_service").html(mHtml);
  								//点击切换样式
  								$(".extra_service div").click(function () {
  									BizLog.call('info', {
  										spmId: "a106.b2109.c4629.d7167",
  										actionId: 'clicked',
  										params: {
  											CompName: infoPersonCompany.epCompanyName
  										}
  									});
  									$(this).toggleClass('express_active');
  								});
  							}
  							hideLoading();
  						}
  					}, function (d) {
  						if (d.meta.code == "3214") {
  							BizLog.call('info', {
  								spmId: "a106.b2109.c5643",
  								actionId: 'exposure',
  							});
  							hideLoading();
  							$('.show_mask').show();
  							// alert(Object.prototype.toString.call(temp) === "[object Array]");
  							var filterTemp = filterCompanyId;
  							if (!(Object.prototype.toString.call(filterTemp) === "[object Array]")) { // jshint ignore:line
  								if (filterTemp.length == 2) {
  									filterTemp = [];
  								} else {
  									filterTemp = filterCompanyId.slice(1, filterCompanyId.length - 1).split(",");
  								}
  							}
  							filterTemp.push(epCompanyNo);
  							setTimeout(function () {
  								ant.setSessionData({
  									data: {
  										filterCompanyId: filterTemp
  									}
  								});
  								alert("温馨提示\n抱歉，" + infoPersonCompany.epCompanyName + "暂时无法服务\n换一家试试吧");
  								BizLog.call('info', {
  									spmId: "a106.b2109.c5643.d8921",
  									actionId: 'clicked',
  								});
  								$('.show_mask').hide();
  								ant.popWindow();
  							}, 100);
  						} else {
  							toast({
  								text: d.meta.msg,
  								type: 'exception'
  							});
  						}
  					});
  				},
  				initPage: function () {
  					ant.getSessionData({
  						keys: ['filterCompanyId', 'epCompanyId', 'sendAreaCode', 'recAreaCode', 'epCompanyName', 'cityCode', 'productTypeId',
              'presetWeight', 'presetWeightPrice', 'extraWeightUnit', 'extraWeightPrice', 'epCompanyId',
              'reciptiensAddrID', 'recName', 'recNumber',
              'recProvinceCode', 'recCityCode',
              'recAreaCode', 'recStreet', 'recAddress',
              'senderAddrID', 'sendName', 'sendNumber', 'real_sendNumber', 'real_recNumber',
              'sendProvinceCode', 'sendCityCode', 'real_sendName', 'real_recName', 'sendAreaCode', 'sendStreet', 'sendAddress',
              'dayValue', 'timeValue', 'timeDate', 'goodstypeValue', 'goodsOneValue', 'goodsOneIndex', 'addServiceArrs', 'remarkContent',
              'epCompanyNo', 'acceptOrderFrom', 'acceptOrderTo', 'merchantName', 'imgsrc'
            ]
  					}, function (result) {
  						filterCompanyId = result.data.filterCompanyId;
  						snderAddress = result.data.sendAddress;
  						real_sendName = result.data.real_sendName;
  						real_recName = result.data.real_recName;
  						snderDstrCode = result.data.sendAreaCode;
  						rcvrDstrCode = result.data.recAreaCode;
  						epCompanyId = result.data.epCompanyId;
  						infoPersonCompany.epCompanyName = result.data.epCompanyName;
  						productTypeId = result.data.productTypeId;
  						epCompanyNo = result.data.epCompanyNo;
  						acceptOrderFrom = result.data.acceptOrderFrom;
  						acceptOrderTo = result.data.acceptOrderTo;
  						senderAddrID = result.data.senderAddrID;
  						reciptiensAddrID = result.data.reciptiensAddrID;
  						logisMerchLog = result.data.imgsrc;
  						var cityCode = result.data.cityCode;
  						//  presetWeight = parseFloat(result.data.presetWeight);
  						//  presetWeightPricePec = parseFloat(result.data.presetWeightPrice); //首重价格
  						//  extraWeightUnitPec = parseFloat(result.data.extraWeightUnit); //续重单位
  						//  extraWeightPricePec = parseFloat(result.data.extraWeightPrice); //续重价格
  						ant.call('setTitle', {
  							title: infoPersonCompany.epCompanyName
  						});
  						// 初始化头部地址两行的地址信息
  						var templateData = result.data;
  						initTopAddressInform(templateData);
  						//初始化剩余页面
  						var dayValue = result.data.dayValue || '';
  						var timeValue = result.data.timeValue || '';
  						var timeDate = result.data.timeDate || '';
  						var goodstypeValue = result.data.goodstypeValue || '';
  						var goodsOneValue = result.data.goodsOneValue || '';
  						var goodsOneIndex = result.data.goodsOneIndex || '0';
  						var addServiceArrs = result.data.addServiceArrs || '';
  						var remarkContent = result.data.remarkContent || '';
  						orderInfoShow(epCompanyNo, epCompanyId, snderDstrCode, rcvrDstrCode, acceptOrderFrom, acceptOrderTo, dayValue, timeValue, timeDate, goodstypeValue, goodsOneValue, goodsOneIndex, addServiceArrs, remarkContent);

  						//备注信息
  						$("#text-content").focus(function () {
  							BizLog.call('info', {
  								spmId: "a106.b2109.c4629.d7168",
  								actionId: 'clicked',
  								params: {
  									CompName: infoPersonCompany.epCompanyName
  								}
  							});
  							setTimeout(function () {
  								scrollAble = true;
  								console.log("#text6666 " + scrollAble);
  							}, 600);

  							this.style.color = '#000';
  							if (this.value == '其他要求请在此备注(选填)') {
  								this.value = '';
  							}
  						});
  						$("#text-content").blur(function () {
  							if (this.value == '') {
  								this.value = '其他要求请在此备注(选填)';
  								this.style.color = '#ccc';
  							}
  						});

  					});
  				}
  			}
  		},
  		bind: function () {
  			ant.on('resume', function (event) {
  				orderFlag = true;
  				enableButton = true;
  				$(".single_btn").removeClass("loading");
  				$(".single_btn").html("立即下单");

  				$(".single_btn").click(function () {
  					if ($(".single_btn").hasClass("disabled")) {
  						return;
  					}
  					ant.getSessionData({
  						keys: ['fromInformation']
  					}, function (result) {
  						if (orderFlag && result.data.fromInformation == "1") {
  							// $(".again_order").show();
  							$(".once_order").html("");
  							$(".once_order_html").html('<div class="am-dialog-wrap" role="document" style="margin-top:0.25rem;padding:.13rem 0 .15rem;"><div class="am-dialog-img"><img src="https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/cancelWarning.png" alt="图片描述"></div><div class="am-dialog-body" style="padding:0.02rem 0.2rem 0;margin:0 auto;"><p class="am-dialog-brief" style="font-size:0.15rem;color:black">你刚才已经下单成功<br/>确定再下一单吗？</p></div><div class="am-dialog-footer" style="padding-top:0.15rem;"><a class="am-dialog-button continue_order" role="button" style="border:1px solid #108ee9;border-radius:5px;margin-right:0.05rem;color:#108ee9;height:.41rem;line-height:1">仍然下单</a><a class="am-dialog-button Ierror" role="button" style="background:#108ee9;color:#fff;border-radius:5px;margin-left:0.05rem;height:.41rem;line-height:1">我点错了</a></div></div>');
  						}
  					});
  				});
  			});
  			$(".dialog-close-num").click(function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4855.d7604",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  				$(".dialog-num").hide();
  				enableButton = true;
  				$(".single_btn").removeClass("loading");
  				$(".single_btn").html("立即下单");
  			});
  			$("#btn-kefu").click(function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4855.d7605",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  			});
  			$("#btn-sumbit").click(function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4855.d7606",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  				$(".dialog-num").hide();
  				enableButton = true;
  				$(".single_btn").removeClass("loading");
  				$(".single_btn").html("立即下单");
  			});
  			// 点击服务协议
  			$(".service_agreement").on("click", function () {
  				$("#text-content").blur();
  				setTimeout(function () {
  					ant.pushWindow({
  						url: "service-agreement.html"
  					});
  				}, 300);
  			});
  			// 绑定"立即下单"按钮的点击事件
  			$(".single_btn").click(function () {
  				if ($(".single_btn").hasClass("disabled")) {
  					return;
  				}
  				$(".once_order").show();

  			});

  			$("#defaultCheckBox").find("span").css({
  				"background-image": "url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/default-select.png)"
  			});
  			// 绑定“同意协议” 复选框的事件
  			$("#defaultCheckBox").click(function () {
  				if ($(this).hasClass("defaultSelect")) {
  					$(this).toggleClass("defaultSelect");
  					$(".single_btn").addClass("disabled");
  					$(this).find("span").css({
  						"background-image": "url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/default-noSelect.png)"
  					});
  					// $(this).find("span").attr("src", "http://kuaidi-dev.oss-cn-hangzhou.aliyuncs.com/mobile/default-noSelect.png");
  				} else {
  					$(this).toggleClass("defaultSelect");
  					if (checkInf()) {
  						$(".single_btn").removeClass("disabled");
  					}
  					$(this).find("span").css({
  						"background-image": "url(https://expressprod.oss-cn-hangzhou.aliyuncs.com/mobile/img/default-select.png)"
  					});
  				}

  			});
  			$(document).on("click", ".continue_order", function () {
  				$(".once_order_two").show();
  			});
  			$(document).on("click", ".Ierror", function () {
  				$(".once_order").hide();
  			});
  			$(document).on("click", ".Iknow", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c5305.d8437",
  					actionId: 'clicked',
  				});
  				$(".once_order").hide();
  				$(".once_order_two").hide();
  				if (enableButton) {
  					if ($(".single_btn").hasClass("disabled")) {
  						return;
  					} else {
  						enableButton = false;
  						$(".single_btn").addClass("loading");
  						$(".single_btn").attr("role", "alert");
  						$(".single_btn").attr("aria-live", "assertive");
  						$(".single_btn").html('<i class="icon" aria-hidden="true"></i>加载中...');
  						setTimeout(function () {
  							enableButton = true;
  							$(".single_btn").removeClass("loading");
  							$(".single_btn").html("立即下单");
  						}, 7000);
  						addressOrder();
  					}
  				}
  			});
  			$("#text-content").bind("compositionstart", function () {
  				console.log(" into compositionstart");
  				informationLock = true;
  			});
  			$("#text-content").bind("compositionend", function () {
  				var emoji = emojione.toShort($(this).val());
  				$(this).val(emoji.replace(/\:[a-z0-9_]+\:/g, ''));
  				if ($(this).val().length >= 51) {
  					var tempval = $(this).val().slice(0, 50);
  					$(this).val(tempval);
  					$(".am-toast").show();
  					setTimeout(function () {
  						$(".am-toast").hide();
  					}, 800);
  				}
  				informationLock = false;
  			});
  			$("#text-content").bind('input', function () {
  				console.log("into input" + informationLock);
  				if (!informationLock) {
  					var emoji = emojione.toShort($(this).val());
  					$(this).val(emoji.replace(/\:[a-z0-9_]+\:/g, ''));
  					if ($(this).val().length >= 51) {
  						var tempval = $(this).val().slice(0, 50);
  						$(this).val(tempval);
  						$(".am-toast").show();
  						setTimeout(function () {
  							$(".am-toast").hide();
  						}, 800);
  					}
  				}
  			});
  			$("#text-content").bind("blur", function () {
  				scrollAble = false;
  			});
  			if (isAndroid) {
  				$(window).on('scroll', function (event) {
  					console.log(scrollAble);
  					if (scrollAble) {
  						console.log("dasdfa");
  						$("#text-content").blur();
  					}
  				}, false);
  			}
  		},
  		setSPM: function () {
  			//期望上门时间 spm
  			$(".alertInfo").on("click", "#selectTime", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4629.d7164",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  			});
  			//物品类型 spm
  			$(".alertInfo").on("click", ".wpType", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4629.d7165",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  			});
  			//服务类型 spm
  			$(".alertInfo").on("click", ".fwType", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4629.d7331",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  			});
  			//物品重量 spm
  			$(".alertInfo").on("click", ".wpWeight", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4629.d7166",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  			});
  			//如何计算 spm
  			$(".price_rule").on("click", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4629.d7169",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  				$("#text-content").blur();
  				setTimeout(function () {
  					ant.pushWindow({
  						url: "price-rule.html"
  					});
  				}, 300);
  			});
  			// 绑定“同意协议” 复选框的事件 spm
  			$("#defaultCheckBox").click(function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4630.d7170",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.epCompanyName
  					}
  				});
  			});
  			// 点击服务协议 spm
  			$(".service_agreement").on("click", function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4630.d7171",
  					actionId: 'clicked',
  					params: {
  						CompName: infoPersonCompany.
  					}
  				});
  			});
  			// 绑定"立即下单"按钮的点击事件 spm
  			$(".single_btn").click(function () {
  				BizLog.call('info', {
  					spmId: "a106.b2109.c4630.d7172",
  					actionId: 'clicked',
  					params: {
  						CompName: epCompanyName
  					}
  				});
  			});

  		},
  		startPromise: function () {}
  	}
  });
