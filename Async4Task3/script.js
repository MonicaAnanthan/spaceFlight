const Space_API = 'https://api.spaceflightnewsapi.net/v3/articles'
async function getSpaceData() {
    try {
        const response = await fetch(`${Space_API}`);

        const result = await response.json();
        if (result.length > 0) {
            renderLists(result);
        } else {
            hideShow("no-data-container", "No Data found");
        }
    } catch (error) {
        hideShow("no-data-container", "Something went wrong! No Data Found!!");
        console.log(error);
    }
}
getSpaceData();

function renderLists(data = []) {
    const ulElement = document.getElementsByClassName("row")[0];
    if (data.length > 0) {
        data.forEach((_d) => {
            ulElement.appendChild(createListitem(_d));
        });
    }
}

function createListitem(item = {}) {
    const liItem = document.createElement("div");
    liItem.className = "col-12";
    liItem.innerHTML = `<div class="card">
                            <div class="card-body">
                                <div class="img-box">
                                    <img onerror='this.src="./assets/img/defaultImage.webp"' src=${item.imageUrl} alt="product" />
                                </div>
                                <div class="text-box">
                                    <h5>${item.newsSite}</h5>
                                    <h4>${item.title}</h4>
                                    <p>${item.summary}</p>
                                </div>
                            </div>
                        </div>`
    return liItem;
}


function hideShow(classOfElement = "", message = "") {
    const element = document.getElementsByClassName(classOfElement)[0];
    element.className = "no-data-container";
    document.getElementsByClassName("error-txt")[0].innerHTML = message
}
