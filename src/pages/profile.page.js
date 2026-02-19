export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.profileName = page.locator('.nav-link.dropdown-toggle');
        this.profileLink = page.getByRole('link', {name: 'Profile'});
        this.addFavoriteButton = page.locator('button:has(i.ion-heart)').first();
        this.favoriteCount = page.locator('span.counter').first();
        this.favoriteLink = page.getByRole('link', { name: 'Favorited Articles' });
        this.articleTitles = page.locator('.article-preview h1');
    }

    async goToProfile() {
        await this.profileName.click();
        await this.profileLink.click();
    }
    async addToFavorite() {
        await this.addFavoriteButton.click();
    }
    counterFavorite() {
        return this.favoriteCount;
    }
    async goToFavoriteTab() {
        await this.favoriteLink.click();
    }
    async getFirstArticleTitleText() {
        return await this.articleTitles.first().textContent();
    }
    getFavoriteArticleByTitle(title) {
        return this.articleTitles.filter({ hasText: title });
    }

}