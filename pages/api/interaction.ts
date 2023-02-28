import { NextApiRequest, NextApiResponse } from 'next';
import { WebClient } from '@slack/web-api';

//This line of code creates a new Map object called clickedButtons.
//A Map is a collection of key/value pairs, where each key is unique and can be used to access its corresponding value.
//In this case, the Map object can be used to store information about which buttons have been clicked.
const clickedButtons: Map<string, string> = new Map();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const payload = JSON.parse(req.body.payload);
		const web = new WebClient(process.env.SLACK_API_TOKEN);
		const user = payload.user.id;
		const action = payload.actions[0];

		if (action.action_id === 'home_button' || action.action_id === 'office_button') {
			const buttonId = action.action_id;
			const message_ts = payload.message.ts;
			const channel_id = payload.channel.id;

			// Get user's profile information
			const profile = await web.users.profile.get({
				user,
			});

			// Get URL of user's profile image
			const image_url = profile?.profile?.image_48;

			// Find index of block with action's block_id
			const blockIndex = payload.message.blocks.findIndex(
				(block: { block_id: any }) => block.block_id === action.block_id
			);

			// Find index of context block that comes after the block with the action's block_id
			const contextIndex = blockIndex + 1;

			// Update message with modified elements array
			const elements = payload.message.blocks[contextIndex].elements;

			// Check if user has already clicked on a button
			if (clickedButtons.get(user) === buttonId) {
				res.status(200).json({ success: true });
				return;
			} else {
				elements.push({
					type: 'image',
					image_url,
					alt_text: profile?.profile?.display_name,
				});
			}

			clickedButtons.set(user, buttonId);

			if (buttonId === 'home_button') {
				let elements = payload.message.blocks[blockIndex + 4].elements;
				elements.forEach((element: any, index: number) => {
					if (element.alt_text == profile?.profile?.display_name) {
						elements.splice(index, 1); // remove this element from the array
					}
				});
			}

			if (buttonId === 'office_button') {
				let elements = payload.message.blocks[blockIndex - 2].elements;
				elements.forEach((element: any, index: number) => {
					if (element.alt_text == profile?.profile?.display_name) {
						elements.splice(index, 1); // remove this element from the array
					}
				});
			}

			await web.chat.update({
				channel: channel_id,
				ts: message_ts,
				blocks: payload.message.blocks,
			});
		}

		res.status(200).json({ success: true });
	} else {
		res.status(405).json({ success: false });
	}
};
