const tpl = `
      {{{profileSidebar}}}
      <section class="editing-chat-wrapper">
            <div class="editing-chat-top">
                  <div class="editing-chat-icon">
                        <img src={{avatar}} alt="icon" />
                  </div>
            </div>
            <h2 class="editing-chat-name">{{title}}</h2>
            <div class="editing-chat-form-wrapper" id="editingChat">
                  {{{idUserAdded}}}
            </div>
            <div class="editing-chat-buttons">
                  {{{buttons}}}
            </div>
            <div class="error">
                  {{errorText}}
            </div>
            <div class="editing-chat-users-wrapper">
                  <h3 class="editing-chat-users-title">Список пользователей чата:</h3>
                  {{{users}}}
            </div>
      </section>
`;

export default tpl;
