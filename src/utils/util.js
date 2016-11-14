function throtte(func,wait,options){

    let lastTime = Date.now();
    return function next(){

        // if(!lastTime) lastTime = 0;
        const now = Date.now();
        const gap = now - lastTime;
        if( gap >= wait ){
            console.log("------arguments",arguments);
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


export { throtte };