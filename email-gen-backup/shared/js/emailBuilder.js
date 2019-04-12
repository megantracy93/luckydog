const EmailBuilder = {
  new: (template) => {
    let email = template;
    const builder = {
      replaceKey: (key, value) => {
        const regex = new RegExp('\\$'+key, 'g');
        email = email.replace(regex, value);
        return builder;
      },
      build: () => {
        return email;
      }
    }
    return builder;
  }
};

module.exports = EmailBuilder;