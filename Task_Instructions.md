Please do not fork the repository, but instead just clone it from Github. Once done, feel free to email the code to me or upload it to a publicly accessible Git repository and provide me with the link.
The task
============================================
You’re provided with a very simplified application for expense tracking. It already has the main layout and the Expense CRUD functionality implemented. For simplicity expense amounts can only be in full dollar amounts (cents are not supported).
Task #1
Your task is to add an “Account” resource to the application. The user needs to be able to add, or delete as many accounts as they like. They also need to be able to edit their name and account number. Balance can’t be changed by the user.
The “Account” functionality should work as follows:
It represents a bank account, and needs to have the following properties: name (user-friendly account name), number (bank account number), balance
Newly created accounts have a starting balance of $1000, and it can’t be changed by the frontend
Every expense has to be assigned to an account. After creating, expense can be reassigned to a different account. Assigning expenses to an account needs to adjust the account balance appropriately.
Users should not be able to spend more money than they have on the account (balance can’t become negative)
Task #2
The frontend React application gracefully handles situations when the server is unreachable or returns an unexpected response. If a save/delete request fails, it’ll show a toast-like notification. Please improve the Notifications implementation on the frontend so that notification goes away automatically after 5 seconds.
============================================
Please approach this project as if it was an actual application that needs to be deployed to production. Feel free to refactor any of the existing code and/or extract and create additional specific or general-purpose frontend components to implement the required functionality.
