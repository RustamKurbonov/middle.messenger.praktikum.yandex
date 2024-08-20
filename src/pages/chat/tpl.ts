const tpl = `
  <nav class="sidebar">
    <section class="sidebar_header">
      <div class="sidebar_search">
        {{{search}}}
      </div>
      {{{profileButton}}}
      </section>
        <div class="sidebar_add-button">
          {{{chatName}}}
          {{{idUserAdded}}}
          {{{addChat}}}
        </div>
      <div class="sidebar_content">
        {{{chats}}}
      </div>
    </section>
  </nav>

  <section class="chat-body">
    {{{messages}}}
    <section class="chat-body_form">
        <button class="chat-body_clip"></button>
      <div class="chat-body_field" id="messageForm">
        {{{messageField}}}
      </div>
      {{{buttonSubmit}}}
    </section>
  </section>
`;

export default tpl;
