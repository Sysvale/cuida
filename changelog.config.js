module.exports = {
	'parserOpts': {
		'noteKeywords': ['BREAKING CHANGE', 'BREAKING CHANGES'],
		'headerPattern': /^(\w*)(?:\((.*)\))?: (.*)$/,
		'headerCorrespondence': ['type', 'scope', 'subject'],
		'ticketPrefixes': ['PROJ-', 'TICKET-']
	},
	'writerOpts': {
		'transform': (commit, context) => {
			const typeMap = {
				'feat': 'Feature',
				'fix': 'Bug Fix',
				'docs': 'Documentation',
				'style': 'Styles',
				'refactor': 'Code Refactoring',
				'perf': 'Performance Improvements',
				'test': 'Tests',
				'build': 'Build System',
				'ci': 'Continuous Integration',
				'chore': 'Chores',
				'revert': 'Reverts'
			};
			const type = typeMap[commit.type] || commit.type;
			return {
				title: `${type}: ${commit.subject}`,
				body: commit.body,
				breaking: commit.breaking,
			};
		},
		'groupBy': 'type',
		'commitGroupsSort': 'title',
		'commitsSort': ['scope', 'subject']
	}
};
