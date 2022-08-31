import Tenant from "./tenantClass.js"

export default class Inventory {
    constructor() {
        this.tenants = [];
    }

    addTenant(tenantID, monthlyRent, tenantName, availableFrom, apartmentID, deposit) {
        const newTenant = new Tenant(tenantID, monthlyRent, tenantName, availableFrom, apartmentID, deposit);

        // Tilføj tenant til listen
        this.tenants.push(newTenant);
    }

    // Find guitar in the list via. serial number
    getTenant(tenantID) {
        for (const tenant of this.tenants) {
            if (tenantID === tenant.tenantID) {
                return tenant;
            }
        }
        
        // if no guitar is found by the serial number
        // The vaulue null represents the intentional absence of an object value;
        return null;
    }

    search(idealTenant) {
        // Deconstructing
        const {tenantID, monthlyRent, tenantName, availableFrom, apartmentID, deposit} = idealTenant;
        console.log(deposit);
        for (const tenant of this.tenants) {
            if (parseFloat(tenant.monthlyRent) === parseFloat(monthlyRent) || tenant.tenantName === tenantName || tenant.availableFrom === availableFrom || parseFloat(tenant.apartmentID) === parseFloat(apartmentID) || parseFloat(tenant.deposit) === parseFloat(deposit)) {
                return tenant;
            }
        }
        // if no ideal guitar is found
        return null;
    }

    allTenants() {
        return this.tenants;
    }

    // delete guitars -    deleteGuitars(sn) før
    deleteTenant(tid) {
        // finds out where on the guitarList the guitar is with this specific serial number
        // index becomes a number, arrays starts with 0 ++
        // goes through the list of guitars and looks for the specific serial number
        // then returns what position the guitar has in the array
        const index = this.tenants.map(tenant => tenant.tenantID).indexOf(tid);


        // it removes splices 1 item on the guitar object list in the position of the serial number
        // removes the guitar that has a delete button clicked
        this.tenants.splice(index, 1);
    }
}