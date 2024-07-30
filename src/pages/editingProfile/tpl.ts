const tpl = `
      {{{profileSidebar}}}
      <section class="editingProfile_wrapper">
        <div class="editingProfile_icon"></div>
        <h2 class="editingProfile_name">{{username}}</h2>
        <form class="editingProfile_form">
        {{{profileFields}}}
        </form>
        <div>
	  {{{buttons}}}
	</div>
      </section>
`;

export default tpl;
