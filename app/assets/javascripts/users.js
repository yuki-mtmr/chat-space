$(document).on('turbolinks:load', function(){ 
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addUserToGroup(userId, userName){
    var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ userId }'>
        <input name='group[user_ids][]' type='hidden' value='${ userId }'>
        <p class='chat-group-user__name'>
          ${ userName }
        </p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    $('#chat-group-users').append(html);
  }
  
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $('#user-search-result').on("click", ".chat-group-user__btn--add", function() { //発火ボタン入れ替え
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
      addUserToGroup(userId, userName);
  });
  $('#chat-group-users').on("click", ".chat-group-user__btn--remove", function() { //発火ボタン入れ替え
    $(this)
      .parent()
      .remove();
  });
});