(function(){

// NOTE: Known Emoji Ranges => 0xE001 - 0xE05A,  0xE101 - 0xE15A,  0xE201 - 0xE253,  0xE301 - 0xE34D,  0xE401 - 0xE44C,  0xE501 - 0xE537

var isEmoji = function(v) {
  if(v <= 0xE000 || v > 0xE537){return false;}
  if(v >= 0xE001 && v <= 0xE05A){return true;}
  if(v >= 0xE101 && v <= 0xE15A){return true;}
  if(v >= 0xE201 && v <= 0xE253){return true;}
  if(v >= 0xE301 && v <= 0xE34D){return true;}
  if(v >= 0xE401 && v <= 0xE44C){return true;}
  if(v >= 0xE501 && v <= 0xE537){return true;}
  return false;
};

var createEmojiImage = function(v){
  var img = document.createElement('img');
  // NOTE: Please don't screw me on bandwidth.
  // NOTE: You can get your own copy of all images below.
  // NOTE: http://emoji.meklarian.com/grouped-images.zip
  // NOTE: Originals are from http://pukupi.com/post/1964/
  // NOTE: Thank you. <3
  img.src = "http://emoji.meklarian.com/AIPOTU/" + Number(v).toString(16) + ".png";
  return img;
}

var emojiReplace = function(node) {
  if(node.nodeType !== 3){return;}

  var frag = null;

  var changed = false;
  var val = node.nodeValue;
  var newval = "";
  var i = 0;
  for(;i<val.length;i++)
  {
    var cc = val.charCodeAt(i);
    if(isEmoji(cc))
    {
      if(frag == null){frag = document.createDocumentFragment();}
      changed = true;
      if(newval.length > 0)
      {
        frag.appendChild(document.createTextNode(newval));
        newval = "";
      }
      frag.appendChild(createEmojiImage(cc));
    }
    else
    {
      newval = newval + val.charAt(i);
    }
  }
  
  if(changed)
  {
    if(newval.length > 0) 
    {
        frag.appendChild(document.createTextNode(newval));
    }
  
    node.nodeValue = '';
    node.parentNode.insertBefore(frag, node);
  }
};

// NOTE: lazy lookup. 
var ignoreNodes = ",a,textarea,input,style,link,meta,script,object,iframe,pre,head,html,title,";

var replaceInTree = function(node, fnReplace) {
  if(node.nodeType !== 1){return;}
  var cns = node.childNodes;
  var len = cns.length;
  
  while(len--){
    var n = cns[len];
    if(n.nodeType === 1)
    {
      // NOTE: I know. I'm Lazy... - PS - 2010-07-31
      if(ignoreNodes.indexOf("," + n.nodeName.toLowerCase() + ",") === -1)
      {
        replaceInTree(n);
      }
    }
    if(n.nodeType === 3){emojiReplace(n);}
  };
};

replaceInTree(document.body, emojiReplace);

}());