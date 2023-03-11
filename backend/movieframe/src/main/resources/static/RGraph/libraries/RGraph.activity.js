'version:2023-02-25 (6.11)';RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.Activity=function(conf)
{var id=conf.id,canvas=document.getElementById(id),min=conf.min,max=conf.max,value=conf.value;this.id=id;this.canvas=canvas;this.context=this.canvas.getContext?this.canvas.getContext("2d",{alpha:(typeof id==='object'&&id.alpha===false)?false:true}):null;this.canvas.__object__=this;this.type='activity';this.min=RGraph.stringsToNumbers(min);this.max=RGraph.stringsToNumbers(max);this.value=RGraph.stringsToNumbers(value);this.centerx=null;this.centery=null;this.radius=null;this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.currentValue=null;this.uid=RGraph.createUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.createUID();this.colorsParsed=false;this.coordsText=[];this.angles=this.coords=[];this.original_colors=[];this.images=[];this.firstDraw=true;this.stopAnimationRequested=false;if(typeof this.value==='number'){this.value=[this.value];}
for(var i=0;i<this.value.length;++i){if(this.value[i]<=0.0000001){this.value[i]=0.0000001;}}
this.properties={radius:null,centerx:null,centery:null,width:null,ends:'round',marginLeft:15,marginRight:15,marginTop:15,marginBottom:15,marginInner:1,backgroundGrid:false,backgroundGridColor:'#666',backgroundGridCircles:true,backgroundGridCirclesCount:null,backgroundGridRadials:true,backgroundGridRadialsCount:8,backgroundRings:true,backgroundRingsColors:null,backgroundRingsAlpha:0.5,backgroundColor:'black',colors:['#F45B5B','#90EE7E','#2B908F','red','green','blue','yellow','pink'],icons:[],iconsWidth:null,iconsHeight:null,iconsOffsetx:0,iconsOffsety:0,textFont:'Arial, Verdana, sans-serif',textSize:12,textColor:'#aaa',textBold:false,textItalic:false,textAccessible:false,textAccessibleOverflow:'visible',textAccessiblePointerevents:false,text:null,labelsCenter:false,labelsCenterIndex:0,labelsCenterFont:null,labelsCenterSize:50,labelsCenterColor:null,labelsCenterBold:null,labelsCenterItalic:null,labelsCenterUnitsPre:'',labelsCenterUnitsPost:'',labelsCenterDecimals:0,labelsCenterPoint:'.',labelsCenterThousand:',',labelsCenterSpecific:'',labelsCenterOffsetx:0,labelsCenterOffsety:0,labels:[],labelsColor:null,labelsFont:null,labelsSize:null,labelsBold:null,labelsItalic:null,labelsBackgroundFill:'transparent',labelsBackgroundStroke:'transparent',labelsOffsetx:0,labelsOffsety:0,labelsFormattedDecimals:0,labelsFormattedPoint:'.',labelsFormattedThousand:',',labelsFormattedUnitsPre:'',labelsFormattedUnitsPost:'',contextmenu:null,annotatable:false,annotatableColor:'black',annotatableLinewidth:1,adjustable:false,tooltips:null,tooltipsEffect:'slide',tooltipsCssClass:'RGraph_tooltip',tooltipsCss:null,tooltipsEvent:'onclick',tooltipsHighlight:true,tooltipsHotspotXonly:false,tooltipsFormattedThousand:',',tooltipsFormattedPoint:'.',tooltipsFormattedDecimals:0,tooltipsFormattedUnitsPre:'',tooltipsFormattedUnitsPost:'',tooltipsFormattedKeyColors:null,tooltipsFormattedKeyColorsShape:'square',tooltipsFormattedKeyLabels:[],tooltipsFormattedListType:'ul',tooltipsFormattedListItems:null,tooltipsFormattedTableHeaders:null,tooltipsFormattedTableData:null,tooltipsPointer:true,tooltipsPositionStatic:true,highlightStyle:null,highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.5)',clearto:'rgba(0,0,0,0)'}
if(!this.canvas){alert('[ACTIVITY] No canvas support');return;}
var properties=this.properties;this.path=RGraph.pathObjectFunction;if(RGraph.Effects&&typeof RGraph.Effects.decorate==='function'){RGraph.Effects.decorate(this);}
this.responsive=RGraph.responsive;this.set=function(name)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(arguments.length===1&&typeof arguments[0]==='object'){for(i in arguments[0]){if(typeof i==='string'){this.set(i,arguments[0][i]);}}
return this;}
properties[name]=value;return this;};this.get=function(name)
{return properties[name];};this.draw=function()
{RGraph.fireCustomEvent(this,'onbeforedraw');if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
if(typeof this.value==='number'){this.value=[this.value];}
for(var i=0;i<this.value.length;++i){if(this.value[i]>this.max)this.value[i]=this.max;if(this.value[i]<this.min)this.value[i]=this.min;}
this.currentValue=RGraph.arrayClone(this.value);this.marginLeft=properties.marginLeft;this.marginRight=properties.marginRight;this.marginTop=properties.marginTop;this.marginBottom=properties.marginBottom;this.centerx=((this.canvas.width-this.marginLeft-this.marginRight)/2)+this.marginLeft;this.centery=((this.canvas.height-this.marginBottom-this.marginTop)/2)+this.marginTop;this.radius=Math.min((this.canvas.width-this.marginLeft-this.marginRight)/2,(this.canvas.height-this.marginTop-this.marginBottom)/2);this.coordsText=[];if(typeof properties.centerx==='number')this.centerx=properties.centerx;if(typeof properties.centery==='number')this.centery=properties.centery;if(typeof properties.radius==='number')this.radius=properties.radius;this.width=typeof properties.width==='number'?properties.width:((this.radius*0.75)/this.value.length);this.width=this.width-properties.marginInner-properties.marginInner;if(typeof properties.width==='string'){this.width+=Number(properties.width);}
if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.drawBackground();this.drawMeter();this.drawLabels();this.drawIcons();this.drawEnds();if(properties.contextmenu){RGraph.showContext(this);}
RGraph.addCustomText(this);RGraph.installEventListeners(this);if(this.firstDraw){this.firstDraw=false;RGraph.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RGraph.fireCustomEvent(this,'ondraw');return this;};this.exec=function(func)
{func(this);return this;};this.drawBackground=function()
{if(properties.backgroundColor){this.path('fs % fr -5 -5 % %',properties.backgroundColor,this.canvas.width+10,this.canvas.height+10);}
if(properties.backgroundGrid){if(properties.backgroundGridCircles){if(typeof properties.backgroundGridCirclesCount==='number'){var count=properties.backgroundGridCirclesCount;}else{var count=this.value.length+1;}
for(var i=0;i<count;i++){var radius=this.radius-(i*(this.width+(2*properties.marginInner)));this.path('b a % % % 0 6.29 false s %',this.centerx,this.centery,radius,properties.backgroundGridColor);}
if(properties.backgroundGridRadials){var angle=(RGraph.TWOPI/properties.backgroundGridRadialsCount);for(var i=0;i<=properties.backgroundGridRadialsCount;++i){this.path('b    a % % % % % %     a % % % % % %    s %',this.centerx,this.centery,radius,(i*angle)-RGraph.HALFPI,(i*angle)-RGraph.HALFPI,false,this.centerx,this.centery,this.radius,(i*angle)-RGraph.HALFPI,(i*angle)-RGraph.HALFPI,false,properties.backgroundGridColor);}}}}};this.drawMeter=function()
{var color;var r=(this.radius-properties.marginInner);if(properties.backgroundRings){this.context.globalAlpha=properties.backgroundRingsAlpha;for(var i=0;i<this.value.length;++i){if(RGraph.isArray(properties.backgroundRingsColors)&&typeof properties.backgroundRingsColors[i]==='string'){color=properties.backgroundRingsColors[i];}else{color=properties.colors[i];}
this.path('b       a % % % % % false          a % % % % % true       f %',this.centerx,this.centery,r-(i*(properties.marginInner+properties.marginInner+this.width)),0-RGraph.HALFPI,RGraph.TWOPI-RGraph.HALFPI,this.centerx,this.centery,r-this.width-(i*(properties.marginInner+properties.marginInner+this.width)),RGraph.TWOPI-RGraph.HALFPI,0-RGraph.HALFPI,color);}
this.context.globalAlpha=1;}
for(var i=0;i<this.value.length;++i){var radians=((this.value[i]-this.min)/(this.max-this.min))*RGraph.TWOPI;this.path('b       a % % % % % false          a % % % % % true       f %',this.centerx,this.centery,r-(i*(properties.marginInner+properties.marginInner+this.width)),0-RGraph.HALFPI,radians-RGraph.HALFPI,this.centerx,this.centery,r-this.width-(i*(properties.marginInner+properties.marginInner+this.width)),radians-RGraph.HALFPI,0-RGraph.HALFPI,properties.colors[i]);this.angles[i]=this.coords[i]={x:this.centerx,y:this.centery,angleStart:0-RGraph.HALFPI,angleEnd:radians-RGraph.HALFPI,radiusInner:r-this.width-(i*(properties.marginInner+properties.marginInner+this.width)),radiusOuter:r-(i*(properties.marginInner+properties.marginInner+this.width)),color:properties.colors[i],};}
RGraph.text({object:this,x:-10000,y:-10000,color:'transparent',text:''});};this.drawLabels=function()
{if(properties.labelsCenter){var textConf=RGraph.getTextConf({object:this,prefix:'labelsCenter'});RGraph.text({object:this,text:String(properties.labelsCenterSpecific?properties.labelsCenterSpecific:RGraph.numberFormat({object:this,number:this.value[properties.labelsCenterIndex].toFixed(properties.labelsCenterDecimals),unitspre:properties.labelsCenterUnitsPre,unitspost:properties.labelsCenterUnitsPost,point:properties.labelsCenterPoint,thousand:properties.labelsCenterThousand})),x:this.centerx+properties.labelsCenterOffsetx,y:this.centery+properties.labelsCenterOffsety,halign:'center',valign:'center',color:textConf.color,size:textConf.size,font:textConf.font,bold:textConf.bold,italic:textConf.italic});}
var textConf=RGraph.getTextConf({object:this,prefix:'labels'});if(typeof properties.labels==='string'){properties.labels=RGraph.arrayPad({array:[],length:this.coords.length,value:properties.labels});}
for(var i=0;i<properties.labels.length;++i){if(typeof properties.labels==='object'&&properties.labels.length&&typeof properties.labels[i]==='string'){var text=RGraph.labelSubstitution({object:this,text:properties.labels[i],index:i,value:this.value[i],decimals:properties.labelsFormattedDecimals,point:properties.labelsFormattedPoint,thousand:properties.labelsFormattedThousand,unitsPre:properties.labelsFormattedUnitsPre,unitsPost:properties.labelsFormattedUnitsPost,});}
RGraph.text({object:this,text:(RGraph.isString(properties.labels[i])||RGraph.isNumber(properties.labels[i]))?text:'',x:this.coords[i].x-5+properties.labelsOffsetx,y:this.coords[i].y-this.coords[i].radiusOuter+((this.coords[i].radiusOuter-this.coords[i].radiusInner)/2)+properties.labelsOffsety,valign:'center',halign:'right',bounding:true,boundingFill:properties.labelsBackgroundFill,boundingStroke:properties.labelsBackgroundStroke,textConfPrefix:'labels',});}};this.drawIcons=function()
{for(var i=0;i<this.value.length;++i){if(typeof properties.icons[i]==='string'&&properties.icons[i].length){this.images[i]=new Image();this.images[i].src=properties.icons[i];this.images[i].index=i;var obj=this;this.images[i].onload=function()
{var img=this;var width=img.width;var height=width;if(width>=obj.width){width-=10;height-=10;}
if(typeof properties.iconsWidth==='number'){width=properties.iconsWidth;}
if(typeof properties.iconsHeight==='number'){height=properties.iconsHeight;}
var x=obj.centerx-(width/3)+((properties.ends==='straight'||properties.ends==='square')?15:0);var y=(obj.centery-obj.coords[this.index].radiusOuter+((obj.coords[this.index].radiusOuter-obj.coords[this.index].radiusInner)/2)-(height/2));x+=properties.iconsOffsetx;y+=properties.iconsOffsety;obj.context.drawImage(this,x,y,width,height);};}}};this.drawEnds=function()
{if(properties.ends==='straight'||properties.ends==='square'){return;}
for(var i=0;i<this.coords.length;++i){var x=this.coords[i].x;var y=this.coords[i].y-((this.coords[i].radiusOuter-this.coords[i].radiusInner)/2)-this.coords[i].radiusInner;this.path('b a % % % % % false f %',x,y,this.width/2,0,6.29,properties.colors[i]);var xy=RGraph.getRadiusEndPoint({cx:this.centerx,cy:this.centery,angle:this.coords[i].angleEnd,radius:((this.coords[i].radiusOuter-this.coords[i].radiusInner)/2)+this.coords[i].radiusInner});this.path('b a % % % % % false f %',xy[0],xy[1],(this.coords[i].radiusOuter-this.coords[i].radiusInner)/2,0,6.29,properties.colors[i]);}};this.getShape=function(e)
{var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];for(var i=0;i<this.coords.length;++i){this.path('b    a % % % % % false    a % % % % % true',this.coords[i].x,this.coords[i].y,this.coords[i].radiusOuter,this.coords[i].angleStart,this.coords[i].angleEnd,this.coords[i].x,this.coords[i].y,this.coords[i].radiusInner,this.coords[i].angleEnd,this.coords[i].angleStart);if(properties.ends){this.path('a % % % % % false',this.coords[i].x,this.coords[i].y-this.coords[i].radiusInner-(this.width/2),this.width/2,RGraph.HALFPI,RGraph.PI+RGraph.HALFPI);var xy=RGraph.getRadiusEndPoint({cx:this.centerx,cy:this.centery,angle:this.coords[i].angleEnd,radius:((this.coords[i].radiusOuter-this.coords[i].radiusInner)/2)+this.coords[i].radiusInner});this.path('m % %    a % % % % % false',xy[0],xy[1],xy[0],xy[1],(this.coords[i].radiusOuter-this.coords[i].radiusInner)/2,0,6.29);}
if(this.context.isPointInPath(mouseX,mouseY)){if(RGraph.parseTooltipText){var tooltip=RGraph.parseTooltipText(properties.tooltips,i);}
return{object:this,x:this.coords[i].x,y:this.coords[i].y,radiusInner:this.coords[i].radiusInner,radiusOuter:this.coords[i].radiusOuter,angleStart:this.coords[i].angleStart,angleEnd:this.coords[i].angleEnd,tooltip:typeof tooltip==='string'?tooltip:null,label:properties.labels&&typeof properties.labels[i]==='string'?properties.labels[i]:null,dataset:0,index:i,sequentialIndex:i};}}};this.getValue=function(e)
{var mouseXY=RGraph.getMouseXY(e);var angle=RGraph.getAngleByXY(this.centerx,this.centery,mouseXY[0],mouseXY[1]);angle+=RGraph.HALFPI;if(angle>RGraph.TWOPI){angle-=RGraph.TWOPI;}
var value=((angle/RGraph.TWOPI)*(this.max-this.min))+this.min;value=Math.max(value,this.min);value=Math.min(value,this.max);return value;};this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e),width=this.width;var radius=RGraph.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);if(radius>this.radius||radius<(this.radius*0.25)){return null;}
return this;};this.adjusting_mousemove=function(e)
{if(properties.adjustable&&RGraph.Registry.get('adjusting')&&RGraph.Registry.get('adjusting').uid==this.uid){var mouseXY=RGraph.getMouseXY(e);var radius=RGraph.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);var index=this.getIndexByRadius(radius);if(typeof RGraph.Registry.get('adjusting.index')!=='number'){RGraph.Registry.set('adjusting.index',index);RGraph.addCustomEventListener(this,'onadjustend',function()
{RGraph.Registry.set('adjusting.index',null);});}else{index=RGraph.Registry.get('adjusting.index')}
if(typeof index==='number'){this.value[index]=this.getValue(e);RGraph.clear(this.canvas);RGraph.redrawCanvas(this.canvas);RGraph.fireCustomEvent(this,'onadjust');}}};this.getIndexByRadius=function(radius)
{for(var i=0;i<this.coords.length;++i){if(radius<this.coords[i].radiusOuter&&radius>this.coords[i].radiusInner){return i;}}
return null;};this.getAngle=function(value)
{if(value>this.max||value<this.min){return null;}
var angle=(((value-this.min)/(this.max-this.min))*RGraph.TWOPI)-RGraph.HALFPI;if(value===this.max)angle-=0.00001;if(value===this.min)angle+=0.00001;return angle;};this.highlight=function(shape)
{if(typeof properties.highlightStyle==='function'){if(properties.tooltipsHighlight){(properties.highlightStyle)(shape);}}else if(typeof properties.highlightStyle==='string'&&properties.highlightStyle==='invert'){if(properties.tooltipsHighlight){this.context.beginPath();for(var i=0;i<this.coords.length;++i){if(shape.index!==i){this.pathBar(i);}}
this.context.fillStyle=properties.highlightFill;this.context.strokeStyle=properties.highlightStroke;this.context.stroke();this.context.fill();}}else{if(properties.tooltipsHighlight){this.context.beginPath();this.pathBar(shape.index);this.context.fillStyle=properties.highlightFill;this.context.strokeStyle=properties.highlightStroke;this.context.stroke();this.context.fill();}}};this.pathBar=function(index)
{this.path('a % % % % % false',this.coords[index].x,this.coords[index].y,this.coords[index].radiusOuter,0-RGraph.HALFPI,this.coords[index].angleEnd);var xy=RGraph.getRadiusEndPoint({cx:this.centerx,cy:this.centery,angle:this.coords[index].angleEnd,radius:this.coords[index].radiusInner+((this.coords[index].radiusOuter-this.coords[index].radiusInner)/2)});if(properties.ends==='round'){this.path('a % % % % % false',xy[0],xy[1],this.width/2,this.coords[index].angleEnd,this.coords[index].angleEnd+RGraph.PI);}
this.path('a % % % % % true',this.coords[index].x,this.coords[index].y,this.coords[index].radiusInner,this.coords[index].angleEnd,this.coords[index].angleStart);if(properties.ends==='round'){this.path('a % % % % % false',this.centerx,this.centery-this.coords[index].radiusInner-((this.coords[index].radiusOuter-this.coords[index].radiusInner)/2),this.width/2,RGraph.HALFPI,RGraph.PI+RGraph.HALFPI);}};this.tooltipSubstitutions=function(opt)
{return{index:opt.index,dataset:0,sequentialIndex:opt.index,value:this.value[opt.index],values:this.value};};this.tooltipsFormattedCustom=function(specific,index)
{return{label:properties.tooltipsFormattedKeyLabels[index]};};this.positionTooltipStatic=function(args)
{var obj=args.object,e=args.event,tooltip=args.tooltip,index=args.index,canvasXY=RGraph.getCanvasXY(obj.canvas),coords=this.coords[args.index];var point=RGraph.getRadiusEndPoint({cx:this.centerx,cy:this.centery,radius:((coords.radiusOuter-coords.radiusInner)/2)+coords.radiusInner,angle:((coords.angleEnd-coords.angleStart)/2)+(0-RGraph.HALFPI)});args.tooltip.style.left=canvasXY[0]
+point[0]
-(tooltip.offsetWidth/2)
+obj.properties.tooltipsOffsetx
+'px';args.tooltip.style.top=canvasXY[1]
+point[1]
-tooltip.offsetHeight
-10
+obj.properties.tooltipsOffsety
+'px';if(parseFloat(args.tooltip.style.top)<0){args.tooltip.style.top=5+'px';}};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors.backgroundColor=RGraph.arrayClone(properties.backgroundColor);this.original_colors.colors=RGraph.arrayClone(properties.colors);}
properties.backgroundColor=this.parseSingleColorForGradient(properties.backgroundColor);var colors=properties.colors;if(colors&&colors.length){for(var i=0;i<colors.length;++i){colors[i]=this.parseSingleColorForGradient(colors[i]);}}};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color||typeof color!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1,radial:true});}
var parts=RegExp.$1.split(':');var grad=this.context.createLinearGradient(properties.marginLeft,0,this.canvas.width-properties.marginLeft-properties.marginRight,0);var diff=1/(parts.length-1);grad.addColorStop(0,RGraph.trim(parts[0]));for(var j=1,len=parts.length;j<len;++j){grad.addColorStop(j*diff,RGraph.trim(parts[j]));}}
return grad?grad:color;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RGraph.addCustomEventListener(this,type,func);}
return this;};this.firstDrawFunc=function()
{};this.grow=function()
{this.cancelStopAnimation();var obj=this;if(typeof this.value==='number'){this.value=[this.value];}
if(RGraph.isNull(this.currentValue)){this.currentValue=[];for(var i=0;i<this.value.length;++i){this.currentValue[i]=this.min;}}
var opt=arguments[0]||{},frames=opt.frames||30,frame=0,diff=[],step=[],callback=arguments[1]||function(){},initial=[];for(var i=0;i<this.value.length;++i){diff[i]=this.value[i]-this.currentValue[i];step[i]=diff[i]/frames;initial[i]=this.currentValue[i];}
function iterator()
{if(obj.stopAnimationRequested){obj.stopAnimationRequested=false;return;}
for(var i=0;i<obj.value.length;++i){obj.value[i]=initial[i]+(frame*step[i]);}
frame++;RGraph.clear(obj.canvas);RGraph.redrawCanvas(obj.canvas);if(frame<=frames){RGraph.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};this.stopAnimation=function()
{this.stopAnimationRequested=true;};this.cancelStopAnimation=function()
{this.stopAnimationRequested=false;};RGraph.register(this);RGraph.parseObjectStyleConfig(this,conf.options);};