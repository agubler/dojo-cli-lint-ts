import { Argv } from 'yargs';
import { Helper } from 'dojo-cli/interfaces';
import * as fs from 'fs';
import * as glob from 'glob';
import * as chalk from 'chalk';

const linter: any = require('tslint');
const pkgDir: any = require('pkg-dir');

export default async function(helper: Helper, args: Argv) {
	console.info(chalk.underline('Running TSLint'));
	const workingDirectory = pkgDir.sync(process.cwd());
	// TODO check file exists (fs-extra?)
	const configuration = require(workingDirectory + '/tslint.json');
	let fileCount = 0;
	let errorCount = 0;

	const fileSrcArray = 'src/**/*.ts,tests/**/*.ts'.split(',');
	fileSrcArray.forEach((src) => {
		glob.sync(src).forEach((file) => {
			const fileContents = fs.readFileSync(file, 'utf8');
			const l = new linter(file, fileContents, { configuration });
			const result = l.lint();
			fileCount++;

			if (result.failureCount > 0) {
				errorCount += result.failureCount;
				console.info(chalk.red(result.output));
			}
		});
	});
	const logColour = errorCount > 0 ? chalk.red : chalk.green;
	console.info(logColour(`${errorCount} errors in ${fileCount} ${fileCount === 1 ? 'file' : 'files'}`));
}
