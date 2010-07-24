/* Expands links to a handful of known image sites into their thumbnail equivalent */
/* Sloppy Javascript, I know. - 2010-04-30 - @Paul_Shinn */
(function() {
// Shared Utility Functions
var __strip_token = function(txt){var clip = txt.lastIndexOf('/');return txt.substr(clip + 1, txt.length - clip - 1);};
var __strip_token_youtube = function(txt){var clip = txt.lastIndexOf('v=');var clip2= txt.lastIndexOf('&');if(clip2 == -1){return txt.substr(clip + 2, txt.length - clip - 2);}else{return txt.substr(clip + 2, clip2 - clip - 2);}};
var __strip_token_youtube2 = function(txt){var clip = txt.lastIndexOf('/');var clip2= txt.lastIndexOf('?');if(clip2 == -1){return txt.substr(clip + 1, txt.length - clip - 1);}else{return txt.substr(clip + 1, clip2 - clip - 1);}};
var __map_twitpic = function(token){return "<br /><a href=\"http://twitpic.com/" + token + "\"><img src=\"http://twitpic.com/show/thumb/" + token + "\" /></a><br />";};
var __map_yfrog = function(token){return "<br /><a href=\"http://yfrog.com/" + token + "\"><img src=\"http://yfrog.com/" + token + ".th.jpg\" /></a><br />";};
var __map_brizzly = function(token){return "<br /><a href=\"http://brizzly.com/pic/" + token + "\"><img src=\"http://pics.brizzly.com/thumb_sm_" + token + ".jpg\" /></a><br />";};
var __map_imgly = function(token){return "<br /><a href=\"http://img.ly/show/thumb/" + token + "\"><img src=\"http://img.ly/show/thumb/" + token + "\" /></a><br />";};
var __map_youtube = function(token){return '<br /><object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/' + token + '&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/' + token + '&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>';};
var __map_twitvid = function(token){return '<br /><object width="425" height="355"><param name="movie" value="http://www.twitvid.com/player/' + token + '"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"><embed src="http://www.twitvid.com/player/' + token + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowNetworking="all" allowfullscreen="true" wmode="transparent" width="425" height="355"></embed></object>';};

// This is a Prototype.js Snare. We assume that jQuery is the most available, by default.
var $p = null;
try{$p = $$;}catch(e){};
if($p===null)
{
// Assume jQuery if the symbol $$ is not declared and mapped to $p
// Used by Twitter (1.3+), Brizzly (Version Unknown, 1.0+?)
var __jquery_filter = function(obj, rexx){var r = new RegExp(rexx);return r.test(obj.text());};
var __jquery_act = function(obj, tokenmap, msg) {var token = __strip_token(obj.text());obj.before("<br />");obj.text(msg);obj.after(tokenmap(token));};
var __jquery_act_youtube = function(obj, tokenmap, msg) {var token = __strip_token_youtube(obj.text());obj.text(msg);obj.after(tokenmap(token));};
var __jquery_act_youtube2 = function(obj, tokenmap, msg) {var token = __strip_token_youtube2(obj.text());obj.text(msg);obj.after(tokenmap(token));};

// TwitPic Links
$("a[href^='http://twitpic.com/']").filter(function(){return __jquery_filter($(this),"http://twitpic\\.com/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_twitpic, "(View on TwitPic)");});
// yFrog Links
$("a[href^='http://yfrog.com/']").filter(function(){return __jquery_filter($(this),"http://yfrog\\.com/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_yfrog, "(View on yFrog)");});
// Brizzly Image Links
$("a[href^='http://brizzly.com/pic/']").filter(function(){return __jquery_filter($(this), "http://brizzly\\.com/pic/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_brizzly, "(View on Brizzly)");});
// img.ly Links
$("a[href^='http://img.ly/']").filter(function(){return __jquery_filter($(this),"http://img\\.ly/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_imgly, "(View on img.ly)");});
// Youtube Links (youtube.com / www.youtube.com)
$("a").filter(function(){return __jquery_filter($(this), "youtube\\.com/watch\\?v=\\w+");}).each(function(){__jquery_act_youtube($(this),__map_youtube, "(View on YouTube)");});
// Youtube Short-Links (youtu.be)
$("a[href^='http://youtu.be/']").filter(function(){return __jquery_filter($(this), "http://youtu\\.be/[A-Za-z0-9]+");}).each(function(){__jquery_act_youtube2($(this),__map_youtube, "(View on YouTube)");});
// TwitVid Links
$("a").filter(function(){return __jquery_filter($(this),"http://twitvid\\.com/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_twitvid, "(View on TwitVid)");});
}
else
{
// Prototype.js - used by favstar.fm (Version Unknown)
var __prototype_apply = function(e, rexx, tokenmap, msg){var r=new RegExp(rexx);if(r.test(e.innerHTML)){var token = __strip_token(e.innerHTML);e.innerHTML = msg;e.insert({before: "<br />"});e.insert({after: tokenmap(token)});}};
var __prototype_apply_youtube = function(e, rexx, tokenmap, msg){var r=new RegExp(rexx);if(r.test(e.innerHTML)){var token = __strip_token_youtube(e.innerHTML);e.innerHTML = msg;e.insert({before: "<br />"});e.insert({after: tokenmap(token)});}};
var __prototype_apply_youtube2 = function(e, rexx, tokenmap, msg){var r=new RegExp(rexx);if(r.test(e.innerHTML)){var token = __strip_token_youtube2(e.innerHTML);e.innerHTML = msg;e.insert({before: "<br />"});e.insert({after: tokenmap(token)});}};

// Twitpic Links
$p('a').map(
    function(e) { 
        // TwitPic
        __prototype_apply(e, "http://twitpic\\.com/[A-Za-z0-9]+", __map_twitpic, "(View on TwitPic)");
        // yFrog
        __prototype_apply(e, "http://yfrog\\.com/[A-Za-z0-9]+", __map_yfrog, "(View on yFrog)");
        // Brizzly
        __prototype_apply(e, "http://brizzly\\.com/pic/[A-Za-z0-9]+", __map_brizzly, "(View on Brizzly)");
        // img.ly
        __prototype_apply(e, "http://img\\.ly/[A-Za-z0-9]+", __map_imgly, "(View on img.ly)");
        // Youtube (youtube.com / www.youtube.com)
        __prototype_apply_youtube(e, "youtube\\.com/watch\\?v=\\w+", __map_youtube, "(View on YouTube)");
        // Youtube Short-Links (youtu.be)
        __prototype_apply_youtube2(e, "http://youtu\\.be/[A-Za-z0-9]+", __map_youtube, "(View on YouTube)");
        // TwitVid
        __prototype_apply(e, "http://twitvid\\.com/[A-Za-z0-9]+", __map_twitvid, "(View on TwitVid)");
    });
}
})();

/* additional notes */
// TwitGoo Links » "http://twitgoo\\.com/[A-Za-z0-9]+"
// Disabled for now, doesn't appear to work... are they returning a valid mime type? those bastards...
// Tweetphoto sets a bad mime type. not usable!
