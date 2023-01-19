$('a').each(function(){
    $(this).text(this.protocol + "//" + (this.hostname || this.pathname));
});
