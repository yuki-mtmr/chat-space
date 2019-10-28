$(function(){ 
  function buildPost(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                    ${message.name}
                  </div>
                  <div class="message__upper-info__date">
                    ${message.date}
                  </div>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${content}
                    </p>
                  ${img}
                  </div>
                </div>`
    return html;
  }
  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.messages').append(html)
      $('#message_content').val('')
      scrollBottom();

    })
    .fail(function(){
      alert('error');
    })
  })
});