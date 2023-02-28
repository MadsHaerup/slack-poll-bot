import type { NextApiRequest, NextApiResponse } from 'next';
import { WebClient, ChatPostMessageArguments } from '@slack/web-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const web = new WebClient(process.env.SLACK_API_TOKEN);

		const pollMessage: ChatPostMessageArguments = {
			channel: 'C04RDSFAFJ6',
			text: 'Are you working from home or the office?',
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: '*Are you working from home or the office?*',
					},
				},
				{
					type: 'divider',
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: ':house: *Home*',
					},
					accessory: {
						type: 'button',
						text: {
							type: 'plain_text',
							emoji: true,
							text: 'Vote',
						},
						value: 'vote_for_home',
						action_id: 'home_button',
					},
				},
				{
					type: 'context',
					elements: [
						{
							type: 'image',
							image_url: '/public/slackbot4848.png',
							alt_text: 'slack bot',
						},
					],
				},
				{
					type: 'divider',
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: ':office: *Office*',
					},
					accessory: {
						type: 'button',
						text: {
							type: 'plain_text',
							emoji: true,
							text: 'Vote',
						},
						value: 'vote_for_office',
						action_id: 'office_button',
					},
				},
				{
					type: 'context',
					elements: [
						{
							type: 'image',
							image_url: '/public/slackbot4848.png',
							alt_text: 'slack bot',
						},
					],
				},
				{
					type: 'divider',
				},
			],
		};

		const result = await web.chat.postMessage(pollMessage);

		console.log(`Poll message sent: ${result.ts}`);

		res.status(200).send('Poll message sent');
	} catch (error) {
		console.error(error);
		res.status(500).send('Error sending poll message');
	}
}

export async function manualTrigger(req: NextApiRequest, res: NextApiResponse) {
	try {
		await handler(req, res);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error triggering poll message');
	}
}
