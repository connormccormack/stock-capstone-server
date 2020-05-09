## Asset Trend
Live app: [https://asset-trend-app.now.sh/]
Live server: [https://gentle-caverns-99473.herokuapp.com/]
Demo user: Demo
Demo password: ASDFasdf12!@

### API Documentation
* POST /auth/login
  * POST [https://gentle-caverns-99473.herokuapp.com/api/auth/login]
  * allows users to login to their account
* POST /api/users
  * [https://gentle-caverns-99473.herokuapp.com/api/users]
  * allows a user to sign up for an account
* GET /portfolios/:user_id
  * [https://gentle-caverns-99473.herokuapp.com/api/portfolios/:user_id]
  * allows any user to get the list of assets in a portfolio
* POST /portfolios
  * [https://gentle-caverns-99473.herokuapp.com/api/portfolios]
  * allows an authenticated user to add as asset to their own portfolio
* DELETE /assets/:asset_id
  * [https://gentle-caverns-99473.herokuapp.com/api/assets/:asset_id]
  * allows an authenticated user to delete an asset from their own portfolio


### Screenshots

![Landing](/images/landingPage.png)
![Register](/images/registrationPage.png)
![Login](/images/loginPage.png)
![UserPortfolio](/images/currentUserPortfolio.png)
![OtherPortfolio](/images/otherUserPortfolio.png)
![AddAsset](/images/AddAsset.png)

### Summary
This app is designed to allow users to keep track of the assets they have in their portfolio, and see what other users have in their portfolio
Functionality includes:
* Users can register and sign in to their account
* Users can see the current contents of their portfolio
* Users can add items to their portfolio (only if logged in and viewing their OWN portfolio)
* Users can delete items from their portfolio (only if logged in and viewing their OWN portfolio)
* Users can view another user's portfolio (if they've been given the URL), but cannot add or delete items
* App contains a nav bar allowing users to register/sign in or logout (if signed in already)

### Technologies Used
* React.js
* Node.js
* Express
* Postgres
* SQL
* HTML
* CSS
* JSX