async function project_list_read() {
  // URI
  api_url = "http://127.0.0.1:8000/projects";

  // params
  const parameter = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(parameter);
  // API response
  const result = await fetch(api_url, parameter).then((response) => {
    return response.json();
  });
  console.log(result);

  // create table
  const table_element = document.getElementById("menu--selectproject");
  result.project_list.forEach((element) => {
    let tr_element = table_element.tBodies[0].insertRow(-1);
    let cell_element = tr_element.insertCell(0);
    let input_element = cell_element.appendChild(
      document.createElement("input")
    );
    input_element.type = "radio";
    input_element.name = "project_name";
    input_element.value = element
    let cell_element2 = tr_element.insertCell(1);
    cell_element2.appendChild(document.createTextNode(element));
    cell_element2.classList.add("menu--selectproject__detailtext");
  });
}

// create analysis
const create_analysis_button = document.getElementById("create_analysis");

create_analysis_button.addEventListener("click",
  async function analysis_post() {
    api_url = "http://127.0.0.1:8000/analysis_create";

    // Search checked radio button
    let project_title = ""
    const element_count = document.getElementsByName("project_name").length
    for (let index = 0; index<element_count; index++){
      if (document.getElementsByName("project_name")[index].checked){
        project_title = document.getElementsByName("project_name")[index].value
      }
    }

    // Read analysis title
    const text_value = document.getElementById("analysis_name").value

    let submit_data = {
      "project_title":"",
      "analysis_title":""
    }
    submit_data.project_title = project_title
    submit_data.analysis_title = text_value

    const parameter = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"},
    body:JSON.stringify(submit_data)
    };

    console.log(parameter)
    const result = await fetch(api_url, parameter).then((response) => {
    return response.json();
    });
    console.log(result);

  }
)

window.onload = project_list_read();
