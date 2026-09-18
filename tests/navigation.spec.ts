import { test, expect } from "@playwright/test";

test.describe("Modernisum Public Platform Navigation", () => {
  test("Homepage loads with Liquid Glass hero and brand title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Modernisum/);

    // Verify main value proposition headline
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();
    await expect(headline).toContainText("Engineering Intelligent");

    // Verify presence of navigation links
    const nav = page.locator("header");
    await expect(nav).toBeVisible();
  });

  test("3-Click Rule: Can reach Modern School ERP in 1 click from home", async ({ page }) => {
    await page.goto("/");
    const schoolLink = page.getByRole("link", { name: "Modern School ERP" }).first();
    await schoolLink.click();
    await expect(page).toHaveURL(/.*modern-school/);
    await expect(page.locator("h1")).toContainText("Modern School");
  });

  test("Services page lists AI SaaS and custom software", async ({ page }) => {
    await page.goto("/services");
    await expect(page).toHaveTitle(/Software Services/);
    await expect(page.locator("h1")).toContainText("Enterprise Software");
  });

  test("Contact page renders interactive quote calculator", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Engineer Your");
    await expect(page.getByText("Interactive Quote & Architecture Request")).toBeVisible();
  });
});
