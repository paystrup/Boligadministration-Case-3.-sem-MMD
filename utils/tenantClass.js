export default class Tenant{
    constructor(tenantID,monthlyRent,tenantName,availableFrom,apartmentID,deposit) {
        this.tenantID = tenantID;
        this.monthlyRent = monthlyRent;
        this.tenantName = tenantName;
        this.availableFrom = availableFrom;
        this.apartmentID = apartmentID;
        this.deposit = deposit;
    }

    getTenantID () {
        return this.tenantID;
    }

    getMonthlyRent () {
        return this.monthlyRent;
    }

    getTenantName () {
        return this.tenantName;
    }

    getAvailableFrom() {
        return this.availableFrom;
    }

    getApartmentID() {
        return this.apartmentID;
    }

    getDeposit() {
        return this.deposit;
    }
}