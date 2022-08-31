import Tenant from "../utils/tenantClass.js"

export default class View {
    constructor(controller) {
        const self = this;
        const tidSearchForm = document.getElementById("tidSearchForm");
        const tidField = document.getElementById("tidField");
        const panelText = document.getElementById("panelText");
        const closeCross = document.getElementById("closeCross");
        const searchForm = document.getElementById("searchForm");
        const monthlyRent = document.getElementById("monthlyRent");
        const tenantName = document.getElementById("tenantName");
        const availableFrom = document.getElementById("availableFrom");
        const apartmentID = document.getElementById("apartmentID");
        const deposit = document.getElementById("deposit");
        const showAllTenantsButton = document.getElementById("showAllTenantsButton");
        const tenantDialogForm = document.getElementById("tenantDialogForm");
        const addTenantBotton = document.getElementById("addTenantButton");
        const tenantDialog = document.getElementById("tenantDialog");
        const cancelButton = document.getElementById("cancelButton");

        // using Event Delegation for the delete buttons of all guitar
        // parent element is searchResult ID in the html, it's here all guitars are shown
        const searchResult = document.getElementById("searchResult");

        // hidden field to store information in
        const hiddenTidField = document.getElementById("hiddenTidField");

        const confirmDialog = document.getElementById("confirmDialog");
        const confirmDialogForm = document.getElementById("confirmDialogForm");
        const cancelConfirmBtn = document.getElementById("cancelConfirmBtn");

        self.controller = controller;

        showAllTenantsButton.onclick = function() {
            self.controller.showAllTenants();
        }

        // samme som addeventlistener("submit")
        tidSearchForm.onsubmit = function (e) {
            // prevents the submission of the form, so the function runs properly
            // so the page doesnt reload
            e.preventDefault();
            // the value of the snField is tranferred to the snSearch function from controller
            self.controller.tidSearch(tidField.value);
        }

        searchForm.onsubmit = function (e) {
            e.preventDefault();
            const optimalTenant = new Tenant ("", monthlyRent.value, tenantName.value, availableFrom.value, apartmentID.value, deposit.value);
            // send the optimalGuitar to the controller to run the search method
            self.controller.search(optimalTenant);
            // after search remove the folded out menu
            searchPanel.classList.remove("searchPanelAnim");
        } 

        panelText.onclick = function () {
            searchPanel.classList.add("searchPanelAnim");
        }

        closeCross.onclick = function () {
            searchPanel.classList.remove("searchPanelAnim");
        }

        // Dialog eventhandler
        addTenantBotton.onclick = function () {
            // clear the form data
            tenantDialogForm.reset();
            // show the dialog form, that is on top of the layout, front layer
            tenantDialog.showModal();
        }

        // close the dialog
        cancelButton.onclick = function () {
            tenantDialog.close();
        }

        // when the form is submitted, new guitar is added
        // controller has to be contacted first
        // takes the inputted values from the fieldset and sends it to the method newGuitar
        // will be sent as an object key: value

        tenantDialogForm.onsubmit = function () {
            self.controller.newTenant({
                tenantID: (document.getElementById("tidfield").value),
                monthlyRent: parseFloat(document.getElementById("monthlyrentfield").value),
                tenantName: document.getElementById("tenantnamefield").value,
                availableFrom: document.getElementById("availablefromfield").value,
                apartmentID: parseFloat(document.getElementById("apartmentidfield").value),
                deposit: parseFloat(document.getElementById("depositfield").value),
            })

        }

        searchResult.onclick = function (e) {
            // if user clicks a button within the parent area (searchResult id)
            if (e.target.nodeName === "BUTTON") {
                // read the buttons id, via. the controller the delete button gets the guitars id and adds it as an id for the button
                hiddenTidField.value = e.target.id;
                confirmDialog.showModal();
            }
        }

        cancelConfirmBtn.onclick = function () {
            // if the user cancels the deletion close the dialog box
            confirmDialog.close();
        }

        confirmDialogForm.onsubmit = function () {
            // the onclick for delete button adds the serial number to the hiddensnfield
            // then we call the deleteguitar function in the controller
            self.controller.deleteTenant(hiddenTidField.value);
            
            // show all guitars again after deletion, reload
            self.controller.showAllTenants();
        }


    }

    message(template){
        // indsæt data i searchResult
        const element = document.getElementById("searchResult");
        element.innerHTML=""; // resets result output element
        element.insertAdjacentHTML("beforeend", template); // samme som element.innerHTML = template;
    }

    // UX for when a new guitar is added and saved
    // snackbar is shown and removed after a delay 
    snackbar(snackmessage) {
        // const needs to be down here, as it's not a part of the constructor 
        const snackbar = document.getElementById("snackbar");
        snackbar.innerHTML = snackmessage;
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 3000);
    }
}