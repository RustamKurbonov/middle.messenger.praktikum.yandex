const tpl = `
      {{{profileSidebar}}}
      <section class="editing-profile-wrapper">
        <div class="editing-profile-icon"></div>
        <h2 class="editing-profile-name">{{first_name}}</h2>
         <div class="editing-profile-form-wrapper" id="editingProfile">
            {{{editingForm}}}
      </div>
      <div class="editing-profile-buttons">
	  {{{buttons}}}
      </div>
      <div class="error">
      {{errorText}}
      </div>
	</div>
      </section>
`;

export default tpl;
