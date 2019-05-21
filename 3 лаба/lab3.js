function createAWithHref(hrefValue) {
    var a = document.createElement('a');
    a.href = hrefValue;
    return a;
}

console.log(createAWithHref("google.com"));

function collectDOMStat(roott) {
    const stat={
        tags: {},
        classes:{},
        texts:{}
    };
    var tclass;
    var childres={}
    let cont=roott.childNodes;
    console.log(cont)
    for(let i=0 ; i<cont.length; i++) {
        if(cont[i].nodeType===1){
            tclass=cont[i].classList;
            stat.classes[tclass[0]]=1;
            console.log(stat);
        }
    }
}

collectDOMStat(document.getElementById('some1_0'));


function addListener(eventName, target, fn) {
    target.addEventListener(eventName, fn);
}