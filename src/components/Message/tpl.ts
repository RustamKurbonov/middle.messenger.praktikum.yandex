const tpl = `
  <nav class="message-nav">
    <div class="message-user">
      <div class="message-icon"></div>
        <div class="message-name">{{title}}</div>
      </div>
  </nav>

  <div class="message-content">
    {{{messages}}}
  </div>
`;

export default tpl;
