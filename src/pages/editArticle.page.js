import { th } from "@faker-js/faker";

export class EditArticlePage {
    constructor(page) {
        this.page = page;
        this.articleTitle = page.getByPlaceholder('Article Title');
        this.desription = page.getByPlaceholder("What's this article about?");
        this.articleText = page.getByPlaceholder('Write your article (in markdown)');
        this.tagsArticle = page.getByPlaceholder('Enter tags');
        this.editArticleButton = page.getByRole('link', {name: 'Edit Article'}).first();
        this.editArticleButtonSave = page.getByRole('button', { name: 'Update Article' });
}

async editArticle(title, description, text, tags) {
    await this.editArticleButton.click();
     await this.articleTitle.click();
    await this.articleTitle.fill(title);
    await this.desription.click();
    await this.desription.fill(description);
    await this.articleText.click();
    await this.articleText.fill(text);
    await this.tagsArticle.click();
    await this.tagsArticle.fill(tags);
    await this.tagsArticle.click();
    await this.editArticleButtonSave.click();
}
}