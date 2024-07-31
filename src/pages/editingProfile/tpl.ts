const tpl = `
      {{{profileSidebar}}}
      <section class="editingProfile_wrapper">
        <div class="editingProfile_icon"></div>
        <h2 class="editingProfile_name">{{username}}</h2>
         <div class="editingProfileForm_wrapper" id="editingProfile">
            {{{editingForm}}}
      </div>
	  {{{buttons}}}
	</div>
      </section>
`;

export default tpl;
