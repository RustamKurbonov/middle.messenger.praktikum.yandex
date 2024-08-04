const tpl = `
      <section class="form-wrapper" id={{id}}>
        <form class="form-body">
          <h3 class="form-title">{{title}}</h3>
          {{{fields}}}
          <div class="form-buttons">
          {{{buttons}}}
          </div>
        </form>
      </section>`;

export default tpl;
