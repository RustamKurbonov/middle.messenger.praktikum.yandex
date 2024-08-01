const tpl = `
<nav class="sidebar">
  <section class="sidebar_header">
    <div class="sidebar_search">
    {{{search}}}
    </div>
    {{{profileButton}}}
  </section>
  <div class="sidebar_content">
    {{{chatItems}}}
  </div>
</nav>

<section class="chat-body">
  <nav class="chat-body_header">
    <div class="chat-body_user">
      <div class="chat-body_icon"></div>
        <div class="chat-body_name">{{userName}}</div>
      </div>
  </nav>

  <div class="chat-body_content">
    {{{messageItems}}}
  </div>

  <section class="chat-body_form">
    <button class="chat-body_clip"></button>
      <form class="chat-body_field" id="messageForm">
        {{{messageField}}}
      </form>
      {{{buttonSubmit}}}
  </section>
</section>
`;

export default tpl;
