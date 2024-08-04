const tpl = `
      {{{profileSidebar}}}
      <section class="profile-wrapper">
        <div class="profile-icon"></div>
        <h2 class="profile-name">{{username}}</h2>
        <ul class="profile-params">
        {{{profileParams}}}
        </ul>
        <div>
	  {{{buttons}}}
	</div>
      </section>
`;

export default tpl;
