$(function() {
  window.showLoginModal= function showLoginModal(returnTo) {
    $.ajax({
      url: "/login?return_to="+returnTo,
      type: "get",
      dataType: "html",
      complete: function(jqXHR) {
        $("#fancy_login .modal-body").html(jqXHR.responseText);
        $("#fancy_login").modal("show");
      }
    });
  };

  $("form[rel*=fancy_login]").each(function(index, element) {
    $(element).on("submit", function(e) {
      if (window.session_timeouted) {
        showLoginModal(window.location.pathname);
        return false;
      }
    });
  });

  $("a[rel*=fancy_login]").each(function(index, element) {
    $(element).on("click", function(e) {
      if (window.session_timeouted) {
        showLoginModal($(this).attr("href"));
        return false;
      }
    });
  });
});
