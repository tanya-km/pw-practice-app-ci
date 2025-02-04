import {defineConfig, test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    // await page.goto('http://localhost:4200/')
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    // await page.locator('input').first().click()  

    //by ID
    // await page.locator('#inputEmail1').click()

    //by Class
    page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by Class (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selections
    page.locator('input[placeholder="Email"][nbinput]')

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1]')

    //by Partial text match
    page.locator(':text("Using")')

    //by Exact text match
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators', async({page}) => {
 await page.getByRole('textbox', {name: "Email"}).first().click() //the first textbox Email will be clicked for last=.last()
 await page.getByRole('button', {name: "Sign in"}).first().click() 
 await page.getByLabel('Email').first().click()
 await page.getByPlaceholder('Jane Doe').click()
 await page.getByText('Using the Grid').click()
//  await page.getByTitle('IoT Dashboard').click()
 await page.getByTestId('SignIn').click()
})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click() //the fourth element(because index starts with 0) will be found with a button
})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('Reusing the locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

await expect(emailField).toHaveValue('test@test.com')

})

test('extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtons = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtons).toContain("Option 1") //если в какой-то из кнопок есть кнопка с текстом Option 1

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    
    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()//await should always be with promises types of method
    expect.soft(text).toEqual('Submit')

    //Locator assertion
await expect(basicFormButton).toHaveText('Submit')

//Soft Assertion
await expect.soft(basicFormButton).toHaveText('Submit') //if test will be failed, the next test will contunie to run(but without soft it will stop)
await basicFormButton.click()
})



// test.describe('suite1', () => {
//     test.beforeEach(async({page}) => {
//         // await page.goto('http://localhost:4200/')
//     await page.getByText('Extra Components').click()
//     })

//     test('the first test1', async ({page}) => {
//         await page.getByText('Calendar').click()
//         })
        
// }) 

// test.describe('suite2', () => {
//     test.beforeEach(async({page}) => {
//         // await page.goto('http://localhost:4200/')
//     await page.getByText('Forms').click()
//     })

//     test('the first test2', async ({page}) => {
//         await page.getByText('Form Layouts').click()
//         })
        
//         test('navigate to datepicker page2', async ({page}) => {
//             await page.getByText('Datepicker').click()
//             })
// }) 