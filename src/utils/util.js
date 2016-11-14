function throtte(func,wait,options){

    let lastTime = Date.now();
    return function next(){

        // if(!lastTime) lastTime = 0;
        const now = Date.now();
        const gap = now - lastTime;
        if( gap >= wait ){
            func.apply(this,arguments);
            // if(param===options.terminal) return;
            lastTime = now;
        }
        // next();
    }

}


const singleton = (function(){
    let param;
    return function(initialValue){
        return param || (param = initialValue);
    };
})();

let func1 = (function(){
    // let param = 0;
    return function(){
        param++;
        console.log("当前次数 ",param);
        return param;
    }
})()

// throtte(func1,1000,{terminal: 5})();

function isScrollDown(initTop,cb){
    const curTop = document.documentElement.scrollTop;

    if(curTop>initTop){
        cb(curTop);
        return true;
    }else{
        cb(curTop);
        return false;
    }

}

//保证上一次加载好的被滚动完以后才会加载下一部分
function check_if_needs_more_content(){
    const scrollTop = document.body.scrollTop||document.documentElement.scrollTop;

    const doc = document.documentElement;
    const name = 'Height';
    const docHeight = Math.max(
                        document.body[ "scroll" + name ], doc[ "scroll" + name ],
                        document.body[ "offset" + name ], doc[ "offset" + name ],
                        doc[ "client" + name ]
                    );


                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                    // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.


    const windowHeight = window.innerHeight  || document.documentElement.clientHeight;
      let distanceToDocBottom = docHeight-windowHeight-scrollTop;
      console.log("------document  ",docHeight);
      console.log("------windowHeight ",windowHeight);
      console.log("------scrollTop ",scrollTop);
      console.log("------distanceToDocBottom ",distanceToDocBottom);
      var distanceFromBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;
      if(Math.abs(distanceToDocBottom)<300) return true;
      return false;
    }


export { throtte,isScrollDown, check_if_needs_more_content};