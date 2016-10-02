import { Command } from 'dojo-cli/interfaces';
import register from './register';
import run from './run';

const command: Command = {
	description: 'runs tslint using the projects config file',
	register,
	run
};

export default command;
