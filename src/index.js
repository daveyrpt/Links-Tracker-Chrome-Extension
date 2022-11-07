const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const inputEL = document.getElementById('input-el');
const ulEL = document.getElementById('ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const saveTabBtn = document.getElementById('save-tab-btn');


let myLeads = [];
let listItems = "";

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEL.value);  
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEL.value = "";
    render(myLeads);
})

saveTabBtn.addEventListener('click', function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //console.log(tabs)
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        //let activeTab = tabs[0]
        //let activeTabId = activeTab.id // or do whatever you need
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        inputEL.value = "";
        render(myLeads);
    })


})

deleteBtn.addEventListener('dblclick', function() {
    myLeads = [];
    window.localStorage.clear();
    render(myLeads);
})

function render(info) {
    listItems = "";
    for (let counter = 0; counter < info.length; counter++) {
        listItems += `
            <li>
                <a target="_blank" href=${info[counter]}>
                    ${info[counter]}
                </a>
            </li>
        `
        console.log(info[counter]);
    }
    ulEL.innerHTML = listItems;
}
