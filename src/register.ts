import { Helper } from 'dojo-cli/interfaces';
import { Yargs } from 'yargs';

export default function(helper: Helper): Yargs {
	helper.yargs.option('s', {
		alias: 'src',
		describe: 'list of globs to tslint (comma seperated)',
		default: 'src/**/*.ts,tests/**/*.ts'
	});

	return helper.yargs;
}
