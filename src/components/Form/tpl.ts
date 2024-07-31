const tpl = `
      <section class="form_wrapper" id={{id}}>
        <form class="form_body">
          <h3 class="form_title">{{title}}</h3>
          {{{fields}}}
          <div class="form_buttons">
          {{{buttons}}}
          </div>
        </form>
        <div class="form_error">
         Ошибка валидации
        </div>
      </section>`;

export default tpl;
