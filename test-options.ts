import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayouts: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],
//first step
    formLayoutsPage: async({page}, use) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await use('')
    //fiveth step
    console.log('Tear down')
    }, 
    //{auto: true}],
//second step
    pageManager: async({page, formLayoutsPage}, use) => {
    const pm = new PageManager(page)
    await use(pm)

    }
})