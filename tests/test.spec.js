import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../src/pages/login.page';
import { ArticlePage } from '../src/pages/newArticle.page';
import { MainPage } from '../src/pages/main.page';
import { ProfilePage } from '../src/pages/profile.page';
import { EditArticlePage } from '../src/pages/editArticle.page'
import { DeleteArticlePage } from '../src/pages/deleteArticle.page'
import { CommentArticlePage } from '../src/pages/commentArticle.page'

const user = {
    email: 'test_av@mail.ru',
    name: 'testAnastasiya',
    password: 'Password123',
    method() {}
}

const newArticle = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    text: faker.lorem.paragraphs(3),
    tags: faker.lorem.words(3)
};
const editedArticle = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    text: faker.lorem.paragraphs(3),
    tags: faker.lorem.words(3)
};

const url = 'https://realworld.qa.guru/';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    await mainPage.open(url);
    await mainPage.goToLogin();
    await loginPage.login(user.email, user.password);
});

test('1.Пользователь может написать статью', async ({page}) => {
    const articlePage = new ArticlePage(page);
    await articlePage.goToArticle();
    await articlePage.createArticle(newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
    await expect(articlePage.getPublishedArticleTitle()).toContainText(newArticle.title);

});

test('2.Пользователь может удалить статью', async ({page}) => {
    const articlePage = new ArticlePage(page);
    const deleteArticle = new DeleteArticlePage(page);
    await articlePage.goToArticle();
    await articlePage.createArticle(newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
    await deleteArticle.deleteArticle();
    await expect(page.locator(`text=${newArticle.title}`)).toHaveCount(0);

});

test('3.Пользователь может редактировать статью', async ({page}) => {
    const articlePage = new ArticlePage(page);
    const editArticle = new EditArticlePage(page);
    await articlePage.goToArticle();
    await articlePage.createArticle(newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
    console.log(newArticle.title);
    await editArticle.editArticle(editedArticle.title, editedArticle.description, editedArticle.text, editedArticle.tags);
    console.log(editedArticle.title);
    await expect(articlePage.getPublishedArticleTitle()).toContainText(editedArticle.title);
});

test('4.Пользователь может написать комментарий к статье', async ({page}) => {
    const articlePage = new ArticlePage(page);
    const commentArticle = new CommentArticlePage(page);
    let commentText = faker.lorem.sentence();
    await articlePage.goToArticle();
    await articlePage.createArticle(newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
    await commentArticle.addComment(commentText);
    await expect(articlePage.commentText).toContainText(commentText);
});

test('5.Пользователь может добавить статью в избранное', async ({page}) => {
    const articlePage = new ArticlePage(page);
    await articlePage.goToArticle();
    await articlePage.createArticle(newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
    await expect(articlePage.getPublishedArticleTitle()).toContainText(newArticle.title);
    const profilePage = new ProfilePage(page);
    await profilePage.goToProfile(); 
    const articleTitle = await profilePage.getFirstArticleTitleText();
    await profilePage.addToFavorite();
    await profilePage.goToFavoriteTab();
    const favoriteArticle = profilePage.getFavoriteArticleByTitle(articleTitle);
    await expect(favoriteArticle).toBeVisible();
    await expect(favoriteArticle).toHaveText(articleTitle);
});
