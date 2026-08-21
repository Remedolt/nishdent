
  // In-memory language state (no browser storage used)
  var currentLang = 'tr';
  function setLang(lang){
    currentLang = lang;
    document.documentElement.lang = lang;
    document.getElementById('btn-tr').classList.toggle('active', lang==='tr');
    document.getElementById('btn-en').classList.toggle('active', lang==='en');
    var nodes = document.querySelectorAll('[data-tr]');
    nodes.forEach(function(el){
      var val = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-tr');
      if(val === null || val === '') return;
      // allow simple inline tags (<b>, <br>) stored in data attributes
      el.innerHTML = val;
    });
  }
  function demoSubmit(e){
    e.preventDefault();
    alert(currentLang === 'en'
      ? 'Demo form: this prototype is not yet connected to a live backend. Please integrate a CRM/email service before launch.'
      : 'Demo form: bu prototip henüz canlı bir backend’e bağlı değildir. Yayına almadan önce bir CRM/e-posta servisi entegre edilmelidir.');
    return false;
  }
