
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
      el.innerHTML = val;
    });
    var placeholderNodes = document.querySelectorAll('[data-placeholder-tr]');
    placeholderNodes.forEach(function(el){
      var val = lang === 'en' ? el.getAttribute('data-placeholder-en') : el.getAttribute('data-placeholder-tr');
      if(val === null) return;
      el.setAttribute('placeholder', val);
    });
  }
  function updateFileName(input){
    var wrapper = input.closest('.file-upload');
    var nameEl = wrapper ? wrapper.querySelector('.file-upload-name') : null;
    if(!nameEl) return;
    if(input.files && input.files.length > 0){
      nameEl.removeAttribute('data-tr');
      nameEl.removeAttribute('data-en');
      nameEl.textContent = input.files[0].name;
    } else {
      nameEl.setAttribute('data-tr', 'Dosya seçilmedi');
      nameEl.setAttribute('data-en', 'No file chosen');
      nameEl.textContent = currentLang === 'en' ? 'No file chosen' : 'Dosya seçilmedi';
    }
  }
  function demoSubmit(e){
    e.preventDefault();
    var form = e.target;

    if (form.checkValidity && !form.checkValidity()){
      form.reportValidity();
      return false;
    }

    var to = form.getAttribute('data-mailto') || 'info@nisantasiuniversitesiagizvedissagligimerkezi.com';
    var subject = currentLang === 'en'
      ? (form.getAttribute('data-subject-en') || 'Website Form Submission')
      : (form.getAttribute('data-subject-tr') || 'Web Sitesi Formu');

    var lines = [];
    form.querySelectorAll('.field').forEach(function(fieldDiv){
      var label = fieldDiv.querySelector('label');
      var input = fieldDiv.querySelector('input, select, textarea');
      if (!input || input.type === 'file') return;
      var labelText = label ? label.textContent.trim() : '';
      var value = input.value || '';
      lines.push(labelText + ': ' + value);
    });

    var body = lines.join('\n');
    var mailtoLink = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailtoLink;
    return false;
  }
