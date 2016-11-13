function throtte(func,wait,options){

    let lastTime = 0;
    const now = Date.now();
    const gap = now - lastTime;
    if( gap >= wait ){
        func.apply(this);
        lastTime = now;
    }

    if(!lastTime){

    }
}