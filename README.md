# `bloggy_`

This is a basic blogging dapp made using icp.

canister: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=d7anp-zaaaa-aaaal-qjfua-cai

## Local deployment

### Prerequisites

1. Ensure you have the Plug wallet installed.
2. Make sure you have Node.js and DFX installed on your machine.

### Steps

In the root folder

```
npm i
dfx start --clean
```

Go to another tab of the terminal, deploy the canisters

```
dfx deploy
```

Open another tab for frontend

```
cd src/bloggy_frontend
npm i
npm start
```

## Authentication

Authentication is handled using the Artemis wallet. You can connect your Plug wallet to the dapp for seamless access.

## Backend

The backend is developed using the Motoko programming language. Key functionalities include:

- Create Post: Add new blog posts to the platform.
- View All Posts: Retrieve and display all blog posts.
- Delete All Posts: Remove all blog posts from the platform.
- Upgrade Functions: Post and pre-upgrade functions to ensure stable upgrades and data preservation.

## Additional Information

This dapp provides a simple and decentralized way to create, view, and manage blog posts. It leverages the security and scalability of the ICP platform, ensuring a robust and user-friendly experience.
