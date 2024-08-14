const tpl = `
  <div class="chat-item-icon" style="background-image: url({{icon}})">
  </div>
  <div class="chat-item-content">
    <div class="chat-item-title">{{name}}</div>
    <div class="chat-item-text">
      {{text}}
    </div>
  </div>
  <div class="chat-item-info">
    <div class="chat-item-date">{{date}}</div>
    <div class="chat-item-count">{{count}}</div>
  </div>
`;

export default tpl;
