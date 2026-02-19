import { th } from "@faker-js/faker";

export class CommentArticlePage {
    constructor(page) {
        this.commentInput = page.getByPlaceholder('Write a comment...');
        this.commentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentText = page.locator('.card-block .card-text');
}

async addComment(comment) {
    await this.commentInput.click();
    await this.commentInput.fill(comment);
    await this.commentButton.click();
    return this.commentText;

}
}