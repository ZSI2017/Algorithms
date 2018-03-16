define(function(require,exports,module){
    require('cssComponent/popup.css');//弹层样式集合
    var TEMPLATE={
        'POP':'<div class="popup room" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            {{Room_InsufficientFunds}}\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="/myrecharge.shtml" target="_blank" class="recharge">{{Store_Charge}}</a>\
                            <a data-role="close" class="cancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                </div>'
    };

    var pop = {
        default:{
            'template':TEMPLATE.POP,
            'caption':'',
            'content':'',
            'buttons':'',
            'isBind':false,
            'closeHanlder':null,
            'okHandler':null,
            'top':''
        },
        init:function(){
            if(!this.container){
                this.container = $('#container').i18nAppend(this.options.template).children().last();
            }
        },
        compose:function(){
            this.caption = this.container.find('[data-role="caption"]');
            this.content = this.container.find('[data-role="content"]');
            this.button = this.container.find('[data-role="button"]');
            this.price = this.content.find('[data-role="price"]');
            this.inputNum = this.content.find('[data-role="num"]');
        },
        show:function(options){
            if(!this.initialized){
                this.options = $.extend({},this.default,options);
                this.init();
                this.compose();
                this.initialized = true;
            }

            this.options.caption && this.caption.i18nHTML(this.options.caption);
            this.options.content && this.content.i18nHTML(this.options.content);
            // 渲染 button按钮的时候。
            this.options.buttons && this.button.i18nHTML(this.options.buttons);
            var _top =  (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0) + document.documentElement.clientHeight/2 - 190 + 'px';
            this.container.find('.wrap').css('top',this.options.top || _top);
            this.options.isBind && this.bind();
            this.container.show();
        },
        bind:function(){
            this.options.okHandler && this.button.find('[data-role="ok"]').unbind('click').click(this.options.okHandler.bind(this));
            this.container.find('[data-role="close"]').unbind('click').click(this.close.bind(this));
        },
        close:function(){
            if(this.options.closeHandler) this.options.closeHandler();
            this.container.remove();
            delete this.container;
            this.options = this.default;
            this.initialized = false;
            $("#allFullWin").css("display","none");
        },
        rePaint:function(options){
            this.initialized = false;
            this.show(options);
        },
        back:function(){
            this.show(null,
                this.origContainer.find('[data-role="caption"]').html(),
                this.origContainer.find('[data-role="content"]').html(),
                this.origContainer.find('[data-role="button"]').html());
            this.compose();
        }

    };

    module.exports = pop;
});
