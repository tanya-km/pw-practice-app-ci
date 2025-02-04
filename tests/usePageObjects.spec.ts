import {defineConfig, test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'
import {faker} from '@faker-js/faker'


test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke', async({page}) => {
    const pm = new PageManager(page)
// const navigateTo = new NavigationPage(page)
await pm.navigateTo().formLayoutsPage()
await pm.navigateTo().datePickerPage()
await pm.navigateTo().smartTablePage()
await pm.navigateTo().toastrPage()
await pm.navigateTo().tooltipPage()

})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`


    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatepickerPage = new DatepickerPage(page)

   await pm.navigateTo().formLayoutsPage()
    // await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    // await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', false)
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 15)

})


test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
// const navigateTo = new NavigationPage(page)
await pm.navigateTo().formLayoutsPage()
await pm.navigateTo().datePickerPage()

})