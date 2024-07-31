const tpl = `
  <div class="chatItem_icon" style="background-image: url({{icon}})">
  </div>
  <div class="chatItem_content">
    <div class="chatItem_title">{{name}}</div>
    <div class="chatItem_text">
      {{text}}
    </div>
  </div>
  <div class="chatItem_info">
    <div class="chatItem_date">{{date}}</div>
    <div class="chatItem_count">{{count}}</div>
  </div>
`;

export default tpl;
