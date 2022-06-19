const return_button = document.getElementById("home")

return_button.addEventListener("click", function(){
    const action_result_return_button = window.confirm("Do you want to return home? \n If you click yes, cannot save that you have input data.")

    if (action_result_return_button) {
        location.href = "home.html"
    }else{
        console.log("return home is cancelled")
    }
})

const create_project_button = document.getElementById("create_project")

create_project_button.addEventListener("click",
    async function create_project_to_post() {
        url2 = "http://127.0.0.1:8000/make_project"
        const text_value = document.getElementById("project_name").value;

        let submit_data = {
            "project_title":""
        }
        submit_data.project_title = text_value
        const parameter = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body:JSON.stringify(submit_data)
        };
    
        console.log(parameter)
        const result = await fetch(url2, parameter).then((response) => {
        return response.json();
        });
        console.log(result);
        
        // img = document.getElementById("demo2");
        // img.src = result
        // main(result);
    }
)
  
