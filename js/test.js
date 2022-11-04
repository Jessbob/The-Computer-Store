const form = document.getElementById('contactForm')
const url = 'https://hm5bbn0oql.execute-api.us-east-2.amazonaws.com/dev/email/send'
const toast = document.getElementById('toast')
const submit = document.getElementById('submit')

function onSubmit(token) {
  document.getElementById("contactForm").submit();
}

function post(url, body, callback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function () {
    if (req.status < 400) {
      callback(null, JSON.parse(req.responseText));
    } else {
      callback(new Error("Request failed: " + req.statusText));
    }
  });
  req.send(JSON.stringify(body));
}
function success () {
  toast.innerHTML = 'Thank you for your interest we will contact you soon.'
  submit.disabled = true
  submit.blur()
  form.name.focus()
  form.name.disabled = true
  form.name.blur()
  form.name.value = ''
  form.email.disabled = true
  form.email.blur()
  form.email.value = ''
  form.content.disabled = true
  form.content.blur()
  form.content.value = ''
  
}
function error (err) {
  toast.innerHTML = 'There was an error with sending your message, the problem is on our end. Thanks for your patience.'
  submit.disabled = false
  console.log(err)
}
form.addEventListener('submit', function (e) {
  e.preventDefault()
  toast.innerHTML = 'Thank you for your interest we will contact you soon.'
  submit.disabled = true
  const payload = {
    name: form.name.value,
    email: form.email.value,
    content: form.content.value,
    
  }
  post(url, payload, function (err, res) {
    if (err) { return error(err) }
    success()
  })
})