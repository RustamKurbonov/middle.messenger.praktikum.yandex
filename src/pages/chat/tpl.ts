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

<section class="chatBody">
  <nav class="chatBody_header">
    <div class="chatBody_user">
      <div class="chatBody_icon"></div>
        <div class="chatBody_name">{{userName}}</div>
      </div>
  </nav>

  <div class="chatBody_content">
    {{{messageItems}}}
  </div>

  <section class="chatBody_form">
    <button class="chatBody_clip"></button>
      <div class="chatBody_field">
        {{{messageField}}}
      </div>
      {{{buttonSubmit}}}
  </section>
</section>
`;

export default tpl;
