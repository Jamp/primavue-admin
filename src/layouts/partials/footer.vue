<template>
  <div class="layout-footer">
    <span id="emojify" class="footer-text" style="margin-right: 5px">
      {{ 'general.copyright' | translate }} <a href="https://icter.us">Icterus</a>
    </span>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  mounted () {
    var regex = /(?:\u2764)/g;

    var emojifyElement = document.getElementById("emojify");
    var elementString = emojifyElement.innerHTML;

    var match = regex.exec(elementString);

    var img = new Image();
    img.setAttribute('draggable', 'false');
    img.className = "emojified";
    img.alt = match[0];
    img.style.width = "1rem"
    img.src = "https://abs.twimg.com/emoji/v2/svg/2764.svg";

    emojifyElement.innerHTML = elementString.replace(regex, img.outerHTML);
  }
};
</script>
