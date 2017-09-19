$(document).ready(function () {
    var scaleX = (document.body || document.documentElement).clientWidth;
    var left = 360 - scaleX / 2;
    var top = 600 - $('#wrap').height() / 2;
    $('.box').attr('style','transform:scale(' + scaleX / 720 +');top:-' + top +'px;left:-'+ left +'px');
    function Slider(opts) {
        // this.wrap = opts.dom;
//           构造三部曲
        this.init();
        this.renderDOM();
        this.bindDOM();
    }
    Slider.prototype.init = function () {
        // this.ratio = window.innerHeight/window.innerWidth;
        this.scaleH = window.innerHeight;
//            当前图片的索引
        this.idx = 0;
    };
    Slider.prototype.renderDOM = function () {
        // var wrap =this.wrap;
        // var data = this.list;
        // var len = data.length;
        var scale = this.scaleH;

        this.outer = document.getElementById('wrap');
        for( var i = 0;i<5;i++){
            // var li = document.createElement('li');
            // var item = data[i];
            var item = $('.item')[i];
            item.style.height = scale + "px";
            item.style.webkitTransform = 'translate3d(0,'+ i * scale +'px,0)';
            // if(item){
            //     if(item['height'] / item['width'] > this.ratio){
            //         li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item['img'] + '">';
            //     }else {
            //         li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item['img'] + '">';
            //     }
            // }
            // this.outer.appendChild(li);
        }
//            this.outer.style.width = scale + 'px';
//         wrap.style.height = window.innerHeight + 'px';
//         wrap.appendChild(this.outer);
    };
    Slider.prototype.bindDOM = function () {
        var self = this;
        var scale = self.scaleH;
        var outer = self.outer;
        // var len = self.list.length;

        var startHandler = function (event) {
            self.startY = event.touches[0].pageY;
            self.offsetY = 0;
            self.startTime = new Date() * 1;
        };
        var moveHandler = function (event) {
            event.preventDefault();
            self.offsetY = event.touches[0].pageY - self.startY;
            // var lis = outer.getElementsByTagName('li');
            var item = $('.item');
            var i = self.idx - 1;
            var j = i + 3;
            for(i; i < j ; i++){
                item[i] && (item[i].style.webkitTransform = 'translate3d(0,'+ ((i-self.idx) * scale + self.offsetY) +'px,0)');
                item[i] && (item[i].style.webkitTransition = 'none');
            }
        };
        var endHandler = function (event) {
            var boundary = scale/6;
            var endTime = new Date() * 1;
            // var lis = document.getElementsByName('li');
            if(endTime - self.startTime > 800){
                if(self.offsetY >= boundary){
                    self.go('-1');
                }else if(self.offsetY < -boundary){
                    self.go('+1');
                }else{
                    self.go('0');
                }
            }else{
//                    快操作优化，保证流畅性
                if(self.offsetY > 50){
                    self.go('-1');
                }else if(self.offsetY < -50){
                    self.go('+1');
                }else{
                    self.go('0');
                }
            }
        };
        outer.addEventListener('touchstart',startHandler);
        outer.addEventListener('touchmove',moveHandler);
        outer.addEventListener('touchend',endHandler);
    };
    Slider.prototype.go = function (n) {
        var idx = this.idx;
        var nidx;
        // var lis = this.outer.getElementsByTagName('li');
        // var len = lis.length;
        var item = $('.item');
        var scale = this.scaleH;

        if(typeof n == 'number'){
            nidx = idx;
        }else if (typeof n == 'string'){
            nidx = idx + n * 1;
        }

//            当索引从右边超出
        if(nidx > 4){
            nidx = 4;
        }else if(nidx < 0){
            nidx = 0;
        }

        this.idx = nidx;

        item[nidx].style.webkitTransition = '-webkitTransform 0.2s ease-out';
        item[nidx-1] && (item[nidx-1].style.webkitTransition = '-webkitTransform 0.2s ease-out');
        item[nidx+1] && (item[nidx+1].style.webkitTransition = '-webkitTransform 0.2s ease-out');

        item[nidx].style.webkitTransform = 'translate3d(0,0,0)';
        item[nidx-1] && (item[nidx-1].style.webkitTransform = 'translate3d(0,-'+ scale + 'px,0)');
        item[nidx+1] && (item[nidx+1].style.webkitTransform = 'translate3d(0,'+ scale +'px,0)');
    };
    new Slider({
        // 'dom':document.getElementsByClassName("item"),
        // 'list':list
    })
});