// controller = the middleman, telling the view what to do with the data

export default class Controller {
    initialize(model, view) {
        // der linkes til model og view
        this.model = model;
        this.view = view;
    }

    buildTemplate(tenant) {
        return `
        <div class="tenantCard">
                <div id="tenantCardPicture">
                    <img src="avatar.png" alt="Avatar">
                </div>
                <div>
                    <h3>Tenant ID: ${tenant.getTenantID()}</h3>
                    <h3>Tenant Name: ${tenant.getTenantName()}</h3>
                    <p>Monthly Rent: ${tenant.getMonthlyRent()} DKK</p>
                    <p>Available From: ${tenant.getAvailableFrom()}</p>
                    <p>Apartment ID: ${tenant.getApartmentID()}</p>
                    <p>Deposit: ${tenant.getDeposit()} DKK</p>
                    <button type="button" id="${tenant.getTenantID()}">Delete</button>
                </div>  
        </div>`
    }

    // button is added
    tidSearch(tenantID) {
        // controller contacts the model, activates the model
        const tenant = this.model.tenantList.getTenant(tenantID);
        
        let template = "";

        // if guitar is different from null (if it finds a guitar)
        if (tenant !== null) {
            template = this.buildTemplate(tenant);
        } else { // if no result is found, if it returns null
            template = `
            <tr class="customerrow"> 
                <td colspan="8">Nothing to show</td>
            </tr>`;
        }

        // show the result
        this.view.message(template);
    }

    search(searchTenant) {
        // controller contacts the model, activates the model
        const tenant = this.model.tenantList.search(searchTenant);
        
        let template = "";

        // if guitar is different from null (if it finds a guitar)
        if (tenant !== null) {
            template = this.buildTemplate(tenant);
        } else { // if no result is found, if it returns null
            template = `
            <tr class="customerrow"> 
                <td colspan="8">Nothing to show</td>
            </tr>`;
        }

        // show the result
        this.view.message(template);
    }

    showAllTenants() {
        let template = "";
        for (const tenant of this.model.tenantList.allTenants()) {
            template += this.buildTemplate(tenant);
        }
        this.view.message(template);
    }

    // add new guitar, new guitar objects are sent from the view
    newTenant(tenant) {
        // check if the guitar exists already by using getGuitar
        // then it returns null, we can use that to check
        // serial number is our unique identifier, we can't have 2 of the same
        // so if the guitar doesnt exist it returns null, which then adds the value from the view as a guitar object + shows snackbar message

        const doesTenantAlreadyExist = this.model.tenantList.getTenant(tenant.tenantID);

        if (doesTenantAlreadyExist === null) {
            this.model.tenantList.addTenant(tenant.tenantID, tenant.monthlyRent, tenant.tenantName, tenant.availableFrom, tenant.apartmentID, tenant.deposit);
            this.view.snackbar("The tenant was saved");
            this.showAllTenants();
        } else {
            this.view.snackbar("The tenant already exists");
        }
    }

    // for this to work we need the unique serial number to be deleted

    deleteTenant(tid) {
        // model is contacted with another deleteguitar that is a part of the inventory
        // as the inventory holds the list of the guitars
        this.model.tenantList.deleteTenant(tid);

        // ux, after the guitar is deleted we send a message to the snackbar in the view
        this.view.snackbar("The tenant was deleted");
    }
}