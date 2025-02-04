import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';


//a class should always start with the capital letter
export class NavigationPage extends HelperBase {

    // readonly page: Page 
    readonly formLayoutMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page){
// this.page = page
super(page)
this.formLayoutMenuItem = page.getByText('Form Layouts')
this.datePickerMenuItem = page.getByText('Datepicker')
this.smartTableMenuItem = page.getByText('Smart Table')
this.toastrMenuItem = page.getByText('Toastr')
this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage(){
        await this.selectGoupMenuItem('Forms')
        // await this.page.getByText('Form Layouts').click()
        await this.formLayoutMenuItem.click()
        await this.waitForNumberOfSeconds(2)
}

async datePickerPage(){
    // await this.page.getByText('Forms').click()
    await this.selectGoupMenuItem('Forms')
    // await this.page.waitForTimeout(1000)
    await this.datePickerMenuItem.click()
}

async smartTablePage(){
    await this.selectGoupMenuItem('Tables & Data')
    // await this.page.getByText('Tables & Data').click()
    await this.smartTableMenuItem.click()
}

async toastrPage(){
    // await this.page.getByText('Modal & Overlays').click()
    await this.selectGoupMenuItem('Modal & Overlays')
    await this.toastrMenuItem.click()
}

async tooltipPage(){
    //await this.page.getByText('Modal & Overlays').click()
    await this.selectGoupMenuItem('Modal & Overlays')
    await this.tooltipMenuItem.click()
}

private async selectGoupMenuItem(groupItemTitle: string){
const groupMenuItem = this.page.getByTitle(groupItemTitle)
const expandedState = await groupMenuItem.getAttribute('aria-expanded')
if(expandedState == "false")
    await groupMenuItem.click()
}

}