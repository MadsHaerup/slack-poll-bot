# SLACK POLL BOT

### PREVIEW OF BOT IN ACTION

![bot](public/bot.png)

---

##

This project contains three serverless functions / API routes built with Next.js and Slack's web API.

## Routes

**/api/interaction**

This route sends a Slack message containing a poll with two options: "Home" and "Office". Each option has a button to vote.

When a user clicks a button, an interaction event is triggered. The interaction event is handled by Slack and sent to the /api/interaction route. This route logs the vote.

**/api/status**

This route sends a Slack message containing a poll with two options: "Home" and "Office". Each option has a button to vote.

This route is only invoked with a vercel cron job at 5am UTC time.

```json
{
	"crons": [
		{
			"path": "/api/status",
			"schedule": "00 05 * * 1-5"
		}
	]
}
```

**/api/manualTrigger**

This route can be used to manually trigger the sending of the poll message.

When this route is called, it sends a Slack message containing a poll with two options: "Home" and "Office". Each option has a button to vote.

In the slack Dashboard, the bot can be set up to be triggered manually with slash commands. For example add /poll to slash commands and it will manually launch the poll bot.

## TOKEN

To use these functions, you need to set up a Slack bot and obtain a Slack API token. You also need to create a .env file in the root directory of your project and add your Slack API token as follows:

```env
SLACK_API_TOKEN=Bot User OAuth Token
```

The token is found OAuth & Permissions and scroll to ↓

> OAuth Tokens for Your Workspace
> These tokens were automatically generated when you installed the app to your team. You can use these to authenticate your app. Learn more.

> Bot User OAuth Token
> xoxb-akdsfkllas-adflkasda-asndlkasn

## How to get started

- Clone the repository: git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
- Install dependencies: npm install
- Create a .env file and add your SLACK_API_TOKEN:
- SLACK_API_TOKEN=your-token-here
- Run the project: npm run dev

## Usage

To run the functions locally, you can use the following command:

```shell
npm run dev
```

This command starts a local server that listens on http://localhost:3000

You can test the functions by making HTTP requests to the following endpoints:

/api/status: sends a poll message to a specific Slack channel asking whether users are working from home or the office.
/api/manualTrigger: manually triggers the handler function to send the same poll message.

You can also deploy these functions to a serverless platform such as Vercel or AWS Lambda.

Note that these functions are designed to work with a specific Slack channel and may need to be modified if you want to use them with a different channel or Slack workspace.
