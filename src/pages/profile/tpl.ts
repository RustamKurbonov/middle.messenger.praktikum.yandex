const tpl = `
      {{{profileSidebar}}}
      <section class="profile-wrapper">
            <img class="profile-icon" src={{avatar}} alt="icon" />
            <h2 class="profile-name">{{first_name}}</h2>
            <ul class="profile-params">
                  {{{profileParams}}}
            </ul>
            <div>
                  {{{buttons}}}
            </div>
      </section>
`;

export default tpl;
