import Inventory from "../utils/inventoryClass.js"

export default class Model {
    constructor() {
        this.tenantList = new Inventory;
        this.tenantList.addTenant("1234", 5000, "Inger Hansen", "10-10-2010", 100, 30000);
        this.tenantList.addTenant("9999", 6000, "Birger Preben Hansen", "01-12-2020", 101, 45000);
        this.tenantList.addTenant("999", 6500, "Preben Jensen", "09-09-2022", 102, 32000);
        this.tenantList.addTenant("1111", 2500, "Henning J", "09-09-2022", 102, 32000);
    }
}