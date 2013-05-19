$(function() {
  window.showLoginModal= function showLoginModal(returnTo) {
    $.ajax({
      url: "/login?return_to="+returnTo,
      type: "get",
      dataType: "html",
      beforeSend: function() {
        $("#fancy_login .modal-body").html("<div class='progress progress-striped active'><div class='bar' style='width: 100%;'></div></div>");

        $("#fancy_login").modal("show");
      },
      complete: function(jqXHR) {
        $("#fancy_login .modal-body").html(jqXHR.responseText);
      }
    });
  };

  $("form[rel*=fancy_login]").each(function(index, element) {
    $(element).on("submit", function(e) {
      if (window.session_timed_out) {
        showLoginModal(window.location.pathname);
        return false;
      }
    });
  });

  $("a[rel*=fancy_login]").each(function(index, element) {
    $(element).on("click", function(e) {
      if (window.session_timed_out) {
        showLoginModal($(this).attr("href"));
        return false;
      }
    });
  });
});
