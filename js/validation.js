/*
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
*/

/* Project 5 Template */
let wordRegex = /\w+/
let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;  
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form=null;
let successMsg=null;
function initValidation(formId, successId) {
  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = document.querySelectorAll("input");
  for (input of inputs) {

    input.addEventListener("change", inputChanged );
  }
  form.addEventListener("submit", submitForm );
  
}
function inputChanged(ev) {
   let el = ev.currentTarget;
   el.classList.add('was-validated');
   validateForm();
   console.log(`input ${el.name} was changed.`);
   
   el.reportValidity();

  /*NOTE: we use 'was-validated' class so that you show the error indications only for the single field rather than the whole form at once*/
 
}

function submitForm(ev) {
  console.log("in submit");
  let form=ev.currentTarget;
  //if you don't preventDefault and stopPropagation
  //the default form action would be to redirect to the url in the 'action' attribute of the form
  //https://wp.zybooks.com/form-viewer.php
  ev.preventDefault(); //for now so we don't redirect
  ev.stopPropagation();

  validateForm();

  //DOM checkValidity function tells you current status of form according to html5

  if (!form.checkValidity()) {
      let inputs = document.querySelectorAll("input");
      for (input of inputs) {
         input.classList.add('was-validated')
      }
      validateForm();
     
  } else {
      console.log('valid form')
      form.style.display = 'none';
      successMsg.style.display = 'block';
     
  }

}


function validateForm() {

  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");
  
  if(checkRequired("state", "State is Required")){
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }
 
  if (checkRequired("email", "Email Address is required")) {
   checkFormat("email", "Email format is bad", emailRegex)
  }
  if (checkRequired("zip", "Zip Code is Required")) {
   checkFormat("zip", `Malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
  }
  if (checkRequired("phone", "Phone is required")) {
   checkFormat("phone", "Phone format is bad", phoneRegex)
  }
  checkRequired("newspaper", "You must select at least one!");

}

function validateState(id, msg) {
   let el = document.getElementById(id);
   let valid = false;
   if(stateAbbreviations.includes(el.value.toUpperCase())){
    valid = true;
   }
   
   setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
   
   let userInput = document.getElementById(id).value
   let valid = regex.test(userInput)
   
   setElementValidity(id, valid, msg);
   return valid;

}

function checkRequired(id, message) {
   let el = document.getElementById(id);
   let valid = false;
   let type = el.type;
   switch (type) {
   case 'text':
      if(wordRegex.test(el.value)){
       valid = true;
      }
      break;
   case 'checkbox':
      let checkboxes = document.querySelectorAll("input[name='find-page']");
      for (box in checkboxes){
         if(checkboxes[box].checked){
            valid = true;
         }
      }
      break;

  }
  setElementValidity(id, valid, message);
  

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);
  let parent = el.parentElement
  if (valid) { //it has a value

    el.setCustomValidity(''); //sets to no error message and field is valid
    if(el.classList.contains('was-validated')){
      parent.querySelector('.errorMsg').innerHTML = '';
      }

  } else {

    el.setCustomValidity(message); //sets error message and field gets 'invalid' stat
   
    if(el.classList.contains('was-validated')){
       parent.querySelector('.errorMsg').innerHTML = message;
    }
    
    

  }

}