export class MainPage {
    constructor (page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Login' }).describe(['Кнопка//ссылка войти']);

    }

    async goToLogin() {
        await this.loginLink.click();
    }
    async open(url) {
        await this.page.goto(url);

    }
}