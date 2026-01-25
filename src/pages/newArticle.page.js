import { th } from "@faker-js/faker";

export class ArticlePage {
    constructor(page) {
        this.page = page;
        this.articleLinks = page.getByText('New Article');
        this.articleTitle = page.getByPlaceholder('Article Title');
        this.desription = page.getByPlaceholder("What's this article about?");
        this.articleText = page.getByPlaceholder('Write your article (in markdown)');
        this.tagsArticle = page.getByPlaceholder('Enter tags');
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.articlePublishedTitle = page.getByRole('heading', {level: 1});;
        this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.editArticleButton = page.getByRole('link', {name: 'Edit Article'}).first();
        this.editArticleButtonSave = page.getByRole('button', { name: 'Update Article' });
        this.commentInput = page.getByPlaceholder('Write a comment...');
        this.commentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentText = page.locator('.card-block .card-text');
}
async goToArticle() {
    await this.articleLinks.click();
}

async createArticle(title, description, text, tags) {
    await this.articleTitle.click();
    await this.articleTitle.fill(title);
    await this.desription.click();
    await this.desription.fill(description);
    await this.articleText.click();
    await this.articleText.fill(text);
    await this.tagsArticle.click();
    await this.tagsArticle.fill(tags);
    await this.tagsArticle.click();
    await this.publishArticleButton.click();
}
getPublishedArticleTitle() {
    return this.articlePublishedTitle;
}
async deleteArticle() {
    this.page.once('dialog', async (dialog) => {
        await dialog.accept();
       })
       
        await this.deleteArticleButton.click();
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
async addComment(comment) {
    await this.commentInput.click();
    await this.commentInput.fill(comment);
    await this.commentButton.click();
    return this.commentText;

}
}