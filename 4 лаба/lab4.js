var elements = [], elements2 = [];
var NumberOfElement = 0,NumberOfElement2 = 0;
var UsesObj = 0, UsesObj2 = 0;
var lineWidth=4;
var PartUses=0;
var startX;
var startY;
var FlagMouse = false;

function PartNumber(Uses) {
    document.getElementById('Part1') == Uses? (document.getElementById('Part1').style.display="block",PartUses=1) : document.getElementById('Part1').style.display="none";
    document.getElementById('Part2') == Uses? (document.getElementById('Part2').style.display="block",PartUses=2,Render(elements,NumberOfElement)) : document.getElementById('Part2').style.display="none";
    document.getElementById('Part3') == Uses? (document.getElementById('Part3').style.display="block",PartUses=3,Render(elements2,NumberOfElement2)) : document.getElementById('Part3').style.display="none";
}

function Mydeletefunck() {
    this.remove();
}

function AddElement(){
    var NEWB = document.createElement("p")
    NEWB.addEventListener("click", Mydeletefunck , false);
    NEWB.innerText = document.getElementById('TypingRect').value;
    NEWB.style.backgroundColor = document.getElementById('RectTyping').value;
    NEWB.style.textAlign = "center";
    NEWB.style.margin = '0';
    var rec = document.getElementById("rectangle");
    document.getElementById('RadioEnd').checked == true ? rec.appendChild(NEWB) : rec.prepend(NEWB)
}

function LookStatistic(){
    var str_out = 'всего ' + document.getElementById("rectangle").childElementCount + ' элемента, их общий текст “';
    for(var i=0; i<document.getElementById("rectangle").childElementCount;i++){
        str_out += document.getElementById("rectangle").childNodes[i].textContent + '.';
    }
    str_out +='"';
    alert(str_out)
}

function GetRandomValue(max){
    return Math.random() * (max);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Render(Figures,number){
    if(PartUses==2) var c = document.getElementById("mycanvas");
    if(PartUses==3) var c = document.getElementById("mycanvas2");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 650, 340);
    for(var n = 0;n < number;n++){
        ctx.fillStyle = Figures[n].Color;
        ctx.fillRect(Figures[n].X, Figures[n].Y, Figures[n].width, Figures[n].height);
        ctx.lineWidth=lineWidth;
        ctx.strokeStyle = Figures[n].Stroke;
        ctx.strokeRect(Figures[n].X, Figures[n].Y, Figures[n].width, Figures[n].height);
    }
}

function RectangleAdd(){
    var Xvar=GetRandomValue(650),Yvar=GetRandomValue(340),Color=getRandomColor();
    var obj = {isDraggin:false,Stroke:Color,Color:Color,X:Xvar,Y:Yvar,width:GetRandomValue(650 - Xvar),height:GetRandomValue(340 - Yvar)};
    if(PartUses==2){
        elements[NumberOfElement] = obj;
        NumberOfElement++;
        Render(elements,NumberOfElement);
    }
    if(PartUses==3){
        elements2[NumberOfElement2] = obj;
        NumberOfElement2++;
        Render(elements2,NumberOfElement2);
        var c = document.getElementById("mycanvas2");
        c.onmousedown = MouseDown;
        c.onmouseup = MouseUp;
        c.onmousemove= MouseMove;
    }
}

function SelectShape(){
    var Figures,number,UsesobjLocal;
    if(PartUses==2){
        Figures=elements;
        number=NumberOfElement;
        UsesobjLocal=UsesObj;
    }
    var x = event.pageX - 307,y = event.pageY - 153;
    if(PartUses==3){
        Figures=elements2;
        number=NumberOfElement2;
        startX = x;
        startY = y;
        UsesobjLocal= UsesObj2;
    }
    for(var n=number-1;n>=0;n--){
        if (y > Figures[n].Y && y < Figures[n].Y + Figures[n].height + lineWidth && x > Figures[n].X && x < Figures[n].X + Figures[n].width + lineWidth) {
            Figures[UsesobjLocal].isDraggin=false;
            Figures[UsesobjLocal].Stroke=Figures[UsesobjLocal].Color;
            Figures[n].Stroke='#4da1f7';
            Figures[n].isDraggin=true;
            if(PartUses==3) UsesObj2 = n; else UsesObj = n;
            Render(Figures,number);
            return;
        }
    }
}

function UnSelectShape(Figures,number){
    Figures[UsesObj2].isDraggin=false;
    Figures[UsesObj2].Stroke=Figures[UsesObj2].Color;
    Render(Figures,number);
}

addEventListener("keydown", moveRect);

function moveRect(e){
    if(NumberOfElement==0 || PartUses != 2) return;
    switch(e.keyCode){
        case 37:  // если нажата клавиша влево
            if(elements[UsesObj].X>0)elements[UsesObj].X--;
            break;
        case 38:   // если нажата клавиша вверх
            if(elements[UsesObj].Y>0)elements[UsesObj].Y--;  
            break;
        case 39:   // если нажата клавиша вправо
            if(elements[UsesObj].X + elements[UsesObj].width + lineWidth<652)elements[UsesObj].X++;
            break;
        case 40:   // если нажата клавиша вниз
            if(elements[UsesObj].Y + elements[UsesObj].height + lineWidth<342)elements[UsesObj].Y++;
            break;
    }
    Render(elements,NumberOfElement);
}

function MouseDown(e){
    SelectShape();
    FlagMouse = true;
}

function MouseUp(e){
    FlagMouse = false;
    UnSelectShape(elements2,NumberOfElement2);
}

function MouseMove(e){
    if(FlagMouse == true){
        var mx = parseInt(e.clientX - 307);
        var my = parseInt(e.clientY - 153);

        var dx = mx - startX;
        var dy = my - startY;

        var RectEnd=0;

        if(elements2[UsesObj2].X + dx<0){
            elements2[UsesObj2].X = 0;
            RectEnd = 1;
        }
        if(elements2[UsesObj2].X + elements2[UsesObj2].width + lineWidth + dx > 652)
        {
            elements2[UsesObj2].X = 652-(elements2[UsesObj2].width + lineWidth);
            RectEnd = 1;
        }
        if(elements2[UsesObj2].Y + dy<0){
            elements2[UsesObj2].Y = 0;
            RectEnd = 1;
        }
        if(elements2[UsesObj2].Y + elements2[UsesObj2].height + lineWidth + dy > 342)
        {
            elements2[UsesObj2].Y = 342-(elements2[UsesObj2].height + lineWidth);
            RectEnd = 1;
        }
        if(RectEnd == 0){
            elements2[UsesObj2].X += dx;
            elements2[UsesObj2].Y += dy;
        }
        
        Render(elements2,NumberOfElement2);

        startX = mx;
        startY = my;
        return 0;

    }
}