async function create_project_to_post() {
    // URI
    api_url = "http://127.0.0.1:8000/projects"

    // params
    const parameter = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"}
    };

    console.log(parameter)
    // API response
    const result = await fetch(api_url, parameter).then((response) => {
    return response.json();
    });
    console.log(result);

    // create table
    const table_element = document.getElementById("menu--selectproject");
    result.project_list.forEach(element => {
        let tr_element = table_element.tBodies[0].insertRow(-1);
        let cell_element = tr_element.insertCell(0);
        let input_element = cell_element.appendChild(document.createElement("input"));
        input_element.type = "radio"
        input_element.name = "project_name"
        let cell_element2 = tr_element.insertCell(1);
        cell_element2.appendChild(document.createTextNode(element));
        cell_element2.classList.add("menu--selectproject__detailtext")
        });
}

window.onload = create_project_to_post();