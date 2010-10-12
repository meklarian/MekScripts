(function() {
var doSources = function()
{
var updateSource = function(e){
if(!e) var e = window.event;
var sourceList = document.getElementById('sourceList');
sourceList.style.display = "";
sourceList.innerHTML = "";
var ctx = context;
var slist = "Downloadable Song URLs on this page: <i>(Use Right-Click + Save As...)</i><br /><br />"; // <br /> in front when link is reenabled
if(ctx)
{
var ar = ctx.pageBlips;
var max = ar.length;
for(i = 0; i < max; i++)
{
var pb = ar[i];
if(pb.type == "songUrl")
{
slist = slist + "<div style='margin-top: 4px;'><a href='" + pb.url + "'>" + pb.url + "</a></div>";
}
}
}

sourceList.innerHTML = slist;

e.cancelBubble = true;
if(e.stopPropagation) e.stopPropagation();

return false;
};

// YUI Snare
var Y = null;
try{Y = YAHOO.util;}catch(e){};
if(Y===null){return;}
// already created, if so.
if(Y.Dom.inDocument("_blip_fm_sources_listSources")){return;}
var content = document.getElementById("content");
if(content===null){return;}
var page = document.getElementById("page");
if(page===null){return;}

var palette = document.createElement('div');
palette.id = "_blip_fm_sources_listSources";
palette.className = "content clearfix";
palette.innerHTML = "<div style='margin-top: 10px; padding: 10px; background-color: white; -moz-border-radius-bottomleft: 10px; -moz-border-radius-bottomright: 10px; -moz-border-radius-topleft: 10px;-moz-border-radius-topright: 10px;'><div id='sourceList' style=''>Known song sources go here. If you can see this, something bad has happened and things probably are not working right. Sorry.</div></div>";
//<a id='_blip_fm_sources_toggle' href='#'>Show/Refresh Song URLs</a> - TODOTODOTODO

//alert(palette.appendTo);
//palette.appendTo("page");
page.insertBefore(palette, content);

var sourceList = document.getElementById('sourceList');
sourceList.style.display = "none";

//var toggle = document.getElementById('_blip_fm_sources_toggle');
//toggle.onclick = updateSource;
window.setTimeout(updateSource, 1);
};

window.setTimeout(doSources, 1);
})();