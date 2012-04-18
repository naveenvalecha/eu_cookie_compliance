Drupal.behaviors.eu_cookie_compliance_popup = function(context) {   

  html = Drupal.settings.eu_cookie_compliance.popup_html;
  height = Drupal.settings.eu_cookie_compliance.popup_height;
  width = Drupal.settings.eu_cookie_compliance.popup_width;
  delay = Drupal.settings.eu_cookie_compliance.popup_delay;

  eu_cookie_compliance_create_popup(html, height, delay);
 
}

function eu_cookie_compliance_create_popup(html, height, delay) {
  // Exit if the current browser has already received the popup, or 
  // the browser is not supported (IE6).
  if (eu_cookie_compliance_has_already_agreed())
    return;

  var popup = $(html)
    .attr({ "id": "sliding-popup" })
    .css({"bottom": -1 * height})
    .height(height)
    .width(width)
    .hide()
    .appendTo("body");

  popup.show().animate( { bottom: 0 }, delay);
}

  function eu_cookie_compliance_has_already_agreed() { 
    return document.cookie.indexOf("cookie-agreed") > -1; 
  }

  function eu_cookie_compliance_has_agreed() { 
    var date = new Date(); 
    date.setDate(date.getDate() + 100); 
    document.cookie = "cookie-agreed=true;expires=" + date.toUTCString() + ";path=/";
    delay = Drupal.settings.eu_cookie_compliance.popup_delay;
    eu_cookie_compliance_destroy_popup(delay)
  }
  
  function eu_cookie_compliance_destroy_popup(delay) {
    $("#sliding-popup").animate({ bottom: $("#sliding-popup").height() * -1 }, delay, function () { $("#sliding-popup").remove(); })
  }