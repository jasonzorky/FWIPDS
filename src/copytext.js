var loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('body').appendChild(tag);
}
loadScript('//code.jquery.com/jquery-3.6.0.min.js')
loadScript('//code.jquery.com/jquery-3.6.0.min.js')

$('a').each(function(){
    $(this).text(this.protocol + "//" + (this.hostname || this.pathname));
});
