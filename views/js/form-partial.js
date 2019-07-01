var environmentCount=1;
var environmentCountElement=null;

function createEnvironmentPartial(index, targetId){
  var partial = document.createElement("div");

  var br = document.createElement("br");
  partial.appendChild(br);

  var header = document.createElement("h3");
  header.innerText = "Environment "+(index+1);
  partial.appendChild(header);

  var iqLabel=document.createElement("label");
  iqLabel.setAttribute("for", "env" + index + "iq");
  iqLabel.innerText = "IQ";
  partial.appendChild(iqLabel);

  var environmentIq=document.createElement("input");
  partial.appendChild(environmentIq);

  environmentIq.type="number";
  environmentIq.setAttribute("iq", "env"+ index + "iq");
  environmentIq.setAttribute("name", "env"+ index + "iq");
  environmentIq.setAttribute("step", "1");
  environmentIq.setAttribute("value", "100");
  environmentIq.setAttribute("min", "0");
  environmentIq.setAttribute("max", "160");

  var br = document.createElement("br");
  partial.appendChild(br);
/*
  var wordLabel=document.createElement("label");
  wordLabel.setAttribute("for", "env"+index+"words");
  wordLabel.innerText = "Words Spoken";
  partial.appendChild(wordLabel);

  var environmentWords= document.createElement("input");
  environmentWords.type="range";
  environmentWords.setAttribute("min", "0");
  environmentWords.setAttribute("max", "50000000");
  environmentWords.setAttribute("class", "slider");
  environmentWords.setAttribute("id", "env" + index + "words");
  environmentWords.setAttribute("name", "env" + index + "words");
  partial.appendChild(environmentWords);

  br = document.createElement("br");
  partial.appendChild(br);
*/
  var incomeLabel = document.createElement("label");
  incomeLabel.setAttribute("for", "env" + index + "income");

  incomeLabel.innerText = "Average Income";
  partial.appendChild(incomeLabel);

  var income = document.createElement("select");
  income.setAttribute("name", "env" + index + "income");
  income.setAttribute("id", "env" + index + "income");

  var bracketLower = 0;
  var bracketUpper = 20000;

  for(let i = 1; i < 12; ++i)
  {
    var bracket = document.createElement("option");

    bracket.setAttribute("value", String(i));

    if(bracketUpper > 200000){
      bracket.innerText = "200000+"
    }
    else {
        bracket.innerText = bracketLower + " - " + bracketUpper;
    }

    income.appendChild(bracket);

    bracketLower += 20000;
    bracketUpper += 20000;
  }

  income.setAttribute("value", "3");
  partial.appendChild(income);

  br = document.createElement("br");
  partial.appendChild(br);

  var educationLabel = document.createElement("label");
  educationLabel.setAttribute("for", "env" + index + "education");
  educationLabel.innerText = "Years of Education";
  partial.appendChild(educationLabel);

/*
  var yearsOfEducation = document.createElement("input");
  yearsOfEducation.type="range";
  yearsOfEducation.setAttribute("value", "10");
  yearsOfEducation.setAttribute("min", "0");
  yearsOfEducation.setAttribute("max", "20");
  yearsOfEducation.setAttribute("class", "slider");
  yearsOfEducation.setAttribute("id", "env" + index + "education");
  yearsOfEducation.setAttribute("name", "env" + index + "education");
  partial.appendChild(yearsOfEducation);
*/

  var yearsOfEducation = document.createElement("select");
  yearsOfEducation.setAttribute("name", "env" + index + "education");
  yearsOfEducation.setAttribute("id", "env" + index + "education");


  for(let i = 0; i < 26; ++i)
  {
    var bracket1 = document.createElement("option");

    bracket1.setAttribute("value", String(i));
    bracket1.innerText=i;

    yearsOfEducation.appendChild(bracket1);
  }

  yearsOfEducation.setAttribute("value", "13");
  partial.appendChild(yearsOfEducation);

  var br = document.createElement("br");
  partial.appendChild(br);

  document.getElementById(targetId).appendChild(partial);
}
//  end of environment partial creating function
document.addEventListener("DOMContentLoaded", function(event){
  environmentCountElement=document.getElementById("environmentCount");
    createEnvironmentPartial(0, "partials");

    environmentCountElement.addEventListener("change", function(event){
      var value=event.target.value;
      var partials = document.getElementById("partials");
      partials.innerHTML="";
      for(var i=0; i<value; ++i){
        createEnvironmentPartial(i, "partials"); //creating partials
      }
    });
});
