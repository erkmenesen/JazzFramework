$(document).ready(function(){
  $(".numpad").hide();
      $('.input').click(function(){
          $('.numpad').fadeToggle('fast');
      });
  
$('.del').click(function(){
          $('.input').val($('.input').val().substring(0,$('.input').val().length - 1));
      });
  $('.faq').click(function(){
    alert("Sanal klavye insanın üstüne yakışanı giymesidir..");
  })
$('.shuffle').click(function(){
  $('.input').val($('.input').val() + $(this).text());
        $('.shuffle').shuffle();
    });
(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);
  
});
