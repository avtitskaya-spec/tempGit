export class DeleteArticlePage {
    constructor(page) {
        this.page = page;
        this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
    
    }


async deleteArticle() {
    this.page.once('dialog', async (dialog) => {
        await dialog.accept();
       })
       
        await this.deleteArticleButton.click();
}
}