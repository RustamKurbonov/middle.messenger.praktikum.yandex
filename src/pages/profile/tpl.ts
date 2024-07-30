const tpl = `
      {{{profileSidebar}}}
      <section class="profile_wrapper">
        <div class="profile_icon"></div>
        <h2 class="profile_name">{{username}}</h2>
        <ul class="profile_params">
        {{{profileParams}}}
        </ul>
        <div>
	  {{{buttons}}}
	</div>
      </section>
`;

export default tpl;
